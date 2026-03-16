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
const scrollHandler = (event: Event) => {
  const target = event.target as HTMLDivElement;
  if (!target) {
    return;
  }
  showUpArrow.value = target.scrollTop !== 0;
  showDownArrow.value =
    target.scrollTop + target.clientHeight + 32 < target.scrollHeight;
  emits('onScrollerScroll', event);
};

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
@import 'devui-theme/styles-var/devui-var.scss';

.mc-layout-content-container {
  position: relative;
  flex: auto;
  display: flex;
  flex-direction: column;
  min-height: 0;

  .mc-layout-content-scroller {
    flex: 1;
    overflow: auto;
  }
  .mc-layout-content-arrow {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    cursor: pointer;

    &.up {
      top: 20px;
    }
    &.down {
      bottom: 20px;
    }
    &:hover {
      & > div {
        transform: scale(1.3);
        box-shadow: $devui-shadow-length-connected-overlay $devui-shadow;
      }
    }

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 24px;
      height: 24px;
      background-color: $devui-base-bg;
      border-radius: var(--devui-border-radius-full, 100px);
      box-shadow: var(--devui-box-shadow-length-base, 0 1px 6px 0) var(--devui-shadow, rgba(0, 0, 0, 0.16));
      transition:
        transform 0.3s var(--devui-animation-ease-in-out-smooth, cubic-bezier(0.645, 0.045, 0.355, 1)),
        box-shadow 0.3s var(--devui-animation-duration-base, 0.3s) var(--devui-animation-ease-in-out-smooth, cubic-bezier(0.645, 0.045, 0.355, 1));
    }
  }
}
</style>
