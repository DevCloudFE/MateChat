<template>
  <McPrompt
    class="simple-prompt"
    style="flex: 1"
    :list="simplePrompt"
    :direction="'horizontal'"
    @itemClick="onItemClick($event)"
  ></McPrompt>
</template>

<script setup lang="ts">
import { useChatMessageStore } from "@/store";
import { simplePrompt, mockAnswer } from "@/mock-data/mock-chat-view";

const chatMessageStore = useChatMessageStore();

const onItemClick = (item) => {
  if (mockAnswer[item.value]) {
    // 使用 mock 数据
    chatMessageStore.ask(item.label, mockAnswer[item.value]);
  }
};
</script>

<style scoped lang="scss">
:deep(.simple-prompt .mc-list) {
  justify-content: unset;
}
</style>
