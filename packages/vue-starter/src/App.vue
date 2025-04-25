<template>
  <div class="matechat-container">
    <NavBar />
    <div class="matechat-content">
      <History />
      <ChatView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLang, useTheme } from '@/hooks';
import ChatView from '@view/chat-view.vue';
import { History } from '@view/history';
import { NavBar } from '@view/navbar';

useLang();
useTheme();
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.matechat-container {
  display: flex;
  width: 100%;
  height: 100vh;
  padding: 8px 8px 8px 0;
  box-sizing: border-box;
  background: var(--mc-gradient-base-bg, linear-gradient(135deg, #b369ff, #7b79ff));

  .matechat-content {
    flex: 1;
    display: flex;
    border-radius: 12px;
    background-color: $devui-base-bg;
  }
}
</style>
