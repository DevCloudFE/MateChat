<template>
  <div class="chat-view-container">
    <NavbarTop />
    <ChatProcess v-if="chatStatusStore.startChat" />
    <Welcome v-else />
    <div class="new-convo-button">
      <div class="agent-knowledge">
        <ChatModel />
        <span class="agent-knowledge-dividing-line"></span>
        <Knowledge />
      </div>
      <div class="new-chat-setting">
        <d-tooltip position="top" :content="$t('chatSetting')">
          <i class="icon-infrastructure chat-setting-icon"></i>
        </d-tooltip>
        <d-button
          icon="add"
          shape="circle"
          :title="$t('newChat')"
          size="sm"
          @click="onNewConvo"
        />
      </div>
    </div>
    <Input />
  </div>
</template>

<script setup lang="ts">
import {
  useChatHistoryStore,
  useChatMessageStore,
  useChatStatusStore,
} from '@/store';
import { ChatModel } from '@view/chat-model';
import { ChatProcess } from '@view/chat-process';
import { Input } from '@view/input';
import { Knowledge } from '@view/knowledge';
import { Welcome } from '@view/welcome';
import NavbarTop from './navbar-top.vue';

const chatHistoryStore = useChatHistoryStore();
const chatMessageStore = useChatMessageStore();
const chatStatusStore = useChatStatusStore();

const onNewConvo = () => {
  chatHistoryStore.setActiveHistoryId('');
  chatStatusStore.startChat = false;
  chatMessageStore.messages = [];
};
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.chat-view-container {
  flex: 1;
  width: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 12px;

  .new-convo-button {
    padding: 0 12px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 39px;
    gap: 4px;
  }

  .agent-knowledge {
    flex: 1;
    display: flex;
    align-items: center;

    .agent-knowledge-dividing-line {
      width: 1px;
      height: 14px;
      margin: 0 12px;
      background-color: $devui-line;
    }
  }

  .new-chat-setting {
    display: flex;
    align-items: center;
    gap: 8px;

    .chat-setting-icon {
      font-size: $devui-font-size;
      cursor: pointer;

      &:hover {
        color: $devui-brand-active;
      }
    }
  }
}

@media screen and (max-width: 940px) {
  .navbar-container {
    display: none;
  }
}
</style>
