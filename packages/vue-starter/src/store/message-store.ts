import { defineStore } from "pinia";
import { ref } from "vue";
import dayjs from "dayjs";
import type { IMessage } from "@/types";
import { customerAvatar, aiModelAvatar } from "@/mock-data/mock-chat-view";
import { useChatStatusStore } from "./status-store";
import { useChatHistoryStore } from "./history-store";

export const useChatMessageStore = defineStore("chat-message", () => {
  const chatStatusStore = useChatStatusStore();
  const chatHistoryStore = useChatHistoryStore();
  const messages = ref<IMessage[]>([]);
  const messageChangeCount = ref(0);

  function ask(question: string, answer?: string) {
    if (question === "") {
      return;
    }
    if (!messages.value.length) {
      chatStatusStore.startChat = true;
      chatStatusStore.newChatId();
    }
    chatHistoryStore.addHistory(
      chatStatusStore.currentChatId,
      dayjs().format("YYYY-MM-DD"),
      messages.value
    );
    messages.value.push({
      from: "user",
      content: question,
      avatarPosition: "side-right",
      avatarConfig: { ...customerAvatar },
    });
    messageChangeCount.value++;
    getAIAnswer(answer ?? question);
  }

  const getAIAnswer = (content: string) => {
    messages.value.push({
      from: "ai-model",
      content: "",
      avatarPosition: "side-left",
      avatarConfig: { ...aiModelAvatar },
      loading: true,
    });

    /* 模拟流式数据返回 */
    setTimeout(async () => {
      messages.value.at(-1).loading = false;
      for (let i = 0; i < content.length; ) {
        await new Promise((r) => setTimeout(r, 300 * Math.random()));
        messages.value[messages.value.length - 1].content = content.slice(
          0,
          (i += Math.random() * 10)
        );
        messageChangeCount.value++;
      }
      chatHistoryStore.addHistory(
        chatStatusStore.currentChatId,
        dayjs().format("YYYY-MM-DD"),
        messages.value
      );
    }, 1000);
  };

  return { messages, messageChangeCount, ask };
});
