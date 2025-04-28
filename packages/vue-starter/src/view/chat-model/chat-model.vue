<template>
  <d-dropdown
    :position="['top']"
    @toggle="(val:boolean) => (isAgentOpen = val)"
  >
    <div class="agent-wrapper">
      <img src="/logo.svg" />
      <span>{{ selectedAgent.label }}</span>
      <i class="icon-infrastructure"></i>
      <i :class="['icon-chevron-down-2', { 'is-open': isAgentOpen }]"></i>
    </div>
    <template #menu>
      <McList :data="agentList" @select="onSelectModel"></McList>
    </template>
  </d-dropdown>
</template>

<script setup lang="ts">
import { LLM_MODELS } from '@/models/config';
import type { ModelOption } from '@/models/types';
import { useChatModelStore } from '@/store';
import { ref } from 'vue';

const chatModelStore = useChatModelStore();
const isAgentOpen = ref(false);
const agentList = ref<ModelOption[]>([]);

for (const item of LLM_MODELS) {
  if (item.models?.length) {
    for (const model of item.models) {
      agentList.value.push({
        label: model,
        modelName: model,
        providerKey: item.providerKey,
        active: false,
      });
    }
  }
}

const selectedAgent = ref(agentList.value[0]);
chatModelStore.currentModel = selectedAgent.value;
selectedAgent.value.active = true;

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
  background-color: $devui-area;
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
</style>
