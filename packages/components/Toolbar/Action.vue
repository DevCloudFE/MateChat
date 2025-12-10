<template>
    <div class="mc-action-item" :title="iconInfo.label">
        <slot :action-data="iconInfo">
            <component
                v-if="innerIcon"
                :is="getSvgUrl(iconInfo.icon as ToolbarAction)"
                :is-active="iconInfo.isActive"
                :width="size ?? 16"
                :height="size ?? 16"
                :text="iconInfo.text"
                @click="iconClick"
            />
        </slot>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps, reactive } from 'vue';
import CopyIcon from './icon/CopyIcon.vue';
import DeleteIcon from './icon/DeleteIcon.vue';
import DislikeIcon from './icon/DislikeIcon.vue';
import LikeIcon from './icon/LikeIcon.vue';
import RefreshIconIcon from './icon/RefreshIcon.vue';
import ShareIcon from './icon/ShareIcon.vue';
import {
  ActionItemProps,
  ToolbarAction,
  type ToolbarEmits,
} from './toolbar.types';

const IconFileNameMap = {
  [ToolbarAction.COPY]: CopyIcon,
  [ToolbarAction.LIKE]: LikeIcon,
  [ToolbarAction.DISLIKE]: DislikeIcon,
  [ToolbarAction.REFRESH]: RefreshIconIcon,
  [ToolbarAction.SHARE]: ShareIcon,
  [ToolbarAction.DELETE]: DeleteIcon,
};

const emit = defineEmits<ToolbarEmits>();
const props = defineProps(ActionItemProps);

const iconInfo = reactive({
  ...props.configData,
});
const sizeValue = computed(() => {
  if (typeof props.size === 'string') {
    return props.size;
  }
  return `${props.size}px`;
});

// 判断是否是内置图标
const innerIcon = computed(() => {
  return (
    typeof iconInfo.icon === 'string' &&
    Object.values(ToolbarAction).includes(iconInfo.icon)
  );
});

// 获取SVG组件映射
const getSvgUrl = (action: ToolbarAction) => {
  return IconFileNameMap[action];
};

// 点击事件处理
const iconClick = (e: MouseEvent) => {
  if (
    iconInfo.icon === ToolbarAction.DISLIKE ||
    iconInfo.icon === ToolbarAction.LIKE
  ) {
    iconInfo.isActive = !iconInfo.isActive;
  }
  iconInfo.onClick?.(iconInfo, e);
  emit('onClick', iconInfo, e);
};
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";


</style>
