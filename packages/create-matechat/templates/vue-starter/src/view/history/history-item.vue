<template>
  <div :class="['history-item', isOperateOpen && 'open']">
    <div class="history-item-top">
      <span :title="itemData.messages[0].content.text">
        {{ itemData.messages[0].content.text }}
      </span>
      <OperateIcon
        class="history-operate-icon"
        @toggle-change="(e) => (isOperateOpen = e)"
        @delete="emits('delete')"
      />
    </div>
    <div class="history-item-bottom">
      <div class="agent-box">
        <img :src="itemData.chatModel?.iconPath" />
        <span class="agent-name" :title="itemData.chatModel?.modelName">
          {{ itemData.chatModel?.modelName ?? "MateChat" }}
        </span>
      </div>
      <span class="create-time">{{ itemData.updateTime }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IHistoryItem } from '@/types';
import type { PropType } from 'vue';
import OperateIcon from './operate-icon.vue';

defineProps({
  itemData: {
    type: Object as PropType<IHistoryItem>,
    default: () => ({}),
  },
});
const emits = defineEmits(['delete']);

const isOperateOpen = ref(false);
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.history-item {
  width: 100%;
  height: 82px;
  padding: 16px;
  border-radius: 8px;
  box-sizing: border-box;
  background-color: $devui-base-bg;

  .history-item-top {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    span {
      flex: 1;
      height: 22px;
      line-height: 22px;
      font-size: $devui-font-size;
      padding-right: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &:deep(.history-operate-icon) {
      visibility: hidden;
      width: 12px;
    }
  }

  .history-item-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .agent-box {
      display: flex;
      align-items: center;
      flex: 1;
      width: 0;
      margin-right: 8px;

      img {
        width: 16px;
        height: 16px;
        margin-right: 8px;
      }

      .agent-name {
        flex: 1;
        width: 0;
        height: 20px;
        line-height: 20px;
        color: $devui-aide-text;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .create-time {
      width: 32px;
      height: 20px;
      line-height: 20px;
      font-size: $devui-font-size-sm;
      color: #aeaeae;
    }
  }

  &:not(:last-child) {
    margin-bottom: 8px;
  }
}

body[ui-theme="infinity-theme"] {
  .history-item {
    &.active,
    &.open,
    &:hover {
      background: linear-gradient(
        to right,
        #f3efff,
        #f3efff33,
        #e2f1fd33,
        #e2f1fd
      );
      box-shadow: 2px 2px 8px #e9e9e9;
      cursor: pointer;

      :deep(.history-operate-icon) {
        visibility: visible;
      }
    }
  }
}

body[ui-theme="galaxy-theme"] {
  .history-item {
    border: 1px solid transparent;

    &.active,
    &.open,
    &:hover {
      border-color: $devui-line;
      cursor: pointer;

      :deep(.history-operate-icon) {
        visibility: visible;
      }
    }
  }
}
</style>
