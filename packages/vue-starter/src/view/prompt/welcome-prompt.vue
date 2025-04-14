<template>
  <McPrompt
    :list="introPrompt.list"
    :direction="'horizontal'"
    class="intro-prompt"
    @itemClick="onItemClick($event)"
  ></McPrompt>
</template>

<script setup lang="ts">
import { useChatMessageStore } from "@/store";
import { introPrompt, mockAnswer } from "@/mock-data/mock-chat-view";

const chatMessageStore = useChatMessageStore();

const onItemClick = (item) => {
  if (mockAnswer[item.value]) {
    // 使用 mock 数据
    chatMessageStore.ask(item.label, mockAnswer[item.value]);
  }
};
</script>

<style scoped lang="scss">
:deep(.intro-prompt .mc-list) {
  justify-content: center;
}
</style>
