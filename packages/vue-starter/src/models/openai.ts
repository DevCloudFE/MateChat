import { useChatModelStore } from '@/store';
import OpenAI from 'openai';
import type { LLMService } from '.';
import { LLM_MODELS, MODEL_CONFIGS } from './config';
import type { ChatRequest } from './types';

export class OpenAiService implements LLMService {
  private client: OpenAI;
  private currentModel = useChatModelStore().currentModel;

  // Todo 页面配置apiKey
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

  // Todo: 终止流式
  async chatStream(request: ChatRequest): Promise<string> {
    try {
      if (!this.currentModel) {
        return '模型未选择，请选择模型';
      }
      const completion = await this.client.chat.completions.create({
        model: this.currentModel.modelName,
        messages: [{ role: 'user', content: request.content }],
        stream: true,
      });

      let fullAnswer = '';
      for await (const chunk of completion) {
        const answer = chunk.choices[0]?.delta?.content || '';
        fullAnswer += answer;
        request.streamOptions?.onMessage?.(answer);
      }
      request.streamOptions?.onComplete?.();
      return fullAnswer;
    } catch (error) {
      return '发生错误，请稍后再试。';
    }
  }
}
