<script setup lang="ts">
import { useMcI18n } from "@matechat/core/Locale";
import { ref } from "vue";
import {
  AttachmentEmits,
  AttachmentProps,
  AttachmentSlots,
} from "./attachment-types";
import type { FileItem } from "./attachment-types";
import { useUpload } from "./use-upload";

defineOptions({
  name: "McAttachment",
});

const props = defineProps(AttachmentProps);
const emit = defineEmits(AttachmentEmits);
const slots = defineSlots<AttachmentSlots>();
// 使用 defineModel 定义双向绑定(需要同步文件数量)
const fileList = defineModel<FileItem[]>({ default: [] });

const { t } = useMcI18n();

const inputRef = ref<HTMLInputElement>();
// 从钩子中获取方法
const { handleClick, handleFileChange, isDragging, isDisabled } = useUpload(
  props,
  emit,
  inputRef,
  fileList
);
</script>

<template>
  <div
    class="mc-attachment"
    @click="handleClick"
    :class="{ 'is-disabled': isDisabled }"
  >
    <slot></slot>
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
      <slot name="dropPlaceholder">
        {{
          props.dropPlaceholder ??
          (isDisabled
            ? t("Attachment.disabledUpload")
            : t("Attachment.dragToUpload"))
        }}
      </slot>
    </div>
  </Teleport>
</template>

<style lang="scss">
@use "./attachment.scss";
</style>
