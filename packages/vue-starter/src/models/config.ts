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
    models: ['deepseek-ai/DeepSeek-R1', 'Qwen/Qwen3-8B'],
    available: true,
    clientKey: LLMClientKey.openai,
    iconPath: '/siliconcloud-color.svg',
  },
  {
    // deepseek
    providerKey: LLMProviders.DEEP_SEEK,
    apiPath: 'https://api.deepseek.com',
    apiKey: '',
    models: ['deepseek-chat', 'deepseek-reasoner'],
    available: true,
    clientKey: LLMClientKey.openai,
    iconPath: '/deepseek-color.svg',
  },
];
