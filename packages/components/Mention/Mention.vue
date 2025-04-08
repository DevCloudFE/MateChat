<template>
  <PopperTrigger ref="popperTriggerEl"><slot /></PopperTrigger>
  <Teleport to="body">
    <Transition name="mc-mention-fade">
      <div ref="overlayEl" v-if="modelValue" :class="['mc-mention', menuClass]" :style="overlayStyle"><slot name="menu" /></div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { PopperTrigger } from '@matechat/core/PopperTrigger';
import { mentionProps, mentionEmits } from './mention-types';
import { useMention } from './use-mention';

const props = defineProps(mentionProps);
const emits = defineEmits(mentionEmits);

const { popperTriggerEl, overlayEl, overlayStyle } = useMention(props, emits);
</script>

<style scoped lang="scss">
@import 'devui-theme/styles-var/devui-var.scss';

.mc-mention {
  position: fixed;
  max-height: 300px;
  border-radius: $devui-border-radius;
  background-color: $devui-connected-overlay-bg;
  box-shadow: $devui-shadow-length-connected-overlay $devui-shadow;
  transform-origin: 0% 100%;
  z-index: 1000;
}

.mc-mention-fade {
  &-enter-from,
  &-leave-to {
    opacity: 0.8;
    transform: scaleY(0.8) translateY(4px);
  }

  &-enter-to,
  &-leave-from {
    opacity: 1;
    transform: scaleY(0.9999) translateY(0);
  }

  &-enter-active {
    transition:
      transform 0.2s cubic-bezier(0.16, 0.75, 0.5, 1),
      opacity 0.2s cubic-bezier(0.16, 0.75, 0.5, 1);
  }

  &-leave-active {
    transition:
      transform 0.2s cubic-bezier(0.5, 0, 0.84, 0.25),
      opacity 0.2s cubic-bezier(0.5, 0, 0.84, 0.25);
  }
}
</style>
