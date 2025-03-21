<template>
  <div class="mc-prompt-icon">
    <IconComponent v-if="component" :name="name" :color="color" :size="iconSize"></IconComponent>
    <img
      v-else-if="isUrl(props.name)"
      :src="name"
      :alt="props.name.split('/')[props.name.split('/').length - 1]"
      :style="{ width: iconSize || '', verticalAlign: 'middle' }"
    />
    <i v-else :class="fontIconClass" :style="{ fontSize: iconSize, color: color }"></i>
  </div>
</template>

<script setup lang="ts">
import { resolveDynamicComponent, computed } from 'vue';
import { iconProps } from './icon-types';

const props = defineProps(iconProps);

const iconSize = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size));
const fontIconClass = computed(() => (/^icon-/.test(props.name) ? props.name : ''));
const IconComponent = props.component && resolveDynamicComponent(props.component);

function isUrl(value: string): boolean {
  return /^((http|https):)?\/\//.test(value);
}
</script>

<style lang="scss">
@import 'devui-theme/styles-var/devui-var.scss';

.mc-prompt-icon {
  display: inline-block;
  color: $devui-icon-fill;

  i {
    display: block;
    transition: all $devui-animation-duration-slow $devui-animation-ease-in-out-smooth;
  }

  img {
    display: block;
  }
}
</style>
