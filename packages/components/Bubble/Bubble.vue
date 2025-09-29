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
import { BubbleFoundation } from '@matechat/common/Bubble/foundation';
import { useBubbleAdapter } from './adapter';

/**
 * top - 气泡顶部区域
 * loadingTpl - 自定义 Loading 样式
 * default - 内容区
 * bottom - 气泡底部区域
 */
const slots = useSlots();
const bubbleProps = defineProps(props);
const bubbleAdapter = useBubbleAdapter(bubbleProps);
const bubbleFoundation = new BubbleFoundation(bubbleAdapter);

const bubbleClasses = computed(() => {
  return bubbleFoundation.getBubbleClasses();
});

const isEmptyAvatar = computed(() => {
  return bubbleFoundation.getIsEmptyAvatar(bubbleProps.avatarConfig);
});
</script>

<style scoped lang="scss">
@import './bubble.scss';
</style>
