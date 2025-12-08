<template>
    <div class="mc-action-item">
        <!-- 枚举类型图标（SVG） -->
        <img
            v-if="innerIcon"
            :src="getSvgUrl(iconInfo.icon as ToolbarAction)"
            :width="size ?? 16"
            :height="size ?? 16"
            @click="iconClick"
        />
        <!-- VNode 类型图标 -->
        <component
            v-else-if="isVNode(iconInfo.icon) || iconIsFunVNode"
            :is="iconIsFunVNode ? (iconInfo.icon as Function)() : iconInfo.icon"
            :style="{ width: `${size ?? 16}px`, height: `${size ?? 16}px` }"
            @click="iconClick"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps, isVNode, onBeforeUnmount, reactive } from 'vue';
import CopyIcon from './icon/copy.svg';
import DeleteIcon from './icon/delete.svg';
import DislikeIcon from './icon/dislike.svg';
import LikeActiveIcon from './icon/like-solid.svg';
import LikeIcon from './icon/like.svg';
import RightIcon from './icon/right.svg';
// import RefreshIcon from './icon/refresh.svg';
import ShareIcon from './icon/share.svg';
import {
  ActionItemProps,
  ToolbarAction,
  type ToolbarEmits,
} from './toolbar.types';

const IconFileNameMap = {
  [ToolbarAction.COPY]: CopyIcon,
  [ToolbarAction.LIKE]: LikeIcon,
  [ToolbarAction.DISLIKE]: DislikeIcon,
  // [ToolbarAction.REFRESH]: RefreshIcon,
  [ToolbarAction.SHARE]: ShareIcon,
  [ToolbarAction.DELETE]: DeleteIcon,
};

const emit = defineEmits<ToolbarEmits>();
const props = defineProps(ActionItemProps);

const iconInfo = reactive({
  ...props.configData,
});
const COPY_RIGHT_TIME = 3000;
let copyTimer = null;

onBeforeUnmount(() => {
  clearTimeout(copyTimer);
});

// 判断是否是内置图标
const innerIcon = computed(() => {
  return (
    typeof iconInfo.icon === 'string' &&
    Object.values(ToolbarAction).includes(iconInfo.icon)
  );
});

const iconIsFunVNode = computed(() => {
  return typeof iconInfo.icon === 'function' && isVNode(iconInfo.icon());
});

// 获取SVG组件映射
const getSvgUrl = (action: ToolbarAction) => {
  if (action === ToolbarAction.LIKE && iconInfo.isActive) {
    return LikeActiveIcon;
  }
  if (action === ToolbarAction.DISLIKE && iconInfo.isActive) {
    // TODO 点踩的激活图标
  }
  if (action === ToolbarAction.COPY && iconInfo.isActive) {
    return RightIcon;
  }
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
  if (iconInfo.icon === ToolbarAction.COPY && !iconInfo.isActive) {
    iconInfo.isActive = true;
    copy();
  }
  iconInfo.onClick?.(iconInfo, e);
  emit('onClick', iconInfo, e);
};

const copy = async () => {
  try {
    await copyToClipboard(iconInfo.text);
    copyTimer = setTimeout(() => {
      iconInfo.isActive = false;
    }, COPY_RIGHT_TIME);
  } catch (e) {}
};

/**
 * 复制文本到剪贴板（兼容多浏览器）
 * @param {string} text - 要复制的文本内容
 * @returns {Promise<string>} - 成功返回"success"，失败返回错误信息
 */
function copyToClipboard(text) {
  // 校验输入
  if (typeof text !== 'string') {
    return Promise.reject();
  }

  // 现代浏览器优先使用 Clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard
      .writeText(text)
      .then(() => {})
      .catch((err) => {
        return fallbackCopyTextToClipboard(text); // 降级处理
      });
  }

  // 低版本浏览器直接使用降级方案
  return fallbackCopyTextToClipboard(text);
}

/**
 * 降级复制方案（基于 execCommand）
 * @param {string} text - 要复制的文本
 * @returns {Promise<string>}
 */
function fallbackCopyTextToClipboard(text) {
  return new Promise((resolve, reject) => {
    // 创建隐藏的 textarea 元素
    const textarea = document.createElement('textarea');
    textarea.value = text;

    // 样式：隐藏且不影响布局
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.left = '-9999px';
    textarea.style.opacity = '0';
    textarea.style.zIndex = '-1000';

    // 解决 iOS 下无法选中的问题
    textarea.setAttribute('readonly', '');

    document.body.appendChild(textarea);

    try {
      // 选中内容（兼容 iOS）
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length); // 移动端必须

      // 执行复制
      const success = document.execCommand('copy');
      if (success) {
        resolve(null);
      } else {
        reject();
      }
    } catch (err) {
      reject();
    } finally {
      // 移除临时元素
      document.body.removeChild(textarea);
    }
  });
}
</script>

<style scoped lang="scss">
/* 保持原样式不变 */
@import "devui-theme/styles-var/devui-var.scss";

.mc-action-item {
  cursor: pointer;
}
</style>
