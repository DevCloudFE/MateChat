import type { LLMModelsConfig } from "./types";
import DeepSeekIcon from "../../public/deepseek-color.svg";
import QwenIcon from "../../public/qwen.svg";

export const MODEL_CONFIGS = {
  stream: true,
  enableMock: true,
};

export enum LLMProviders {
  SILICON_FLOW = "siliconflow",
  DEEP_SEEK = "deepseek",
  QWEN = "qwen",
}

export enum LLMClientKey {
  openai = "openai",
}

export const LLM_MODELS: LLMModelsConfig[] = [
  {
    // 硅基流动
    providerKey: LLMProviders.SILICON_FLOW,
    apiPath: "https://api.siliconflow.cn/v1",
    apiKey: "",
    models: [
      { name: "deepseek-ai/DeepSeek-R1", iconPath: DeepSeekIcon },
      { name: "Qwen/Qwen3-8B", iconPath: QwenIcon },
    ],
    available: true,
    clientKey: LLMClientKey.openai,
  },
  {
    // deepseek
    providerKey: LLMProviders.DEEP_SEEK,
    apiPath: "https://api.deepseek.com",
    apiKey: "",
    models: [
      { name: "deepseek-chat", iconPath: DeepSeekIcon },
      { name: "deepseek-reasoner", iconPath: DeepSeekIcon },
    ],
    available: true,
    clientKey: LLMClientKey.openai,
  },
];
