import { aiModelAvatar, customerAvatar } from '@/mock-data/mock-chat-view';
import { mockAnswer } from '@/mock-data/mock-chat-view';
import { Client, type LLMService } from '@/models';
import { MODEL_CONFIGS } from '@/models/config';
import type { IMessage } from '@/types';
import dayjs from 'dayjs';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useChatHistoryStore } from './history-store';
import { useChatModelStore } from './model-store';
import { useChatStatusStore } from './status-store';
import type { ChunkResponse } from '@/models/types';

export const useChatMessageStore = defineStore('chat-message', () => {
  const chatStatusStore = useChatStatusStore();
  const chatHistoryStore = useChatHistoryStore();
  const chatModelStore = useChatModelStore();
  const messages = ref<IMessage[]>([]);
  const messageChangeCount = ref(0);
  let client: LLMService;

  function ask(content: { text?: string; image?: string }, answer?: string) {
    if (!content.text && !content.image) {
      return;
    }
    if (!messages.value.length) {
      chatStatusStore.startChat = true;
      chatStatusStore.newChatId();
    }
    chatHistoryStore.addHistory(
      chatStatusStore.currentChatId,
      dayjs().format('YYYY-MM-DD HH:mm'),
      messages.value,
      chatModelStore.currentModel,
    );
    messages.value.push({
      from: 'user',
      content: content,
      avatarPosition: 'side-right',
      avatarConfig: { ...customerAvatar },
    });
    messageChangeCount.value++;
    getAIAnswer(answer ?? (content.text || ''));
  }

  const getAIAnswer = (content: string) => {
    messages.value.push({
      from: 'assistant',
      content: { text: '' },
      reasoning_content: '',
      avatarPosition: 'side-left',
      avatarConfig: { ...aiModelAvatar },
      loading: true,
      complete: false,
    });

    if (MODEL_CONFIGS.enableMock) {
      /* 模拟流式数据返回 */
      setTimeout(async () => {
        messages.value.at(-1).loading = false;
        const mockText = 
          mockAnswer[content as keyof typeof mockAnswer]?.text || content;
        for (let i = 0; i < mockText.length; ) {
          await new Promise((r) => setTimeout(r, 300 * Math.random()));
          const step = Math.max(
            5,
            Math.floor(content.length / 20) * Math.random(),
          );
          i += step;
          messages.value[messages.value.length - 1].content = {
            text: mockText.slice(0, i),
          };
          messageChangeCount.value++;
        }
        chatHistoryStore.addHistory(
          chatStatusStore.currentChatId,
          dayjs().format('YYYY-MM-DD HH:mm'),
          messages.value,
          chatModelStore.currentModel,
        );
      }, 1000);
    } else {
      const request = {
        content,
        streamOptions: {
          onMessage: onMessageChange,
          onComplete: onMessageComplete,
        },
        messages: messages.value,
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
        messages.value[messages.value.length - 1].content = { text: res };
        chatHistoryStore.addHistory(
          chatStatusStore.currentChatId,
          dayjs().format('YYYY-MM-DD HH:mm'),
          messages.value,
          chatModelStore.currentModel,
        );
      });
    }
  };

  const onMessageChange = (msg: ChunkResponse) => {
    messages.value.at(-1).loading = false;
    const currentMessage = messages.value[messages.value.length - 1];
    if (!currentMessage.startTime) {
      currentMessage.startTime = Date.now();
    }
    if (!currentMessage.endTime && msg.content) {
      currentMessage.endTime = Date.now();
    }
    currentMessage.reasoning_content += msg.reasoning_content || '';
    currentMessage.content.text += msg.content || '';
    messageChangeCount.value++;
  };

  const onMessageComplete = () => {
    messages.value.at(-1).loading = false;
    messages.value.at(-1).complete = true;
  };

  return { messages, messageChangeCount, ask };
});
