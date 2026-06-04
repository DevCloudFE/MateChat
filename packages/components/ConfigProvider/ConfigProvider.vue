<template>
  <slot></slot>
</template>

<script setup lang="ts">
import type { ConfigProviderProps } from './types';
import useConfigProvider from './useConfigProvider';

const props = defineProps<ConfigProviderProps>();

useConfigProvider(props);
</script>

<style scoped lang="scss"></style>