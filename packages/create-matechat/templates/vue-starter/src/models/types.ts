import type { LLMClientKey, LLMProviders } from './config';

export interface ModelsItem {
  name: string;
  iconPath: string;
}

export interface LLMModelsConfig {
  providerKey: LLMProviders;
  apiKey: string;
  apiPath: string;
  models: ModelsItem[];
  available: boolean;
  clientKey: LLMClientKey;
}

export interface ModelOption {
  label: string;
  modelName: string;
  providerKey: LLMProviders;
  clientKey: LLMClientKey;
  active: boolean;
  iconPath: string;
}

export interface ChatRequest {
  content: string;
  streamOptions?: {
    onMessage: (chunk: string) => void;
    onError?: (error: Error) => void;
    onComplete?: () => void;
  };
  messages: {
    from: 'user' | 'assistant';
    content: string;
  }[];
}

export interface CustomApiKey {
  providerKey: string;
  apiKey: string;
}
