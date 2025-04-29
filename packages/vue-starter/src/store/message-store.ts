import { aiModelAvatar, customerAvatar } from '@/mock-data/mock-chat-view';
import { Client, type LLMService } from '@/models';
import { MODEL_CONFIGS } from '@/models/config';
import type { IMessage } from '@/types';
import dayjs from 'dayjs';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useChatHistoryStore } from './history-store';
import { useChatModelStore } from './model-store';
import { useChatStatusStore } from './status-store';

export const useChatMessageStore = defineStore('chat-message', () => {
  const chatStatusStore = useChatStatusStore();
  const chatHistoryStore = useChatHistoryStore();
  const chatModelStore = useChatModelStore();
  const messages = ref<IMessage[]>([]);
  const messageChangeCount = ref(0);
  let client: LLMService;

  function ask(question: string, answer?: string) {
    if (question === '') {
      return;
    }
    if (!messages.value.length) {
      chatStatusStore.startChat = true;
      chatStatusStore.newChatId();
    }
    chatHistoryStore.addHistory(
      chatStatusStore.currentChatId,
      dayjs().format('YYYY-MM-DD'),
      messages.value,
    );
    messages.value.push({
      from: 'user',
      content: question,
      avatarPosition: 'side-right',
      avatarConfig: { ...customerAvatar },
    });
    messageChangeCount.value++;
    getAIAnswer(answer ?? question);
  }

  const getAIAnswer = (content: string) => {
    messages.value.push({
      from: 'ai-model',
      content: '',
      avatarPosition: 'side-left',
      avatarConfig: { ...aiModelAvatar },
      loading: true,
    });

    if (MODEL_CONFIGS.enableMock) {
      /* 模拟流式数据返回 */
      setTimeout(async () => {
        messages.value.at(-1).loading = false;
        for (let i = 0; i < content.length; ) {
          await new Promise((r) => setTimeout(r, 300 * Math.random()));
          i += Math.random() * 10;
          messages.value[messages.value.length - 1].content = content.slice(
            0,
            i,
          );
          messageChangeCount.value++;
        }
        chatHistoryStore.addHistory(
          chatStatusStore.currentChatId,
          dayjs().format('YYYY-MM-DD'),
          messages.value,
        );
      }, 1000);
    } else {
      const request = {
        content,
        streamOptions: {
          onMessage: onMessageChange,
        },
      };
      if (!chatModelStore.currentModel) {
        return;
      }
      client = new Client(
        chatModelStore.currentModel.clientKey,
        chatModelStore.currentModel.providerKey,
      ).client;
      client.chat(request).then((res) => {
        messages.value.at(-1).loading = false;
        messages.value[messages.value.length - 1].content = res;
        chatHistoryStore.addHistory(
          chatStatusStore.currentChatId,
          dayjs().format('YYYY-MM-DD'),
          messages.value,
        );
      });
    }
  };

  const onMessageChange = (content: string) => {
    messages.value.at(-1).loading = false;
    messages.value[messages.value.length - 1].content = messages.value[
      messages.value.length - 1
    ].content += content;
  };

  return { messages, messageChangeCount, ask };
});
