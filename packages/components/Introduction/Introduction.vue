<template>
  <div class="mc-introduction" :class="foundation.getIntroductionClasses()">
    <div class="mc-introduction-logo-container">
      <img v-if="logoImg" :src="logoImg" :alt="title" :style="foundation.getLogoStyle()" />
      <div class="mc-introduction-title">{{ title }}</div>
    </div>
    <div v-if="subTitle" class="mc-introduction-sub-title">{{ subTitle }}</div>
    <div v-if="description.length" class="mc-introduction-description">
      <div v-for="(item, index) in description" :key="index">{{ item }}</div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { IntroductionFoundation } from '@matechat/common/Introduction/foundation';
import { props } from './introduction-types';

const propsValue = defineProps(props);

const adapter = {
  getProp: (key: string) => {
    return propsValue[key as keyof typeof propsValue];
  },
  getProps: () => propsValue,
};

const foundation = new IntroductionFoundation(adapter as any);
</script>

<style scoped lang="scss">
@import '@matechat/common/Introduction/common/introduction.scss';
</style>
