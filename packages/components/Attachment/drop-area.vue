<template>
  <Teleport v-if="container" :to="container">
    <div v-show="isDragging" class="mc-attachment-drag-area" @drop="handleDrop">
      <slot />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { inject, onBeforeUnmount, onMounted, ref, Teleport, watch } from "vue";
import { AttachmentInjectKey, type IAttachmentCtx } from "./attachment-types";

const { rootProps, rootEmits, isDisabled, uploadFiles } = inject(
  AttachmentInjectKey
) as IAttachmentCtx;

const container = ref<HTMLElement>();
const isDragging = ref(false);
// 使用计数器来跟踪 dragenter 和 dragleave 事件，防止进入子元素导致的状态变化
let dragCounter = 0;

watch(
  () => rootProps.getDropContainer,
  (val) => {
    if (val) {
      const newContainer = val();
      if (container.value !== newContainer) {
        container.value = newContainer;
      }
    }
  }
);

const handleDragEnter = (e: DragEvent) => {
  e.preventDefault();
  dragCounter++;
  if (dragCounter === 1) {
    isDragging.value = true;
  }
};
const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
};

const handleDragLeave = (e: DragEvent) => {
  e.preventDefault();
  dragCounter--;
  if (dragCounter === 0) {
    isDragging.value = false;
  }
};

const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  isDragging.value = false;
  dragCounter = 0; // 重置计数器
  if (isDisabled.value) return;

  const files = Array.from(e.dataTransfer?.files || []);
  if (files.length > 0) {
    rootEmits("drop", files);
    uploadFiles(files);
  }
};

function onBodyDrop(e: DragEvent) {
  e.preventDefault();
  isDragging.value = false;
  dragCounter = 0;
}

onMounted(() => {
  if (rootProps.getDropContainer) {
    container.value = rootProps.getDropContainer();
  }
  document.body.addEventListener("dragenter", handleDragEnter);
  document.body.addEventListener("dragover", handleDragOver);
  document.body.addEventListener("dragleave", handleDragLeave);
  document.body.addEventListener("drop", onBodyDrop);
});

onBeforeUnmount(() => {
  document.body.removeEventListener("dragenter", handleDragEnter);
  document.body.removeEventListener("dragover", handleDragOver);
  document.body.removeEventListener("dragleave", handleDragLeave);
  document.body.removeEventListener("drop", onBodyDrop);
});
</script>
