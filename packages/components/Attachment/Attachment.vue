<script setup lang="ts">
import { ref, toRefs } from 'vue';
import { AttachmentEmits, AttachmentProps } from './attachment-types';
import type { FileItem } from './attachment-types';
import { useUpload } from './use-upload';

defineOptions({
  name: 'McAttachment',
});

const props = defineProps(AttachmentProps);
const emit = defineEmits(AttachmentEmits);
// 使用 defineModel 定义双向绑定(需要同步文件数量)
const fileList = defineModel<FileItem[]>({ default: [] });

const inputRef = ref<HTMLInputElement>();
// 从钩子中获取方法
const { handleClick, handleFileChange, isDragging, isDisabled } = useUpload(
  props,
  emit,
  inputRef,
  fileList,
);
</script>

<template>
  <div class="mc-attachment" @click="handleClick" :data-placeholder="placeholder"
  :class="{ 'is-disabled': isDisabled }">
    <!-- 使用插槽允许用户自定义触发器内容，例如按钮或文本 -->
    <slot>
      <button class="mc-attachment-default-trigger" :disabled="isDisabled">
        + 附件
      </button>
    </slot>
    <input
      ref="inputRef"
      type="file"
      class="mc-attachment-file"
      :accept="accept"
      :multiple="multiple"
      :disabled="isDisabled"
      @change="handleFileChange"
    />
  </div>
  <Teleport to="body">
    <div
      v-if="isDragging"
      class="mc-attachment-drag-modal"
      :class="{ 'is-disabled': isDisabled }"
    >
      <template v-if="isDisabled">
        上传禁用
      </template>
      <template v-else>
        拖拽到页面上即可上传
      </template>
    </div>
  </Teleport>
</template>

<style lang="scss">
@use './attachment.scss';
</style>
