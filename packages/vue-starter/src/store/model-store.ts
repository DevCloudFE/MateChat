import type { CustomApiKey } from '@/models/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChatModelStore = defineStore('chat-model', () => {
  const currentModel = ref();

  const customAPIKey = ref<CustomApiKey[]>([]);

  return { currentModel, customAPIKey };
});
