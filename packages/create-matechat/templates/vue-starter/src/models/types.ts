import type { LLMClientKey, LLMProviders } from './config';

export interface ModelsItem {
  name: string;
  iconPath: string;
  enableThink?: boolean;
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
  enableThink?: boolean;
}

export interface ChatRequest {
  content: string;
  streamOptions?: {
    onMessage: (chunk: ChunkResponse) => void;
    onError?: (error: Error) => void;
    onComplete?: () => void;
  };
  messages: {
    from: 'user' | 'assistant' | 'system';
    content: string;
  }[];
}

export interface ChunkResponse {
  reasoning_content?: string;
  content?: string;
}

export interface CustomApiKey {
  providerKey: string;
  apiKey: string;
}
