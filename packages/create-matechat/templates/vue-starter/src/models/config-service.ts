import { ref, onMounted, watch, toRaw } from "vue";
import { LLM_MODELS } from "./config";
import type { LLMModelsConfig } from "./types";

declare const chrome: any;
// 检测是否在Chrome扩展环境中
const isChromeExtension = typeof chrome !== "undefined" && chrome.storage;

// 从存储加载配置
const loadModelsFromStorage = (): Promise<LLMModelsConfig[]> => {
  return new Promise((resolve) => {
    if (isChromeExtension) {
      chrome.storage.local.get("modelConfigs", (result) => {
        let storedModels = result.modelConfigs;
        resolve(storedModels ? JSON.parse(storedModels) : [...LLM_MODELS]);
      });
    } else {
      try {
        const storedModels = localStorage.getItem("modelConfigs");
        resolve(storedModels ? JSON.parse(storedModels) : [...LLM_MODELS]);
      } catch (error) {
        resolve([...LLM_MODELS]);
      }
    }
  });
};

// 保存配置到存储
const saveModelsToStorage = async (
  models: LLMModelsConfig[]
): Promise<void> => {
  if (isChromeExtension) {
    return new Promise((resolve, reject) => {
      // 使用Vue的toRaw获取原始对象后存储
        chrome.storage.local.set({ modelConfigs: JSON.stringify(models) }, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  } else {
    try {
      localStorage.setItem("modelConfigs", JSON.stringify(models));
    } catch (error) {
      console.error("Failed to save model configs to localStorage:", error);
      throw error;
    }
  }
};

// 响应式模型配置
const modelConfigs = ref<LLMModelsConfig[]>([]);
const isInitialized = ref(false);

// 初始化模型配置
const initializeModels = async () => {
  if (!isInitialized.value) {
    modelConfigs.value = await loadModelsFromStorage();
    isInitialized.value = true;
  }
};

// 组件挂载时初始化模型配置
onMounted(() => {
  initializeModels();
});

// 确保在使用前已初始化
const getModelConfigs = async () => {
  await initializeModels();
  return modelConfigs.value;
};

// 更新模型配置
const updateModelConfig = async (
  index: number,
  config: Partial<LLMModelsConfig>
) => {
  await initializeModels();
  modelConfigs.value[index] = { ...modelConfigs.value[index], ...config };
  await saveModelsToStorage(modelConfigs.value);
};

// 添加新模型配置
const addModelConfig = async (config: LLMModelsConfig): Promise<void> => {
  await initializeModels();
  modelConfigs.value.push(config);
  // 确保保存成功
  try {
    await saveModelsToStorage(modelConfigs.value);
  } catch (error) {
    modelConfigs.value.pop();
    throw error;
  }
};

export { modelConfigs, updateModelConfig, addModelConfig, getModelConfigs };
