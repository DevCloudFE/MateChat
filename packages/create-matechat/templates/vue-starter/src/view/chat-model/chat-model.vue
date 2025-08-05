<template>
  <d-dropdown
    :position="['top', 'top-start']"
    :offset='8'
    class='agent-menu'
    @toggle="(val:boolean) => (isAgentOpen = val)"
  >
    <div class="agent-wrapper">
      <img v-if="selectedAgent?.iconPath" :src="selectedAgent.iconPath" />
      <span>{{ selectedAgent?.label }}</span>
      <i :class="['icon-chevron-down-2', { 'is-open': isAgentOpen }]"></i>
    </div>
    <template #menu>
      <McList :data="agentList" @select="onSelectModel">
        <template #item="{ item }">
          <div class='agent-list-item'>
            <img v-if="item.iconPath" :src="item.iconPath" />
            {{ item.label }}
          </div>
        </template>
      </McList>
    </template>
  </d-dropdown>
</template>

<script setup lang="ts">
import { modelConfigs, getModelConfigs } from '@/models/config-service';
import type { ModelOption, LLMModelsConfig } from '@/models/types';
import { useChatModelStore } from '@/store';
import { onMounted, ref, watch } from 'vue';

const chatModelStore = useChatModelStore();
const isAgentOpen = ref(false);
const agentList = ref<ModelOption[]>([]);
const selectedAgent = ref<ModelOption | null>(null);

// 构建模型列表
const buildAgentList = (models: LLMModelsConfig[]) => {
  const list: ModelOption[] = [];
  for (const item of models) {
    if (item.models?.length) {
      for (const model of item.models) {
        list.push({
          label: model.name,
          modelName: model.name,
          providerKey: item.providerKey,
          apiKey: item.apiKey,
          apiPath: item.apiPath,
          clientKey: item.clientKey,
          active: false,
          iconPath: model.iconPath,
        });
      }
    }
  }
  return list;
};

// 初始化模型列表
const initAgentList = async () => {
  const models = await getModelConfigs();
  agentList.value = buildAgentList(models);
  selectedAgent.value = agentList.value[0] || null;
  console.log('selectedAgent', selectedAgent.value)
  if (selectedAgent.value) {
    chatModelStore.currentModel = selectedAgent.value;
    chatModelStore.currentModelName = selectedAgent.value.modelName;
    selectedAgent.value.active = true;
  }
};

onMounted(()=> {
  initAgentList();
})

// 监听模型配置变化，更新模型列表
watch(
  () => modelConfigs.value,
  (newModels) => {
    const newAgentList = buildAgentList(newModels);
    agentList.value = newAgentList;

    // 如果当前选中的模型不在新列表中，选择第一个模型
    const currentModelExists = newAgentList.some(
      item => item.modelName === selectedAgent.value?.modelName &&
              item.providerKey === selectedAgent.value?.providerKey
    );

    if (!currentModelExists && newAgentList.length > 0) {
      selectedAgent.value = newAgentList[0];
      chatModelStore.currentModel = selectedAgent.value;
      chatModelStore.currentModelName = selectedAgent.value.modelName;
      selectedAgent.value.active = true;
    }
  },
  { deep: true }
);

const onSelectModel = (val) => {
  for (const item of agentList.value) {
    item.active = item.label === val.label;
  }
  selectedAgent.value = val;
  chatModelStore.currentModel = val;
  chatModelStore.currentModelName = val.modelName;
};
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.agent-wrapper {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: $devui-border-radius-full;
  background-color: $devui-base-bg;
  box-shadow: 0px 1px 8px 0px rgba(25, 25, 25, 0.06);
  cursor: pointer;

  img {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }

  span {
    font-size: $devui-font-size;
    color: $devui-text;
    margin-right: 8px;
    word-break: break-all;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  i {
    font-size: $devui-font-size;
    color: $devui-text;
    transition: transform 0.3s ease-in-out;

    &:last-child {
      margin-left: 4px;
    }
  }

  .is-open {
    transform: rotate(180deg);
  }
}

.agent-list-item {
  display: flex;
  align-items: center;

  img {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
}
</style>

<style lang='scss'>
.agent-menu {
  width: 230px;
  padding: 8px;
}
</style>
