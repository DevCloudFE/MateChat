import { ref, watch, onMounted } from "vue";
import { LLM_MODELS } from "./config";
import type { LLMModelsConfig } from "./types";

// 检测是否在Chrome扩展环境中
const isChromeExtension = typeof chrome !== "undefined" && chrome.storage;

// 从存储加载配置
const loadModelsFromStorage = (): Promise<LLMModelsConfig[]> => {
  return new Promise((resolve) => {
    if (isChromeExtension) {
      console.log("load 读取配置");
      chrome.storage.local.get("modelConfigs", (result) => {
        console.log('load result', result)
        let storedModels = result.modelConfigs;
        if (storedModels && !Array.isArray(storedModels)) {
          const keys = Object.keys(storedModels);
          const length = keys.length;
          storedModels.length = length;
          storedModels = Array.from(storedModels);
        }
        console.log('storedModels', storedModels)
        console.log('storedModels2', [...storedModels])
        console.log("LLM_MODELS", [...LLM_MODELS]);
        resolve(storedModels ? [...storedModels] : [...LLM_MODELS]);
      });
    } else {
      try {
        const storedModels = localStorage.getItem("modelConfigs");
        resolve(storedModels ? JSON.parse(storedModels) : [...LLM_MODELS]);
      } catch (error) {
        console.error("Failed to load model configs from localStorage:", error);
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
      console.log("缓存", models);
      chrome.storage.local.set({ modelConfigs: models }, () => {
        if (chrome.runtime.lastError) {
          console.error(
            "Failed to save model configs to chrome.storage:",
            chrome.runtime.lastError
          );
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
    console.log("初始化 models");
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
  console.log('getModelconfigs', modelConfigs.value)
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
  console.log("添加新模型");
  await initializeModels();
  modelConfigs.value.push(config);
  // 确保保存成功
  try {
    await saveModelsToStorage(modelConfigs.value);
    console.log("新模型添加并保存成功");
  } catch (error) {
    console.error("添加新模型后保存失败:", error);
    // 回滚操作
    modelConfigs.value.pop();
    throw error;
  }
};

export { modelConfigs, updateModelConfig, addModelConfig, getModelConfigs };
