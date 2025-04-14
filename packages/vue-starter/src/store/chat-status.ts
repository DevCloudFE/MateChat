import { defineStore } from "pinia";
import { ref } from "vue";

export const useChatStatusStore = defineStore("chat-status", () => {
  const startChat = ref(false);

  return { startChat };
});
