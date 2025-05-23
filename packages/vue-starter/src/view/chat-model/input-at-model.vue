<template>
  <d-popover :content="$t('agent')" trigger="hover" :position="['top']" style="color: var(--devui-text)">
    <span class="container" @click="emits('click')">
      <i class="icon-at"></i>
    </span>
  </d-popover>
</template>
<script setup lang="ts">
const emits = defineEmits(['click']);
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.container {
  display: flex;
  gap: 4px;
  align-items: center;
  color: $devui-text;
  font-size: $devui-font-size;
  cursor: pointer;

  span {
    font-size: $devui-font-size-sm;
  }

  i {
    font-size: $devui-font-size;
  }
}
</style>
