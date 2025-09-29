<template>
  <d-dropdown
    :position="['top']"
    :offset='8'
    class='agent-menu'
    @toggle="(val:boolean) => (isAgentOpen = val)"
  >
    <div class="agent-wrapper">
      <img :src="selectedAgent.iconPath" />
      <span>{{ selectedAgent.label }}</span>
      <i :class="['icon-chevron-down-2', { 'is-open': isAgentOpen }]"></i>
    </div>
    <template #menu>
      <McList :data="agentList" @select="onSelectModel">
        <template #item="{ item }">
          <div class='agent-list-item'>
            <img :src="item.iconPath" />
            {{ item.label }}
          </div>
        </template>
      </McList>
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
        label: model.name,
        modelName: model.name,
        providerKey: item.providerKey,
        clientKey: item.clientKey,
        active: false,
        iconPath: model.iconPath,
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
