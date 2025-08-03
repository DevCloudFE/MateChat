<template>
  <d-modal
    :model-value="modelValue"
    :title="$t('modelConfig.title')"
    :width="600"
    :show-close-button="true"
    @close="handleModalClose"
  >
    <div class="model-config-container">
      <div class="model-list" v-if="!showAddForm">
        <h3 class="section-title">{{ $t('modelConfig.modelList') }}</h3>
        <div v-for="(model, index) in modelConfigs" :key="index" class="model-item">
          <div class="model-header" @click="toggleModel(index)">
            <div class="model-info">
              <span class="model-name">{{ model.providerKey }}</span>
              <span class="model-status">{{ model.available ? $t('modelConfig.available') : $t('modelConfig.unavailable') }}</span>
            </div>
            <i :class="['icon-arrow-down', { 'rotate-180': expandedModel === index }]" />
          </div>
          <div v-if="expandedModel === index" class="model-details">
            <div class="form-item">
              <label>{{ $t('modelConfig.apiPath') }}:</label>
              <d-input v-model="model.apiPath" :placeholder="$t('modelConfig.enterApiPath')" />
            </div>
            <div class="form-item">
              <label>{{ $t('modelConfig.apiKey') }}:</label>
              <d-input v-model="model.apiKey" type="password" :placeholder="$t('modelConfig.enterApiKey')" />
            </div>
            <div class="form-item">
              <label>{{ $t('modelConfig.models') }}:</label>
              <div v-for="(subModel, subIndex) in model.models" :key="subIndex" class="sub-model-item">
                <span>{{ subModel.name }}</span>
              </div>
            </div>
            <div class="action-buttons">
              <d-button variant="outline" @click="saveModel(index)">{{ $t('modelConfig.save') }}</d-button>
            </div>
          </div>
        </div>
        <div class="action-buttons" style="margin-top: 20px;">
          <d-button variant="primary" @click="showAddForm = true">{{ '+' + $t('modelConfig.add') }}</d-button>
        </div>
      </div>
      <div class="add-model-section" v-if="showAddForm">
        <h3 class="section-title">{{ $t('modelConfig.addModel') }}</h3>
        <div class="form-item">
          <label>{{ $t('modelConfig.providerKey') }}:</label>
          <d-input v-model="newModel.providerKey" :placeholder="$t('modelConfig.enterProviderKey')" />
        </div>
        <div class="form-item">
          <label>{{ $t('modelConfig.apiPath') }}:</label>
          <d-input v-model="newModel.apiPath" :placeholder="$t('modelConfig.enterApiPath')" />
        </div>
        <div class="form-item">
          <label>{{ $t('modelConfig.apiKey') }}:</label>
          <d-input v-model="newModel.apiKey" type="password" :placeholder="$t('modelConfig.enterApiKey')" />
        </div>
        <div class="form-item">
          <label>{{ $t('modelConfig.modelName') }}:</label>
          <d-input v-model="newModel.modelName" :placeholder="$t('modelConfig.enter')" />
        </div>
        <div class="action-buttons">
          <d-button @click="showAddForm = false">{{ $t('cancel') }}</d-button>
          <d-button variant="primary" @click="addModel">{{ $t('confirm') }}</d-button>
        </div>
      </div>
    </div>
  </d-modal>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { modelConfigs, updateModelConfig, addModelConfig } from '@/models/config-service';
import { LLM_MODELS, LLMClientKey } from '@/models/config';
import type { LLMModelsConfig } from '@/models/types';
import { useI18n } from 'vue-i18n';

// 确保模型配置不为空
onMounted(() => {
    modelConfigs.value = [...LLM_MODELS];
});

// 控制添加表单的显示状态
const showAddForm = ref(false);

// 接收外部传入的modelValue属性
const props = defineProps<{
  modelValue: boolean;
}>();

// 定义emit事件
const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

// 使用i18n
const { t } = useI18n();

// 当前展开的模型索引
const expandedModel = ref<number | null>(null);

// 新模型数据
const newModel = ref<Partial<LLMModelsConfig>>({
  modelName: '',
  providerKey: '',
  apiPath: '',
  apiKey: '',
  models: [],
  available: true,
  clientKey: LLMClientKey.openai
});

// 监听modelValue变化
watch(
  () => props.modelValue,
  (newVal) => {
    if (!newVal) {
      // 关闭时重置展开状态
      expandedModel.value = null;
    }
  }
);

// 切换模型展开/收起
const toggleModel = (index: number) => {
  expandedModel.value = expandedModel.value === index ? null : index;
};

// 保存模型修改
const saveModel = (index: number) => {
  // 使用配置服务更新模型
  updateModelConfig(index, modelConfigs.value[index]);
};

// 添加新模型
const addModel = () => {
  if (!newModel.value.modelName || !newModel.value.providerKey || !newModel.value.apiPath) {
    alert(t('modelConfig.fillRequired'));
    return;
  }

  // 为新模型添加默认模型
  if (!newModel.value.models || newModel.value.models.length === 0) {
    newModel.value.models = [{
      name: newModel.value.modelName || 'default-model',
      iconPath: ''
    }];
  }

  // 添加到模型列表
  const newModelConfig = { ...newModel.value } as LLMModelsConfig;
  addModelConfig(newModelConfig);

  // 重置新模型表单
  newModel.value = {
    modelName: '',
    providerKey: '',
    apiPath: '',
    apiKey: '',
    models: [],
    available: true,
    clientKey: LLMClientKey.openai
  };

  // 隐藏添加表单，显示模型列表
  showAddForm.value = false;
};

// 处理模态框关闭
const handleModalClose = () => {
  emits('update:modelValue', false);
  // 关闭时重置展开状态
  expandedModel.value = null;
};
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.model-config-container {
  padding: 16px;
}

.section-title {
  font-size: $devui-font-size-lg;
  font-weight: 600;
  margin-bottom: 12px;
  color: $devui-text;
}

.model-list {
  margin-bottom: 24px;
}

.model-item {
  border: 1px solid $devui-line;
  border-radius: $devui-border-radius;
  margin-bottom: 12px;
  overflow: hidden;
}

.model-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: $devui-base-bg;
  cursor: pointer;
}

.model-info {
  display: flex;
  flex-direction: column;
}

.model-name {
  font-weight: 600;
  color: $devui-text;
}

.model-status {
  font-size: $devui-font-size-sm;
  color: $devui-success;
}

.model-details {
  padding: 16px;
  border-top: 1px solid $devui-line;
}

.form-item {
  margin-bottom: 16px;
}

.form-item label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: $devui-text;
}

.sub-model-item {
  padding: 6px 0;
  border-bottom: 1px dashed $devui-line;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  gap: 8px;
}

.add-model-section {
  border-top: 1px dashed $devui-line;
  padding-top: 16px;
}

.icon-arrow-down {
  transition: transform 0.3s ease;
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>