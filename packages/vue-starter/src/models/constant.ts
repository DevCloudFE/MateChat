import type { ModelOption } from '@/models/types';

export enum LLMProviders {
  SILICON_FLOW = 'siliconflow',
  DEEP_SEEK = 'deepseek',
  QWEN = 'qwen',
}

export const DEFAULT_LLM_CONFIG = {
  // 硅基流动
  silliconflowUrl: 'https://api.siliconflow.cn/v1',
  silliconflowApiKey: 'sk-gshxufdodqxappusrorsnxlycysazdiowmvjnvnlbuznvngm',

  // deepseek
  deepseekUrl: 'https://api.deepseek.com',
  deepseekApiKey: 'sk-d6aaf62a31fa44e7b4cc308746a876cc',

  // 通义千问
  qwenUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  qwenApiKey: 'sk-1da33fb5253e4bc884b3e0c167012d65',
};

const SILLICON_FLOW_MODELS: Array<string> = ['deepseek-ai/DeepSeek-R1'];

const DEEP_SEEK_MODELS: Array<string> = ['deepseek-reasoner'];

const QWEN_MODELS: Array<string> = ['qwen-plus'];

export const MODELS: ModelOption[] = [
  ...SILLICON_FLOW_MODELS.map((model: string) => {
    return {
      modelName: model,
      provider: LLMProviders.SILICON_FLOW,
    };
  }),
  ...DEEP_SEEK_MODELS.map((model: string) => {
    return {
      modelName: model,
      provider: LLMProviders.DEEP_SEEK,
    };
  }),
  ...QWEN_MODELS.map((model: string) => {
    return {
      modelName: model,
      provider: LLMProviders.QWEN,
    };
  }),
];
