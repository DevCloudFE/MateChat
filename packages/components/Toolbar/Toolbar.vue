<template>
  <div class="mc-actions" :style="{ gap: `${gap}px` }">
    <!-- 显示的操作项 -->
    <template v-for="(item, index) in actionItems" :key="item.key || index">
      <component
        v-if="isVNode(item.contentRender) || (typeof item.contentRender === 'function' && isVNode(item.contentRender()))"
        :is="isVNode(item.contentRender) ? item.contentRender : item.contentRender()"
      />
      <Action
        v-else
        :configData="item"
        :size="iconSize"
        @on-click="actionItemClick"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { isVNode, reactive } from 'vue';
import Action from './Action.vue';
import {
  type ActionItem,
  ToolbarAction,
  type ToolbarEmits,
  ToolbarProps,
} from './toolbar.types';

const emit = defineEmits<ToolbarEmits>();
const props = defineProps(ToolbarProps);

const actionItems = reactive(props.items?.map((item) => ({ ...item })));

const actionItemClick = (actionItem: ActionItem, e: MouseEvent) => {
  if (actionItem.icon === ToolbarAction.LIKE) {
    lickActionClick(actionItem.isActive);
  } else if (actionItem.icon === ToolbarAction.DISLIKE) {
    dislikeActionClick(actionItem.isActive);
  }
  emit('onClick', actionItem, e);
};

const lickActionClick = (isActive: boolean) => {
  const index = props.items.findIndex(
    (item) => item.icon === ToolbarAction.DISLIKE,
  );
  cutActionItems(index, isActive);
};

const dislikeActionClick = (isActive: boolean) => {
  const index = props.items.findIndex(
    (item) => item.icon === ToolbarAction.LIKE,
  );
  cutActionItems(index, isActive);
};

const cutActionItems = (index: number, isActive: boolean) => {
  if (index === -1) {
    return;
  }
  if (isActive) {
    actionItems.splice(index, 1);
  } else {
    actionItems.splice(index, 0, props.items[index]);
  }
};
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.mc-actions {
  display: inline-flex;
  align-items: center;
}
</style>
