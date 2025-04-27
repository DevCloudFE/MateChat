import type { LLMModuleConfig } from './types';

export const LLMModules: Array<LLMModuleConfig> = [
  {
    name: '通义千问',
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    apiKey: 'sk-1da33fb5253e4bc884b3e0c167012d65',
    modelName: 'qwen-plus',
    stream: true,
    enable: true,
    enableMock: true,
  },
  {
    name: '硅基流动',
    baseURL: 'https://api.siliconflow.cn/v1',
    apiKey: 'sk-gshxufdodqxappusrorsnxlycysazdiowmvjnvnlbuznvngm',
    modelName: 'deepseek-ai/DeepSeek-R1',
    stream: true,
    enable: true,
  },
  {
    name: '星火',
    baseURL: 'https://spark-api-open.xf-yun.com/v1/chat/completions',
    apiKey: 'ACpGyFmdtrlzQwYYlFqN:wvhRbprfunSPTbbBTvUX',
    modelName: 'Spark Lite',
    stream: true,
    enable: true,
  },
  {
    name: 'deepseek',
    baseURL: 'https://api.deepseek.com',
    apiKey: 'sk-d6aaf62a31fa44e7b4cc308746a876cc',
    modelName: 'deepseek-reasoner',
    stream: false,
    enable: true,
  },
];
