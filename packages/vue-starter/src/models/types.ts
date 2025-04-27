export interface LLMModuleConfig {
  name: string;
  baseURL: string;
  apiKey: string;
  modelName: string;
  stream: boolean;
  enable?: boolean;
  enableMock?: boolean;
}

export interface ChatRequest {
  content: string;
  streamOptions?: {
    onMessage: (chunk: string) => void;
    onError?: (error: Error) => void;
    onComplete?: () => void;
  };
}
