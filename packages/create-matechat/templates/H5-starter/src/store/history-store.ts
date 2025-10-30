import type { ModelOption } from "@/models/types";
import type { HistoryList, IMessage } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useChatHistoryStore = defineStore("chat-history", () => {
  const historyList = ref<HistoryList>([]);
  const activeHistoryId = ref<string>("");

  const addHistory = (
    chatId: string,
    date: string,
    messages: IMessage[],
    chatModel?: ModelOption
  ) => {
    const index = historyList.value.findIndex((item) => item.chatId === chatId);
    const [d, time] = date.split(" ");
    setActiveHistoryId(chatId);
    if (index !== -1) {
      historyList.value[index].messages = messages;
      historyList.value[index].updateDate = d;
      historyList.value[index].updateTime = time;
      historyList.value[index].chatModel = chatModel;
    } else {
      historyList.value.unshift({
        chatId,
        chatModel,
        updateDate: d,
        updateTime: time,
        messages,
      });
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
