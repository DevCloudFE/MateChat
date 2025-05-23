<template>
  <d-popover :content="$t('appendix') + $t('underDevelop')" trigger="hover" :position="['top']" style="color: var(--devui-text)">
    <span class="container">
      <i class="icon-add"></i>
    </span>
  </d-popover>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.container {
  display: flex;
  gap: 4px;
  align-items: center;
  color: $devui-text;
  cursor: pointer;

  span {
    font-size: $devui-font-size-sm;
  }

  i {
    font-size: $devui-font-size-icon;
  }
}
</style>
