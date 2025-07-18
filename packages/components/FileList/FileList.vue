<script setup lang="ts">
import { computed, watch } from 'vue';
import type { FileItem } from '../Attachment/attachment-types';
import { fileListEmits, fileListProps } from './fileList-types';

defineOptions({
  name: 'McFileList',
});

const props = defineProps(fileListProps);
const emit = defineEmits(fileListEmits);

// 格式化文件大小
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
};

// 获取文件类型图标
const getFileIcon = (type: string): string => {
  if (type.startsWith('image/')) return '🖼️';
  if (type.startsWith('video/')) return '🎥';
  if (type.startsWith('audio/')) return '🎵';
  if (type.includes('pdf')) return '📄';
  if (type.includes('word')) return '📝';
  if (type.includes('excel')) return '📊';
  return '📎';
};

// 处理移除文件
const handleRemove = (file: FileItem) => {
  emit('remove', file);
};
</script>

<template>
  <div class="mc-file-list">
    <div 
      class="mc-file-list__container" 
    >
      <div
        v-for="file in files"
        :key="file.uid"
        class="mc-file-item"
        :class="`mc-file-item--${file.status}`"
      >
        <!-- 文件图标 -->
        <div class="mc-file-item__icon">
          <span class="mc-file-item__type-icon">{{ getFileIcon(file.type) }}</span>
        </div>

        <!-- 文件信息 -->
        <div class="mc-file-item__info">
          <div class="mc-file-item__name" :title="file.name">
            {{ file.name }}
          </div>
          <div class="mc-file-item__meta">
            <span class="mc-file-item__size">{{ formatFileSize(file.size) }}</span>
            <span 
              class="mc-file-item__status"
              :class="`mc-file-item__status--${file.status}`"
            >
              <template v-if="file.status === 'uploading'">
                上传中 {{ file.percentage }}%
              </template>
              <template v-else-if="file.status === 'success'">
                上传成功
              </template>
              <template v-else-if="file.status === 'error'">
                上传失败
              </template>
              <template v-else>
                等待上传
              </template>
            </span>
          </div>

          <!-- 进度条 -->
          <div 
            v-if="file.status === 'uploading'" 
            class="mc-file-item__progress"
          >
            <div 
              class="mc-file-item__progress-bar" 
              :style="{ width: `${file.percentage}%` }"
            ></div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="mc-file-item__actions">
          <!-- 删除按钮 -->
          <button
            class="mc-file-item__action-btn mc-file-item__action-btn--remove"
            @click="handleRemove(file)"
            title="移除"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use './fileList.scss';
</style>