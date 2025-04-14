<template>
  <span class="container" @click="emits('click')">
    <i class="icon-at"></i>
    智能体
  </span>
</template>

<script setup lang="ts">
const emits = defineEmits(["click"]);
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.container {
  font-size: $devui-font-size-sm;
  color: $devui-text;
  cursor: pointer;
}
</style>
