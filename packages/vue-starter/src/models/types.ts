import type { LLMProviders } from './constant';

export interface LLMModelsConfig {
  providerKey: LLMProviders;
  apiKey: string;
  apiPath: string;
  models: string[];
  available: boolean;
}

export interface ModelOption {
  label: string;
  modelName: string;
  providerKey: LLMProviders;
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
