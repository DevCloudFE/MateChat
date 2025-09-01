import { useChatModelStore } from '@/store';
import OpenAI from 'openai';
import type { LLMService } from '.';
import { LLM_MODELS, MODEL_CONFIGS } from './config';
import type { ChatRequest } from './types';

export class OpenAiService implements LLMService {
  private client: OpenAI;
  private currentModel = useChatModelStore().currentModel;

  private customAPIKey = useChatModelStore().customAPIKey;

  constructor(providerKey: string) {
    const defaultModelConfig = LLM_MODELS.find(
      (model) => model.providerKey === providerKey,
    );

    const custom = this.customAPIKey.find(
      (item) => providerKey === item.providerKey,
    );

    this.client = new OpenAI({
      baseURL: defaultModelConfig?.apiPath,
      apiKey: custom?.apiKey ? custom.apiKey : defaultModelConfig?.apiKey,
      dangerouslyAllowBrowser: true,
    });
  }

  chat(request: ChatRequest): Promise<string> {
    if (MODEL_CONFIGS.stream) {
      return this.chatStream(request);
    }
    return this.chatBatch(request);
  }

  async chatBatch(request: ChatRequest): Promise<string> {
    try {
      if (!this.currentModel) {
        return '模型未选择，请选择模型';
      }
      const completion = await this.client.chat.completions.create({
        model: this.currentModel.modelName,
        messages: [{ role: 'user', content: request.content }],
        stream: false,
      });

      return completion.choices[0].message.content || '';
    } catch {
      return '发生错误，请稍后再试。';
    }
  }

  async chatStream(request: ChatRequest): Promise<string> {
    try {
      if (!this.currentModel) {
        return '模型未选择，请选择模型';
      }

      const completionOptions = {
        model: this.currentModel.modelName,
        messages: request.messages?.slice(0, -1)?.map((item) => ({
          role: item.from,
          content: item.content,
        })),
        stream: true,
        enable_thinking: this.currentModel.enableThink,
      };
      const completion = await this.client.chat.completions.create(completionOptions);

      let fullAnswer = '';
      let thinkAnswer = '';
      let contentAnswer = '';
      for await (const chunk of completion) {
        const delta = chunk.choices[0]?.delta;
        if (!delta) {
          continue;
        }
        if (delta?.reasoning_content) {
          thinkAnswer += delta?.reasoning_content || '';
        }
        if (delta?.content) {
          contentAnswer += delta?.content || '';
        }
        fullAnswer = contentAnswer;
        request.streamOptions?.onMessage?.({
          reasoning_content: delta?.reasoning_content || '',
          content: delta?.content || '',
        });
      }
      request.streamOptions?.onComplete?.();
      return fullAnswer;
    } catch (error) {
      return '发生错误，请稍后再试。';
    }
  }
}
