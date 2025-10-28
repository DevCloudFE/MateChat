<script setup lang="ts">
import { useMcI18n } from '@matechat/core/Locale';
import { computed, ref, watch } from 'vue';
import type { FileItem } from '../Attachment/attachment-types';
import { fileListEmits, fileListProps } from './fileList-types';

import CodeFileIcon from './FileIcon/CodeFile.vue';
import CompressedFileIcon from './FileIcon/CompressedFile.vue';
import DocumentIcon from './FileIcon/Document.vue';
import DrawingBoardIcon from './FileIcon/DrawingBoard.vue';
import EmailFileIcon from './FileIcon/EmailFile.vue';
import ExcelIcon from './FileIcon/Excel.vue';
import FlowChartIcon from './FileIcon/FlowChart.vue';
import ImageIcon from './FileIcon/Image.vue';
import MarkdownIcon from './FileIcon/Markdown.vue';
import MindIcon from './FileIcon/Mind.vue';
import Mp4Icon from './FileIcon/Mp4.vue';
import PageIcon from './FileIcon/Page.vue';
import PdfIcon from './FileIcon/Pdf.vue';
import PptIcon from './FileIcon/Ppt.vue';
import UnknownIcon from './FileIcon/Unknown.vue';
import WrongIcon from './FileIcon/Wrong.vue';

defineOptions({
  name: 'McFileList',
});

const props = defineProps(fileListProps);
const emit = defineEmits(fileListEmits);

const { t } = useMcI18n();

// 跟踪当前悬停的文件项
const hoveredFileUid = ref<number | null>(null);

// 新增：用于文件预览的状态
const isPreviewVisible = ref(false);
const previewFile = ref<FileItem | null>(null);

