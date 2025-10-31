<template>
  <d-layout class="matechat-layout">
    <d-aside :class="['aside-content', GlobalConfig.displayShape]">
      <slot name="header"></slot>
    </d-aside>
    <d-content class="main-content">
      <slot name="content"></slot>
    </d-content>
  </d-layout>
</template>

<script setup lang="ts">
import GlobalConfig from '@/global-config';
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.matechat-layout {
    width: 100%;
    height: 100vh;
    padding: 8px 8px 8px 0;
    overflow: auto;
    box-sizing: border-box;
    background: var(--mc-global-bg);
  }
.main-content {
  position: relative;
  flex: 1;
  display: flex;
  border-radius: 12px;
  overflow: auto;
}

body[ui-theme="galaxy-theme"] {
  .matechat-layout {
    background-color: $devui-global-bg;
  }
}

@media screen and (max-width: 940px) {
  .matechat-layout {
    padding: 8px;
  }
  .aside-content {
    padding: 0;
  }
}

@media screen and (max-width: 860px) {
  .main-content :deep(.history-list-container) {
    display: none;
  }
}
</style>
