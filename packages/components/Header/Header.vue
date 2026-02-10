<template>
  <div class="mc-header">
    <div class="mc-header-logo-container" :class="{ clickable: logoClickable }" @click="onLogoClicked">
      <img v-if="logoImg" class="mc-header-logo" :src="logoImg" :alt="logoImg" />
      <div class="mc-header-title">{{ title }}</div>
    </div>
    <div class="mc-header-operation">
      <slot name="operationArea"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { props } from './header-types';

const emits = defineEmits(['logoClicked']);
const headerProps = defineProps(props);

const onLogoClicked = () => {
  if (headerProps.logoClickable) {
    emits('logoClicked');
  }
};
</script>

<style scoped lang="scss">
@use '@matechat/common/Header/common/header.scss';

</style>
