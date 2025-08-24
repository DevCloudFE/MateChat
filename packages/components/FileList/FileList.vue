<script setup lang="ts">
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

// 跟踪当前悬停的文件项
const hoveredFileUid = ref<number | null>(null);
// 内部状态，用于管理下载进度和状态，独立于 props
const downloadStates = ref(
  new Map<number, { status: 'downloading' | 'error'; percentage: number }>(),
);
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

// 2. 创建一个按文件后缀名的映射表
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

  // Images
  jpg: ImageIcon,
  jpeg: ImageIcon,
  png: ImageIcon,
  gif: ImageIcon,
  bmp: ImageIcon,
  webp: ImageIcon,
  svg: DrawingBoardIcon,

  // Videos
  mp4: Mp4Icon,
  mov: Mp4Icon,
  avi: Mp4Icon,
  mkv: Mp4Icon,
  webm: Mp4Icon,

  // Archives
  zip: CompressedFileIcon,
  rar: CompressedFileIcon,
  '7z': CompressedFileIcon,
  tar: CompressedFileIcon,
  gz: CompressedFileIcon,

  // Code & Markup
  md: MarkdownIcon,
  markdown: MarkdownIcon,
  json: CodeFileIcon,
  js: CodeFileIcon,
  ts: CodeFileIcon,
  html: CodeFileIcon,
  css: CodeFileIcon,
  py: CodeFileIcon,
  java: CodeFileIcon,
  c: CodeFileIcon,
  cpp: CodeFileIcon,
  go: CodeFileIcon,
  php: CodeFileIcon,

  // Others
  eml: EmailFileIcon,
  xmind: MindIcon,
};

// 获取文件类型图标组件
const getIconComponent = (file: FileItem) => {
  const extension = file.name.split('.').pop()?.toLowerCase();

  if (extension && extensionMap[extension]) {
    return extensionMap[extension];
  }

  // 如果没有匹配到，可以根据MIME类型做一些通用匹配
  if (file.type.startsWith('image/')) return ImageIcon;
  if (file.type.startsWith('video/')) return Mp4Icon;
  if (file.type.startsWith('text/')) return DocumentIcon;

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
// 处理预览
const handlePreview = (file: FileItem) => {
  if (file.url) {
    previewFile.value = file;
    isPreviewVisible.value = true;
  }
  // 仍然可以发出事件，以防父组件需要知道
  emit('preview', file);
};
// 处理重试下载
const handleRetryDownload = (file: FileItem) => {
  downloadStates.value.delete(file.uid); // 清除错误状态
  emit('retry-download', file);
};
// 下载处理函数
const handleDownload = (file: FileItem) => {
  // 防止对已在下载中的文件重复触发下载事件
  if (downloadStates.value.get(file.uid)?.status === 'downloading') {
    return;
  }
  // 触发 download 事件，交由父组件处理实际的下载逻辑
  emit('download', file);
};
</script>

<template>
  <div class="mc-file-list" :class="`mc-file-list--context-${props.context}`">
    <div class="mc-file-list__container">
      <div
        v-for="file in files"
        :key="file.uid"
        class="mc-file-item"
        :class="[`mc-file-item--${file.status}`, downloadStates.get(file.uid)?.status ? `mc-file-item--${downloadStates.get(file.uid)?.status}` : '']"
        @mouseenter="hoveredFileUid = file.uid"
        @mouseleave="hoveredFileUid = null"
      >
        <!-- 文件图标和进度 -->
        <div class="mc-file-item__icon">
          <!-- 图片预览 -->
          <template v-if="(file.thumbUrl || file.url) && file.type.startsWith('image/')">
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
          <div v-if="file.status === 'uploading' || file.status === 'error' || downloadStates.get(file.uid)?.status" class="mc-file-item__progress-overlay">
            <div class="mc-file-item__progress-mask"></div>
            <!-- 失败状态：显示 Wrong 图标 -->
            <template v-if="file.status === 'error' || downloadStates.get(file.uid)?.status === 'error'">
              <WrongIcon class="mc-file-item__wrong-icon" :size="12" />
            </template>
            <template v-else>
              <svg class="mc-file-item__progress-ring" viewBox="0 0 36 36">
              <path class="mc-file-item__progress-ring-track" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path
                class="mc-file-item__progress-ring-circle"
                stroke-dasharray="100, 100"
                :stroke-dashoffset="100 - (file.status === 'uploading' ? file.percentage : downloadStates.get(file.uid)?.percentage || 0)"
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
            <!-- 1. 上传失败状态-->
            <template v-if="file.status === 'error'">
              <span class="mc-file-item__status mc-file-item__status--error" :title="file.error === '暂不支持该附件格式' ? file.error : '上传失败'">
                {{ file.error === '暂不支持该附件格式' && file.error ? file.error : '上传失败' }}
              </span>
              <span
                v-if="file.error !== '暂不支持该附件格式'"
                class="mc-file-item__meta-action"
                @click="handleRetryUpload(file)"
              >重试</span>
            </template>
            <!-- 2. 下载失败状态 -->
            <template v-else-if="downloadStates.get(file.uid)?.status === 'error'">
              <span class="mc-file-item__status mc-file-item__status--error">下载失败</span>
              <span class="mc-file-item__meta-action" @click="handleRetryDownload(file)">重试</span>
            </template>
            <!-- 3. 悬停状态 (仅在无任何失败状态时判断) -->
            <template v-else-if="hoveredFileUid === file.uid && file.status === 'success'">
              <span class="mc-file-item__meta-action" @click="handleDownload(file)">下载</span>
              <span class="mc-file-item__meta-action" @click="handlePreview(file)">预览</span>
            </template>
            <!-- 4. 上传/下载中状态 -->
            <template v-else-if="file.status === 'uploading'">
              <span class="mc-file-item__status">上传中...</span>
            </template>
            <template v-else-if="downloadStates.get(file.uid)?.status === 'downloading'">
              <span class="mc-file-item__status">下载中...</span>
            </template>
            <!-- 5. 默认状态 -->
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
          title="删除"
        >
          ✕
        </button>
      </div>
      </div>
    </div>
  </div>
  <teleport to="body">
    <transition name="mc-file-preview-fade">
      <div v-if="isPreviewVisible" class="mc-file-preview__overlay" @click.self="isPreviewVisible = false">
        <!-- 图片预览 -->
        <img v-if="previewFile && previewFile.type.startsWith('image/')" :src="previewFile.url" :alt="previewFile.name" class="mc-file-preview__content" />
        <!-- 视频预览 -->
        <video v-else-if="previewFile && previewFile.type.startsWith('video/')" :src="previewFile.url" controls class="mc-file-preview__content"></video>
        <!-- PDF 和 文本文件预览 (使用 iframe) -->
        <iframe v-else-if="previewFile && (previewFile.type === 'application/pdf' || previewFile.type.startsWith('text/'))" :src="previewFile.url" class="mc-file-preview__content mc-file-preview__iframe"></iframe>
        <!-- 其他文件类型的占位符 -->
        <div v-else class="mc-file-preview__unsupported">
          <span>浏览器不支持预览此文件类型：{{ previewFile?.name }}</span>
          <span class="mc-file-preview__unsupported-tip">请尝试下载后查看</span>
        </div>
        <!-- 关闭按钮 -->
        <button class="mc-file-preview__close-btn" @click="isPreviewVisible = false" title="关闭">✕</button>
      </div>
    </transition>
  </teleport>
</template>

<style lang="scss">
@use './fileList.scss';
</style>