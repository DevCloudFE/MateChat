import { useChatModelStore } from '@/store';
import OpenAI from 'openai';
import { MODEL_CONFIGS } from './config';
import { DEFAULT_LLM_CONFIG, LLMProviders } from './constant';
import type { ChatRequest, ModelOption } from './types';

const getApiKey = (provider: string) => {
  const chatModelStore = useChatModelStore();
  const customAPIKey = chatModelStore.customAPIKey.find(
    (item) => item.provider === provider,
  );

  if (customAPIKey) {
    return customAPIKey.apiKey;
  }

  switch (provider) {
    case LLMProviders.SILICON_FLOW:
      return DEFAULT_LLM_CONFIG.silliconflowApiKey;
    case LLMProviders.DEEP_SEEK:
      return DEFAULT_LLM_CONFIG.deepseekApiKey;
    case LLMProviders.QWEN:
      return DEFAULT_LLM_CONFIG.qwenApiKey;
    default:
      return '';
  }
};

const getApiPath = (provider: string) => {
  switch (provider) {
    case LLMProviders.SILICON_FLOW:
      return DEFAULT_LLM_CONFIG.silliconflowUrl;
    case LLMProviders.DEEP_SEEK:
      return DEFAULT_LLM_CONFIG.deepseekUrl;
    case LLMProviders.QWEN:
      return DEFAULT_LLM_CONFIG.qwenUrl;
    default:
      return '';
  }
};

export function getClientApi(provider: string) {
  console.log('provider', provider);
  switch (provider) {
    default:
      return new OpenAiService(provider);
  }
}

export abstract class LLMService {
  constructor(protected provider: string) {}

  async chat(request: ChatRequest): Promise<string> {
    const shouldStream = MODEL_CONFIGS.stream;
    return shouldStream ? this.chatStream(request) : this.chatBatch(request);
  }

  // 流式
  abstract chatStream(request: ChatRequest): Promise<string>;

  // 非流式
  abstract chatBatch(request: ChatRequest): Promise<string>;
}

export class OpenAiService extends LLMService {
  private client: OpenAI;
  private currentModel: ModelOption | null = null;
  constructor(provider: string) {
    super(provider);

    const chatModelStore = useChatModelStore();

    if (chatModelStore.currentModel) {
      this.currentModel = chatModelStore.currentModel;
    }

    this.client = new OpenAI({
      baseURL: getApiPath(provider),
      apiKey: getApiKey(provider),
      dangerouslyAllowBrowser: true,
    });
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
