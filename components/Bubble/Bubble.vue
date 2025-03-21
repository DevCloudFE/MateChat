<template>
  <div class="mc-bubble" :class="bubbleClasses">
    <div v-if="avatarConfig" class="mc-bubble-avatar" :class="{ 'empty-avatar': isEmptyAvatar }">
      <Avatar
        v-bind="
          isEmptyAvatar
            ? {
                width: avatarConfig?.width || DEFAULT_AVATAR_WIDTH,
                height: avatarConfig?.height || DEFAULT_AVATAR_HEIGHT,
              }
            : avatarConfig
        "
      ></Avatar>
      <span v-if="avatarPosition === 'top'" class="mc-bubble-avatar-name">{{ avatarConfig?.displayName }}</span>
    </div>
    <div class="mc-bubble-content-container" :class="{ 'with-avatar': avatarConfig }">
      <slot v-if="!loading" name="top"></slot>
      <div v-if="loading" class="loading-container">
        <slot name="loadingTpl">
          <BubbleLoading></BubbleLoading>
        </slot>
      </div>
      <div v-if="(slots.default || content) && !loading" class="mc-bubble-content" :class="[variant]">
        <slot>{{ content }}</slot>
      </div>
      <slot v-if="!loading" name="bottom"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import Avatar from './components/Avatar.vue';
import { props } from './bubble-types';
import { DEFAULT_AVATAR_WIDTH, DEFAULT_AVATAR_HEIGHT, AVATAR_NAME, AVATAR_IMG } from './bubble-constants';
import BubbleLoading from './BubbleLoading.vue';

/**
 * top - 气泡顶部区域
 * loadingTpl - 自定义 Loading 样式
 * default - 内容区
 * bottom - 气泡底部区域
 */
const slots = useSlots();
const bubbleProps = defineProps(props);

const bubbleClasses = computed(() => {
  return [
    `mc-bubble-avatar-${bubbleProps.avatarPosition}`,
    `mc-bubble-${bubbleProps.align}`,
    bubbleProps.loading ? 'mc-bubble-loading' : '',
  ];
});

const isEmptyAvatar = computed(() => {
  if (bubbleProps.avatarConfig) {
    // 传了 avatarConfig，但是没有 name 和 imgSrc 时表示头像区域仅占位
    const keys = Object.keys(bubbleProps.avatarConfig);
    const shouldShow = keys.some((k) => k === AVATAR_NAME || k === AVATAR_IMG);
    return keys.length < 1 || !shouldShow;
  } else {
    return true;
  }
});
</script>

<style scoped lang="scss">
@import './bubble.scss';
</style>