// 格式化文件大小
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / k ** i).toFixed(1))} ${sizes[i]}`;
};

// 从文件类型获取大写字符串
const getFileTypeString = (fileName: string): string => {
  return (fileName.split('.').pop() || 'File').toUpperCase();
};

// 创建一个按文件后缀名的映射表
const extensionMap: Record<string, unknown> = {
  // Office & Documents
  ppt: PptIcon,
  pptx: PptIcon,
  pdf: PdfIcon,
  doc: DocumentIcon,
  docx: DocumentIcon,
  xls: ExcelIcon,
  xlsx: ExcelIcon,
  csv: ExcelIcon,
  txt: DocumentIcon,
  rtf: DocumentIcon,
  page: PageIcon,

  // Images
  jpg: ImageIcon,
  jpeg: ImageIcon,
  png: ImageIcon,
  gif: ImageIcon,
  bmp: ImageIcon,
  webp: ImageIcon,
  tif: ImageIcon,
  tiff: ImageIcon,

  // Vector & Design
  svg: DrawingBoardIcon,
  ai: DrawingBoardIcon,
  psd: DrawingBoardIcon,
  fig: DrawingBoardIcon,

  // Audio
  mp3: Mp4Icon,
  wav: Mp4Icon,
  ogg: Mp4Icon,
  flac: Mp4Icon,
  aac: Mp4Icon,
  m4a: Mp4Icon,

  // Videos
  mp4: Mp4Icon,
  mov: Mp4Icon,
  avi: Mp4Icon,
  mkv: Mp4Icon,
  webm: Mp4Icon,
  wmv: Mp4Icon,
  flv: Mp4Icon,

  // Archives
  zip: CompressedFileIcon,
  rar: CompressedFileIcon,
  '7z': CompressedFileIcon,
  tar: CompressedFileIcon,
  gz: CompressedFileIcon,
  bz2: CompressedFileIcon,

  // Code & Markup
  md: MarkdownIcon,
  markdown: MarkdownIcon,
  json: CodeFileIcon,
  js: CodeFileIcon,
  ts: CodeFileIcon,
  jsx: CodeFileIcon,
  tsx: CodeFileIcon,
  html: CodeFileIcon,
  css: CodeFileIcon,
  scss: CodeFileIcon,
  less: CodeFileIcon,
  py: CodeFileIcon,
  java: CodeFileIcon,
  c: CodeFileIcon,
  cpp: CodeFileIcon,
  cs: CodeFileIcon,
  go: CodeFileIcon,
  php: CodeFileIcon,
  rb: CodeFileIcon,
  swift: CodeFileIcon,
  kt: CodeFileIcon,
  sh: CodeFileIcon,
  xml: CodeFileIcon,
  yml: CodeFileIcon,
  yaml: CodeFileIcon,
  sql: CodeFileIcon,

  // Fonts
  ttf: DocumentIcon,
  otf: DocumentIcon,
  woff: DocumentIcon,
  woff2: DocumentIcon,

  // Others
  eml: EmailFileIcon,
  xmind: MindIcon,
  flow: FlowChartIcon, // 'flowchart' is not a standard extension, maybe 'flow' is better
  dat: UnknownIcon,
  exe: UnknownIcon,
  dmg: UnknownIcon,
};

// 获取文件类型图标组件
const getIconComponent = (file: FileItem) => {
  if (file.type) {
    // 根据MIME类型做一些通用匹配
    if (file.type?.startsWith('image/')) return ImageIcon;
    if (file.type?.startsWith('video/')) return Mp4Icon;
    if (file.type?.startsWith('audio/')) return Mp4Icon; // 新增：音频文件回退
    if (file.type?.startsWith('text/')) return DocumentIcon;
    if (file.type === 'application/pdf') return PdfIcon;
    if (file.type === 'application/zip' || file.type?.includes('compress'))
      return CompressedFileIcon;
  }
  const extension = file.name.split('.').pop()?.toLowerCase();

  if (extension && extensionMap[extension]) {
    return extensionMap[extension];
  }

  return UnknownIcon; // 返回专用的未知文件图标
};

// 处理移除文件
const handleRemove = (file: FileItem) => {
  emit('remove', file);
};
// 处理重试上传
const handleRetryUpload = (file: FileItem) => {
  emit('retry-upload', file);
};

type PreviewType = 'image' | 'video' | 'iframe' | 'unsupported';
const getPreviewType = (file: FileItem): PreviewType => {
  // 优先检查MIME类型
  if (file.type) {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    if (
      file.type.startsWith('application/pdf') ||
      file.type.startsWith('text/')
    )
      return 'iframe';
  }
  // MIME类型不存在时，根据文件后缀名判断
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (extension) {
    if (
      [
        'jpg',
        'jpeg',
        'png',
        'gif',
        'bmp',
        'webp',
        'svg',
        'tif',
        'tiff',
      ].includes(extension)
    )
      return 'image';
    if (['mp4', 'webm', 'ogg'].includes(extension)) return 'video';
    if (['pdf', 'txt'].includes(extension)) return 'iframe';
  }
  return 'unsupported';
};

const handlePreview = (file: FileItem) => {
  // 只有当文件有可供预览的 URL (url 或 thumbUrl) 时，才触发预览
  if (file.url || file.thumbUrl) {
    previewFile.value = file;
    isPreviewVisible.value = true;
    emit('preview', file);
  }
};
// 处理重试下载
const handleRetryDownload = (file: FileItem) => {
  emit('retry-download', file);
};
// 下载处理函数(前端处理，若后端需要，可自行处理，阻止默认行为)
const handleDownload = (file: FileItem, event: Event) => {
  emit('download', file, event);
};
</script>

<template>
  <div class="mc-file-list" :class="`mc-file-list--context-${props.context}`">
    <div class="mc-file-list__container">
      <div
        v-for="file in fileItems"
        :key="file.uid"
        class="mc-file-item"
        :class="[file.status ? `mc-file-item--${file.status}` : '']"
        @mouseenter="hoveredFileUid = file.uid"
        @mouseleave="hoveredFileUid = null"
      >
        <!-- 文件图标和进度 -->
        <div class="mc-file-item__icon">
          <!-- 图片预览 -->
          <template v-if="getPreviewType(file) === 'image' && (file.thumbUrl || file.url)">
            <img :src="file.thumbUrl || file.url" :alt="file.name" class="mc-file-item__image-preview" @click="handlePreview(file)">
          </template>
          <!-- 原来的图标 -->
          <template v-else>
            <component
              :is="getIconComponent(file)"
              :title="file.name"
              :size="36"
              class="mc-file-item__type-icon"
            />
          </template>
          <!-- 进度覆盖层 (同时处理上传和下载) -->
          <div v-if="file.status === 'uploading' || file.status === 'downloading' || file.status === 'uploadError' || file.status === 'downloadError'" class="mc-file-item__progress-overlay">
            <div class="mc-file-item__progress-mask"></div>
            <!-- 失败状态：显示 Wrong 图标 -->
            <template v-if="file.status === 'uploadError' || file.status === 'downloadError'">
              <WrongIcon class="mc-file-item__wrong-icon" :size="12" />
            </template>
            <template v-else>
              <svg class="mc-file-item__progress-ring" viewBox="0 0 36 36">
              <path class="mc-file-item__progress-ring-track" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path
                class="mc-file-item__progress-ring-circle"
                stroke-dasharray="100, 100"
                :stroke-dashoffset="100 -  (file.percentage || 0) "
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              </svg>
            </template>
          </div>
        </div>

        <!-- 文件信息 -->
        <div class="mc-file-item__info">
          <div class="mc-file-item__name" :title="file.name">{{ file.name }}</div>
          <div class="mc-file-item__meta">
            <!-- 1. 失败状态 (统一处理上传和下载失败) -->
            <template v-if="file.status === 'uploadError' || file.status === 'downloadError'">
              <span 
                class="mc-file-item__status mc-file-item__status--error" 
                :title="typeof file.error === 'string' ? file.error : (file.status === 'uploadError' ? t('FileList.uploadFailed')  : t('FileList.downloadFailed'))"
              >
                {{ file.status === 'uploadError' ? t('FileList.uploadFailed') : t('FileList.downloadFailed') }}
              </span>
              <span
                class="mc-file-item__meta-action"
                @click="file.status === 'uploadError' ? handleRetryUpload(file) : handleRetryDownload(file)"
              >{{ t('FileList.retry') }}</span>
            </template>
            <!-- 2. 悬停状态 -->
            <template v-else-if="hoveredFileUid === file.uid && file.status === 'success'">
              <span class="mc-file-item__meta-action" @click="handleDownload(file, $event)">{{ t('FileList.download') }}</span>
              <span class="mc-file-item__meta-action" @click="handlePreview(file)">{{ t('FileList.preview') }}</span>
            </template>
            <!-- 3. 上传/下载中状态 -->
            <template v-else-if="file.status === 'uploading' || file.status === 'downloading'">
              <span class="mc-file-item__status">{{ t(`FileList.${file.status}`) }}</span>
            </template>
            <!-- 4. 默认状态 -->
            <template v-else>
              <span class="mc-file-item__file-type">{{ getFileTypeString(file.name) }}</span>
              <span class="mc-file-item__size">{{ formatFileSize(file.size) }}</span>
            </template>
          </div>
        </div>
        <!-- 删除按钮 -->
        <div class="mc-file-item__actions" v-if="props.context === 'input'">
        <button
          class="mc-file-item__action-btn mc-file-item__action-btn--remove"
          @click="handleRemove(file)"
          :title="t('FileList.remove')"
        >
          ✕
        </button>
      </div>
      </div>
    </div>
  </div>
  <teleport to="body">
    <transition name="mc-file-preview-fade">
      <div v-if="isPreviewVisible && previewFile" class="mc-file-preview__overlay" @click.self="isPreviewVisible = false">
        <!-- 图片预览 -->
        <img v-if="getPreviewType(previewFile) === 'image'" :src="previewFile.thumbUrl || previewFile.url" :alt="previewFile.name" class="mc-file-preview__content" />
        <!-- 视频预览 -->
        <video v-else-if="getPreviewType(previewFile) === 'video'" :src="previewFile.url" controls class="mc-file-preview__content"></video>
        <!-- PDF 和 文本文件预览 (使用 iframe) -->
        <iframe v-else-if="getPreviewType(previewFile) === 'iframe'" :src="previewFile.url" class="mc-file-preview__content mc-file-preview__iframe"></iframe>
        <!-- 其他文件类型的占位符 -->
        <div v-else class="mc-file-preview__unsupported">
          <span>{{ t('FileList.unsupportedPreview', { fileName: previewFile.name }) }}</span>
          <span class="mc-file-preview__unsupported-tip">{{ t('FileList.tryDownload') }}</span>
        </div>
        <!-- 关闭按钮 -->
        <button class="mc-file-preview__close-btn" @click="isPreviewVisible = false" :title="t('FileList.close')">✕</button>
      </div>
    </transition>
  </teleport>
</template>

<style lang="scss">
@use './fileList.scss';
</style>