import { MODEL_CONFIGS } from './config';
import { LLMProviders } from './constant';
import { OpenAiService } from './openai';
import type { ChatRequest } from './types';

export abstract class LLMService {
  abstract chat(request: ChatRequest): Promise<string>;
}

export class Client {
  public client: LLMService;
  constructor(providerKey: LLMProviders) {
    switch (providerKey) {
      case LLMProviders.SILICON_FLOW:
        this.client = new OpenAiService(providerKey);
        break;
      case LLMProviders.DEEP_SEEK:
        this.client = new OpenAiService(providerKey);
        break;
      case LLMProviders.QWEN:
        this.client = new OpenAiService(providerKey);
        break;
      default:
        this.client = new OpenAiService(providerKey);
    }
  }
}
