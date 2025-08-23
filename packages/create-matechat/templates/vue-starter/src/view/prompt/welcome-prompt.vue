<template>
  <McPrompt
    :list="list"
    :direction="'horizontal'"
    class="intro-prompt"
    @itemClick="onItemClick($event)"
  ></McPrompt>
</template>

<script setup lang="ts">
import {
  introPromptCn,
  introPromptEn,
  mockAnswer,
} from '@/mock-data/mock-chat-view';
import { useChatMessageStore, useLangStore } from '@/store';
import { LangType } from '@/types';

const langStore = useLangStore();
const chatMessageStore = useChatMessageStore();

const list = computed(() =>
  langStore.currentLang === LangType.CN
    ? introPromptCn.list
    : introPromptEn.list,
);

const onItemClick = (item) => {
  if (mockAnswer[item.value]) {
    // 使用 mock 数据
    chatMessageStore.ask({ text: item.label }, item.value);
  }
};
</script>

<style scoped lang="scss">
:deep(.intro-prompt .mc-list) {
  justify-content: center;
}
</style>
