<template>
  <div class="chat-view-container">
    <ChatProcess v-if="chatStatusStore.startChat" />
    <Welcome v-else />
    <div class="new-convo-button">
      <div class="agent-knowledge">
        <ChatModel />
        <span class="agent-knowledge-dividing-line"></span>
        <Knowledge />
      </div>
      <d-button
        icon="add"
        shape="circle"
        title="新建对话"
        size="sm"
        @click="onNewConvo"
      />
    </div>
    <Input />
  </div>
</template>

<script setup lang="ts">
import { Welcome } from "@view/welcome";
import { ChatModel } from "@view/chat-model";
import { Knowledge } from "@view/knowledge";
import { Input } from "@view/input";
import { ChatProcess } from "@view/chat-process";
import { useChatMessageStore, useChatStatusStore } from "@/store";

const chatMessageStore = useChatMessageStore();
const chatStatusStore = useChatStatusStore();

const onNewConvo = () => {
  chatStatusStore.startChat = false;
  chatMessageStore.messages = [];
};
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.chat-view-container {
  flex: 1;
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
}
</style>
