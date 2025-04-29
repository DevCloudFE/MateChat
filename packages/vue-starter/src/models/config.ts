import type { LLMModelsConfig } from './types';

export const MODEL_CONFIGS = {
  stream: true,
  enableMock: false,
};

export enum LLMProviders {
  SILICON_FLOW = 'siliconflow',
  DEEP_SEEK = 'deepseek',
  QWEN = 'qwen',
}

export enum LLMClientKey {
  openai = 'openai',
}

export const LLM_MODELS: LLMModelsConfig[] = [
  {
    // 硅基流动
    providerKey: LLMProviders.SILICON_FLOW,
    apiPath: 'https://api.siliconflow.cn/v1',
    apiKey: '',
    models: ['deepseek-ai/DeepSeek-R1'],
    available: true,
    clientKey: LLMClientKey.openai,
  },
  {
    // deepseek
    providerKey: LLMProviders.DEEP_SEEK,
    apiPath: 'https://api.deepseek.com',
    apiKey: '',
    models: ['deepseek-reasoner'],
    available: true,
    clientKey: LLMClientKey.openai,
  },
  {
    // 通义千问
    providerKey: LLMProviders.QWEN,
    apiPath: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    apiKey: '',
    models: ['qwen-plus'],
    available: true,
    clientKey: LLMClientKey.openai,
  },
];
