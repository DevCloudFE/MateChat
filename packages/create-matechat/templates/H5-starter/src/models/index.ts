import { LLMClientKey, type LLMProviders } from './config';
import { OpenAiService } from './openai';
import type { ChatRequest } from './types';

export abstract class LLMService {
  abstract chat(request: ChatRequest): Promise<string>;
}

export class Client {
  public client: LLMService;
  constructor(clientName: LLMClientKey, providerKey: LLMProviders) {
    switch (clientName) {
      case LLMClientKey.openai:
        this.client = new OpenAiService(providerKey);
        break;
      default:
        this.client = new OpenAiService(providerKey);
    }
  }
}
