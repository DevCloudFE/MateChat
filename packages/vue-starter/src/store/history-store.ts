import { defineStore } from "pinia";
import { shallowRef } from "vue";
import type { HistoryList, IMessage } from "@/types";

export const useChatHistoryStore = defineStore("chat-history", () => {
  const historyList = shallowRef<HistoryList>([]);

  const addHistory = (chatId: string, date: string, messages: IMessage[]) => {
    const index = historyList.value.findIndex((item) => item.chatId === chatId);
    if (index !== -1) {
      historyList.value[index].messages = messages;
      historyList.value[index].updateDate = date;
    } else {
      historyList.value.unshift({ chatId, updateDate: date, messages });
    }
  };

  return { addHistory };
});
