<template>
  <div v-if="!isExpand" class="op-icon expand-icon" @click="handleToggle">
    <i class="icon-nav-expand" />
  </div>
  <div ref="containerRef" class="history-container">
    <slot></slot>
    <div class="op-icon stow-icon" @click="handleToggle">
      <i class="icon-nav-collapse" />
    </div>
    <div class="container-spliter"></div>
  </div>
</template>

<script setup lang="ts">
const containerRef = ref<HTMLElement>();
const isExpand = ref(true);

const handleToggle = () => {
  const container = containerRef.value;
  if (container) {
    container.classList.toggle('stow');
    if (isExpand.value) {
      setTimeout(() => {
        isExpand.value = false;
      }, 300);
    } else {
      isExpand.value = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "devui-theme/styles-var/devui-var.scss";

.history-container {
  position: relative;
  width: 25%;
  height: 100%;
  border-radius: 12px;
  transition: all 0.3s ease-in-out;
  overflow: hidden;

  &.stow {
    width: 0;
  }

  .container-spliter {
    position: absolute;
    top: 15px;
    right: 0px;
    width: 1px;
    background-color: $devui-line;
    height: calc(100% - 30px);
  }
}

.op-icon {
  width: fit-content;
  height: fit-content;
  padding: 0 4px;
  z-index: 9;
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    background-color: $devui-shape-icon-fill-hover;
  }

  &.expand-icon {
    position: absolute;
    top: 16px;
    left: 16px;
  }
  &.stow-icon {
    position: absolute;
    top: 16px;
    right: 16px;
  }
}
</style>
