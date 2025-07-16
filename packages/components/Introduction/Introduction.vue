<template>
  <div class="mc-introduction" :class="[align, background]">
    <div class="mc-introduction-logo-container">
      <img v-if="logoImg" :src="logoImg" :alt="title" />
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
import { props } from './introduction-types';

defineProps(props);
</script>

<style scoped lang="scss">
@import 'devui-theme/styles-var/devui-var.scss';

.mc-introduction {
  display: flex;
  gap: 12px;
  flex-direction: column;
  color: $devui-text;

  .mc-introduction-logo-container {
    display: flex;
    align-items: center;
    gap: 8px;

    .mc-introduction-title {
      font-weight: 700;
      font-size: 32px;
      letter-spacing: 1px;
    }
  }

  .mc-introduction-sub-title {
    font-weight: 500;
    font-size: 18px;
  }

  .mc-introduction-description {
    font-size: $devui-font-size;

    & > div {
      line-height: 1.5;
    }
  }

  &.filled {
    background-color: $devui-global-bg;
    border-radius: 8px;
    padding: 8px 12px;
  }

  &.center {
    align-items: center;
    .mc-introduction-description {
      text-align: center;
    }
  }

  &.left {
    align-items: flex-start;
    .mc-introduction-description {
      text-align: left;
    }
  }

  &.right {
    align-items: flex-end;
    .mc-introduction-description {
      text-align: right;
    }
  }
}
</style>
