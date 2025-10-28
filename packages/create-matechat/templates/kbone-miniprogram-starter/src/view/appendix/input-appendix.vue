<template>
  <d-popover
    :content="$t('underDevelop')"
    trigger="hover"
    :position="['top']"
    style="color: var(--devui-text)"
  >
    <div class="container">
      <i class="icon-add"></i>
      <span>{{ $t("appendix") }}</span>
    </div>
  </d-popover>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.container {
  display: flex;
  gap: 4px;
  align-items: center;
  height: 30px;
  color: $devui-text;
  border-radius: 4px;
  padding: 6px;
  cursor: pointer;

  span {
    font-size: $devui-font-size-sm;
  }

  &:hover {
    background-color: var(--devui-icon-hover-bg);
  }
}

@media screen and (max-width: 520px) {
  .container span {
    display: none;
  }
}
</style>
