import type { HistoryList, IMessage } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChatHistoryStore = defineStore('chat-history', () => {
  const historyList = ref<HistoryList>([]);
  const activeHistoryId = ref<string>('');

  const addHistory = (chatId: string, date: string, messages: IMessage[]) => {
    const index = historyList.value.findIndex((item) => item.chatId === chatId);
    if (index !== -1) {
      historyList.value[index].messages = messages;
      historyList.value[index].updateDate = date;
    } else {
      historyList.value.unshift({ chatId, updateDate: date, messages });
    }
  };

  const deleteHistory = (chatId: string) => {
    const index = historyList.value.findIndex((item) => item.chatId === chatId);
    historyList.value.splice(index, 1);
  };

  const setActiveHistoryId = (chatId: string) => {
    activeHistoryId.value = chatId;
  };

  return {
    historyList,
    activeHistoryId,
    addHistory,
    deleteHistory,
    setActiveHistoryId,
  };
});
