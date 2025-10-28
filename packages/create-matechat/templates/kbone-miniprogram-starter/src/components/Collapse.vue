<template>
  <div class="collapse-container">
    <div class="collapse-title" @click="isExpand = !isExpand">
      <span>{{ title }}</span>
      <CollapseArrow :class="['collapse-icon', { expanded: isExpand }]" />
    </div>
    <Transition
      name="collapse-transition"
      @beforeEnter="beforeEnter"
      @enter="enter"
      @afterEnter="afterEnter"
      @beforeLeave="beforeLeave"
      @leave="leave"
      @afterLeave="afterLeave"
    >
      <div v-if="isExpand" class="collapse-content"><slot /></div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { RendererElement } from 'vue';
import CollapseArrow from './CollapseArrow.vue';

const props = defineProps({
  modelValue: { type: Boolean, default: true },
  title: { type: String, default: '' },
});
const emits = defineEmits(['update:modelValue']);

const isExpand = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emits('update:modelValue', val),
});

const beforeEnter = (el: RendererElement) => {
  if (!el.dataset) {
    el.dataset = {};
  }
  if (el.style.height) {
    el.dataset.height = el.style.height;
  }
  el.style.maxHeight = 0;
};
const enter = (el: RendererElement) => {
  requestAnimationFrame(() => {
    el.dataset.oldOverflow = el.style.overflow;
    if (el.dataset.height) {
      el.style.maxHeight = el.dataset.height;
    } else if (el.scrollHeight !== 0) {
      el.style.maxHeight = `${el.scrollHeight}px`;
    } else {
      el.style.maxHeight = 0;
    }
    el.style.overflow = 'hidden';
  });
};
const afterEnter = (el: RendererElement) => {
  el.style.maxHeight = '';
  el.style.overflow = el.dataset.oldOverflow;
};
const beforeLeave = (el: RendererElement) => {
  if (!el.dataset) {
    el.dataset = {};
  }
  el.dataset.oldOverflow = el.style.overflow;
  el.style.maxHeight = `${el.scrollHeight}px`;
  el.style.overflow = 'hidden';
};
const leave = (el: RendererElement) => {
  if (el.scrollHeight !== 0) {
    el.style.maxHeight = 0;
  }
};
const afterLeave = (el: RendererElement) => {
  el.style.maxHeight = '';
  el.style.overflow = el.dataset.oldOverflow;
};
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.collapse-title {
  position: relative;
  display: block;
  width: 100%;
  height: 40px;
  padding-left: 12px;
  padding-right: 28px;
  line-height: 40px;
  color: $devui-text;
  border-radius: $devui-border-radius;
  font-size: $devui-font-size;
  box-sizing: border-box;
  transition: font-weight $devui-animation-duration-fast
      $devui-animation-ease-in-out-smooth,
    background-color $devui-animation-duration-fast
      $devui-animation-ease-in-out-smooth;
  cursor: pointer;
}

.collapse-icon {
  position: absolute;
  top: 12px;
  right: 10px;
  transform: rotate(-90deg);
  transform-origin: center;
  transition: transform $devui-animation-duration-slow
    $devui-animation-ease-in-out-smooth;

  :deep(g path) {
    fill: $devui-icon-fill;
  }

  &.expanded {
    transform: none;
  }
}

.collapse-content {
  line-height: 1.5;
  color: $devui-text-weak;
}

.collapse-transition {
  &-enter-from,
  &-leave-to {
    opacity: 0;
  }

  &-enter-to,
  &-leave-from {
    opacity: 1;
  }

  &-enter-active,
  &-leave-active {
    transition: max-height 0.3s cubic-bezier(0.5, 0.05, 0.5, 0.95),
      opacity 0.3s cubic-bezier(0.5, 0.05, 0.5, 0.95);
  }
}
</style>
