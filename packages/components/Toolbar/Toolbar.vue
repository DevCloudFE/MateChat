<template>
  <div class="mc-actions" :style="{ gap: `${gap}px` }">
    <!-- 显示的操作项 -->
    <template
      v-for="item in actionItems"
      :key="item.key"
    >
      <slot :name="item.key" :action-data="item">
        <div
          v-if="slots[`${item.key}-icon`]"
          class="mc-action-item"
          :title="item.label"
          @click="actionClick($event, item)"
        >
          <slot :name="`${item.key}-icon`" :action-data="item"></slot>
        </div>
        <component
          v-else
          :is="IconFileNameMap[item.icon]"
          :is-active="item.isActive"
          :width="iconSize ?? 16"
          :height="iconSize ?? 16"
          :text="item.text"
          :title="item.label"
          class="mc-action-item"
          @active-change="activeChange($event, item)"
          @click="actionClick($event, item)"
        />
      </slot>
    </template>
  </div>
</template>

<script setup lang="ts">
import { reactive, useSlots } from 'vue';
import CopyIcon from './icon/CopyIcon.vue';
import DeleteIcon from './icon/DeleteIcon.vue';
import DislikeIcon from './icon/DislikeIcon.vue';
import LikeIcon from './icon/LikeIcon.vue';
import RefreshIconIcon from './icon/RefreshIcon.vue';
import ShareIcon from './icon/ShareIcon.vue';
import {
  type ActionItem,
  ToolbarAction,
  type ToolbarEmits,
  ToolbarProps,
} from './toolbar.types';

const emit = defineEmits<ToolbarEmits>();
const props = defineProps(ToolbarProps);
const slots = useSlots();

const actionItems = reactive(props.items?.map((item) => ({ ...item })));
const IconFileNameMap = {
  [ToolbarAction.COPY]: CopyIcon,
  [ToolbarAction.LIKE]: LikeIcon,
  [ToolbarAction.DISLIKE]: DislikeIcon,
  [ToolbarAction.REFRESH]: RefreshIconIcon,
  [ToolbarAction.SHARE]: ShareIcon,
  [ToolbarAction.DELETE]: DeleteIcon,
};

const init = () => {
  const likeAction = actionItems.find(
    (item) => item.icon === ToolbarAction.LIKE,
  );
  const dislikeAction = actionItems.find(
    (item) => item.icon === ToolbarAction.DISLIKE,
  );
  if (likeAction?.isActive && dislikeAction) {
    dislikeAction.isActive = false;
  }
};

const lickActionClick = () => {
  const dislikeAction = actionItems.find(
    (item) => item.icon === ToolbarAction.DISLIKE,
  );
  if (dislikeAction) {
    dislikeAction.isActive = false;
  }
};

const dislikeActionClick = () => {
  const likeAction = actionItems.find(
    (item) => item.icon === ToolbarAction.LIKE,
  );
  if (likeAction) {
    likeAction.isActive = false;
  }
};

const actionClick = (e: MouseEvent, actionItem: ActionItem) => {
  if (actionItem.icon === ToolbarAction.LIKE) {
    lickActionClick();
  } else if (actionItem.icon === ToolbarAction.DISLIKE) {
    dislikeActionClick();
  }
  actionItem.onClick?.(actionItem, e);
  emit('onClick', actionItem, e);
};

const activeChange = (isActive: boolean, actionItem: ActionItem) => {
  actionItem.isActive = isActive;
};

init();
</script>

<style scoped lang="scss">
@use './toolbar.scss';
</style>
