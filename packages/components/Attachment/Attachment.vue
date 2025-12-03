<script setup lang="ts">
import { useMcI18n } from "@matechat/core/Locale";
import { provide, ref } from "vue";
import {
  AttachmentEmits,
  AttachmentProps,
  AttachmentSlots,
  AttachmentInjectKey,
} from "./attachment-types";
import type { FileItem } from "./attachment-types";
import { useUpload } from "./use-upload";
import DropArea from "./drop-area.vue";

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
const { handleClick, handleFileChange, isDisabled, uploadFiles } = useUpload(
  props,
  emit,
  inputRef,
  fileList
);

provide(AttachmentInjectKey, {
  rootProps: props,
  rootEmits: emit,
  isDisabled,
  uploadFiles,
});
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
    <DropArea v-if="draggable">
      <slot name="dropPlaceholder">
        {{ dropPlaceholder ?? t("Attachment.dragToUpload") }}
      </slot>
    </DropArea>
  </div>
</template>

<style lang="scss">
@use "./attachment.scss";
</style>
