<template>
  <PopperTrigger ref="popperTriggerEl"><slot /></PopperTrigger>
  <Teleport to="body">
    <Transition name="mc-mention-fade">
      <div ref="overlayEl" v-if="modelValue" :class="['mc-mention', menuClass]" :style="overlayStyle"><slot name="menu" /></div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { PopperTrigger } from '../PopperTrigger';
import { mentionProps, mentionEmits } from './mention-types';
import { useMention } from './use-mention';

const props = defineProps(mentionProps);
const emits = defineEmits(mentionEmits);

const { popperTriggerEl, overlayEl, overlayStyle } = useMention(props, emits);
</script>

<style scoped lang="scss">
@import 'devui-theme/styles-var/devui-var.scss';
@import '@matechat/common/Mention/common/mention.scss';

</style>
