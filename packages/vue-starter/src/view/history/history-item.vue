<template>
  <div :class="['history-item', isOperateOpen && 'open']">
    <span :title="itemData.messages[0].content">
      {{ itemData.messages[0].content }}
    </span>
    <OperateIcon
      class="history-operate-icon"
      @toggle-change="(e) => (isOperateOpen = e)"
      @delete="emits('delete')"
    />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { IHistoryItem } from "@/types";
import OperateIcon from "./operate-icon.vue";

defineProps({
  itemData: {
    type: Object as PropType<IHistoryItem>,
    default: () => ({}),
  },
});
const emits = defineEmits(["delete"]);

const isOperateOpen = ref(false);
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.history-item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 32px;
  line-height: 32px;
  padding: 0 8px;

  span {
    flex: 1;
    padding-right: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:deep(.history-operate-icon) {
    visibility: hidden;
    width: 12px;
  }

  &:not(:last-child) {
    margin-bottom: 4px;
  }

  &.active,
  &.open,
  &:hover {
    color: $devui-list-item-hover-text;
    background-color: $devui-list-item-hover-bg;
    border-radius: $devui-border-radius-card;
    cursor: pointer;

    :deep(.history-operate-icon) {
      visibility: visible;
    }
  }
}
</style>
