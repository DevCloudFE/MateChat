<script setup lang="ts">
import { useFoundation } from '@matechat/common/Base/useFoundation';
import type {
  FileItem,
  PreviewType,
} from '@matechat/common/FileList/common/fileList-types';
import { FileListFoundation } from '@matechat/common/FileList/foundation';
import { useMcI18n } from '@matechat/core/Locale';
import { ref } from 'vue';
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
import { fileListEmits, fileListProps } from './fileList-types';

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

// 创建 adapter
const adapter = {
  emitRemove: (uid: number) => {
    const file = props.fileItems.find((item) => item.uid === uid);
    if (file) emit('remove', file);
  },
  emitRetryUpload: (uid: number) => {
    const file = props.fileItems.find((item) => item.uid === uid);
    if (file) emit('retry-upload', file);
  },
  emitDownload: (file: FileItem) =>
    emit('download', file, new Event('download')),
  emitPreview: (file: FileItem) => emit('preview', file),
  emitRetryDownload: (uid: number) => {
    const file = props.fileItems.find((item) => item.uid === uid);
    if (file) emit('retry-download', file);
  },
  updateFileItem: (uid: number, updates: Partial<FileItem>) => {
    // Vue 组件中不需要直接更新，因为 props 是只读的
  },
};

// 初始化 foundation
const { foundation } = useFoundation({
  adapter,
  foundationClass: FileListFoundation,
});

// 格式化文件大小
const formatFileSize = (bytes: number): string => {
  return foundation.formatFileSize(bytes);
};

// 从文件类型获取大写字符串
const getFileTypeString = (fileName: string): string => {
  return (fileName.split('.').pop() || 'File').toUpperCase();
};

// 图标组件映射
const iconComponentMap: Record<string, any> = {
  'image-icon': ImageIcon,
  'mp4-icon': Mp4Icon,
  'document-icon': DocumentIcon,
  'pdf-icon': PdfIcon,
  'compressed-file-icon': CompressedFileIcon,
  'ppt-icon': PptIcon,
  'excel-icon': ExcelIcon,
  'markdown-icon': MarkdownIcon,
  'code-file-icon': CodeFileIcon,
  'mind-icon': MindIcon,
  'drawing-board-icon': DrawingBoardIcon,
  'flow-chart-icon': FlowChartIcon,
  'email-file-icon': EmailFileIcon,
  'page-icon': PageIcon,
  'unknown-icon': UnknownIcon,
};

// 获取文件类型图标组件
const getIconComponent = (file: FileItem) => {
  const iconName = foundation.getIconComponent(file);
  return iconComponentMap[iconName] || UnknownIcon;
};

// 处理移除文件
const handleRemove = (file: FileItem) => {
  foundation.handleRemove(file.uid);
};
// 处理重试上传
const handleRetryUpload = (file: FileItem) => {
  foundation.handleRetryUpload(file.uid);
};

const getPreviewType = (file: FileItem): PreviewType => {
  return foundation.getPreviewType(file);
};

const handlePreview = (file: FileItem) => {
  // 只有当文件有可供预览的 URL (url 或 thumbUrl) 时，才触发预览
  if (file.url || file['thumbUrl']) {
    previewFile.value = file;
    isPreviewVisible.value = true;
    foundation.handlePreview(file);
  }
};
// 处理重试下载
const handleRetryDownload = (file: FileItem) => {
  foundation.handleRetryDownload(file.uid);
};
// 下载处理函数(前端处理，若后端需要，可自行处理，阻止默认行为)
const handleDownload = (file: FileItem, event: Event) => {
  foundation.handleDownload(file);
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
          <template v-if="getPreviewType(file) === 'image' && (file['thumbUrl'] || file.url)">
            <img :src="file['thumbUrl'] || file.url" :alt="file.name" class="mc-file-item__image-preview" @click="handlePreview(file)">
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
          <div v-if="file.status === 'uploading' || file.status === 'downloading' || file.status === 'error' || file.status === 'uploadError' || file.status === 'downloadError'" class="mc-file-item__progress-overlay">
            <div class="mc-file-item__progress-mask"></div>
            <!-- 失败状态：显示 Wrong 图标 -->
            <template v-if="file.status === 'error' || file.status === 'uploadError' || file.status === 'downloadError'">
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
            <template v-if="file.status === 'error' || file.status === 'uploadError' || file.status === 'downloadError'">
              <span 
                class="mc-file-item__status mc-file-item__status--error" 
                :title="typeof file.error === 'string' ? file.error : (file.status === 'downloadError' ? t('FileList.downloadFailed') : t('FileList.uploadFailed'))"
              >
                {{ file.status === 'downloadError' ? t('FileList.downloadFailed') : t('FileList.uploadFailed') }}
              </span>
              <span
                class="mc-file-item__meta-action"
                @click="file.status === 'downloadError' ? handleRetryDownload(file) : handleRetryUpload(file)"
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
          <!-- 删除按钮 -->
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
    <teleport to="body">
      <transition name="mc-file-preview-fade">
        <div v-if="isPreviewVisible && previewFile" class="mc-file-preview__overlay" @click.self="isPreviewVisible = false">
          <!-- 图片预览 -->
          <img v-if="getPreviewType(previewFile) === 'image'" :src="previewFile['thumbUrl'] || previewFile.url" :alt="previewFile.name" class="mc-file-preview__content" />
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
  </div>
</template>

<style lang="scss">
@use './fileList.scss';
</style>