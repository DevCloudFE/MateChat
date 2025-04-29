<template>
  <d-layout class="matechat-layout">
    <d-aside>
      <slot name="header"></slot>
    </d-aside>
    <d-content class="main-content">
      <slot name="content"></slot>
    </d-content>
  </d-layout>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.matechat-layout {
  width: 100%;
  height: 100vh;
  min-width: 640px;
  padding: 8px 8px 8px 0;
  overflow: auto;
  box-sizing: border-box;
  background: var(
    --mc-gradient-base-bg,
    linear-gradient(135deg, #b369ff, #7b79ff)
  );
}
.main-content {
  flex: 1;
  display: flex;
  border-radius: 12px;
  background-color: var(--devui-base-bg, #ffffff);
}

@media screen and (max-width: 940px) {
  .matechat-layout {
    padding: 8px;
  }
}

@media screen and (max-width: 860px) {
  .main-content :deep(.history-container) {
    display: none;
  }
}
</style>
