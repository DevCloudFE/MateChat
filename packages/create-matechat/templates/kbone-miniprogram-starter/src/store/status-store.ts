import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { ref } from 'vue';

export const useChatStatusStore = defineStore('chat-status', () => {
  const startChat = ref(false);
  const currentChatId = ref('');

  const newChatId = () => {
    currentChatId.value = uuidv4();
  };

  return { startChat, currentChatId, newChatId };
});
