<template>
  <div class="mc-layout-content-container">
    <div ref="scrollerRef" class="mc-layout-content-scroller">
      <div ref="contentRef" class="mc-layout-content">
        <slot></slot>
      </div>
    </div>
    <template v-if="showScrollArrow">
      <div v-if="showUpArrow" class="mc-layout-content-arrow up" @click="scrollToTop">
        <div>
          <i class="icon icon-arrow-up-l"></i>
        </div>
      </div>
      <div v-if="showDownArrow" class="mc-layout-content-arrow down" @click="scrollToBottom">
        <div>
          <i class="icon icon-arrow-down-l "></i>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { debounce } from 'lodash-es';
import { onMounted, onUnmounted, ref } from 'vue';
import type { ILayoutContentProps } from './layout-types';

const props = withDefaults(defineProps<ILayoutContentProps>(), {
  showScrollArrow: true,
  autoScroll: true,
});
const emits = defineEmits(['onScrollerWheel', 'onScrollerScroll']);
const scrollerRef = ref<HTMLDivElement>();
const contentRef = ref<HTMLDivElement>();
const showUpArrow = ref(false);
const showDownArrow = ref(false);
const contentResizeOb = new ResizeObserver(() => {
  updateScroll();
});

let userControl = false;

const scrollToPosition = (position: number) => {
  if (scrollerRef.value) {
    scrollerRef.value.scrollTo({ top: position, behavior: 'smooth' });
  }
};
const scrollToBottom = () => {
  scrollToPosition(scrollerRef.value?.scrollHeight || 0);
};
const scrollToTop = () => {
  scrollToPosition(0);
};

const updateScroll = (force = false) => {
  if (!props.autoScroll) {
    return;
  }
  if (userControl && !force) {
    return;
  }
  scrollToBottom();
};

const wheelHandler = (event: WheelEvent) => {
  if (!scrollerRef.value) {
    return;
  }
  const isBottom =
    Math.abs(
      scrollerRef.value.scrollTop +
        scrollerRef.value.clientHeight -
        scrollerRef.value.scrollHeight,
    ) < 32;
  if (event.deltaY !== 0) {
    userControl = !isBottom;
  }
  emits('onScrollerWheel', event);
};
const scrollHandler = debounce((event: Event) => {
  const target = event.target as HTMLDivElement;
  if (!target) {
    return;
  }
  showUpArrow.value = target.scrollTop !== 0;
  showDownArrow.value =
    target.scrollTop + target.clientHeight + 32 < target.scrollHeight;
  emits('onScrollerScroll', event);
}, 100);

const addScrollerEventListener = () => {
  scrollerRef.value?.addEventListener('scroll', scrollHandler);
  scrollerRef.value?.addEventListener('wheel', wheelHandler);
};
const removeScrollerEventListener = () => {
  scrollerRef.value?.removeEventListener('scroll', scrollHandler);
  scrollerRef.value?.removeEventListener('wheel', wheelHandler);
};

onMounted(() => {
  contentResizeOb.observe(contentRef.value!);
  addScrollerEventListener();
  scrollHandler({ target: scrollerRef.value } as any);
});
onUnmounted(() => {
  contentResizeOb.disconnect();
  removeScrollerEventListener();
});

defineExpose({
  scrollerRef,
  updateScroll,
  scrollToPosition,
  scrollToBottom,
  scrollToTop,
});
</script>

<style scoped lang="scss">
@import '@matechat/common/Layout/common/layout-content.scss';
</style>
