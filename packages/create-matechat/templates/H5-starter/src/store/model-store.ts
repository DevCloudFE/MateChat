import type { CustomApiKey, ModelOption } from '@/models/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChatModelStore = defineStore('chat-model', () => {
  const currentModel = ref<ModelOption>();

  const currentModelName = ref<string>('');

  const customAPIKey = ref<CustomApiKey[]>([]);

  return { currentModel, customAPIKey, currentModelName };
});
