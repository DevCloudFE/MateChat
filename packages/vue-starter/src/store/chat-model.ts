import { defineStore } from "pinia";
import { ref } from "vue";

export const useChatModelStore = defineStore("chat-model", () => {
  const currentModel = ref("");

  return { currentModel };
});
