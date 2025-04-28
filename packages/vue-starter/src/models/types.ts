export interface LLMModuleConfig {
  name: string;
  provider: string;
  baseURL: string;
  apiKey: string;
  modelName: string;
  stream: boolean;
  enable?: boolean;
  enableMock?: boolean;
}

export interface ModelOption {
  label: string;
  modelName: string;
  provider: string;
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
  provider: string;
  apiKey: string;
}
