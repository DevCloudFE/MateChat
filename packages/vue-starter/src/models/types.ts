import type { LLMClientKey, LLMProviders } from './config';

export interface LLMModelsConfig {
  providerKey: LLMProviders;
  apiKey: string;
  apiPath: string;
  models: string[];
  available: boolean;
  clientKey: LLMClientKey;
}

export interface ModelOption {
  label: string;
  modelName: string;
  providerKey: LLMProviders;
  clientKey: LLMClientKey;
  active: boolean;
}

export interface ChatRequest {
  content: string;
  streamOptions?: {
    onMessage: (chunk: string) => void;
    onError?: (error: Error) => void;
    onComplete?: () => void;
  };
}

export interface CustomApiKey {
  providerKey: string;
  apiKey: string;
}
