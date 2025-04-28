import { LLMProviders } from './constant';
import type { LLMModelsConfig } from './types';

export const MODEL_CONFIGS = {
  stream: true,
  enableMock: false,
};

export const LLM_MODELS: LLMModelsConfig[] = [
  {
    // 硅基流动
    providerKey: LLMProviders.SILICON_FLOW,
    apiPath: 'https://api.siliconflow.cn/v1',
    apiKey: 'sk-gshxufdodqxappusrorsnxlycysazdiowmvjnvnlbuznvngm',
    models: ['deepseek-ai/DeepSeek-R1'],
    available: true,
  },
  {
    // deepseek
    providerKey: LLMProviders.DEEP_SEEK,
    apiPath: 'https://api.deepseek.com',
    apiKey: 'sk-d6aaf62a31fa44e7b4cc308746a876cc',
    models: ['deepseek-reasoner'],
    available: true,
  },
  {
    // 通义千问
    providerKey: LLMProviders.QWEN,
    apiPath: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    apiKey: 'sk-1da33fb5253e4bc884b3e0c167012d65',
    models: ['qwen-plus'],
    available: true,
  },
];
