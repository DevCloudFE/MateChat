<template>
  <span class="container" @click="emits('click')">
    <i class="icon-at"></i>
    {{ $t("agent") }}
  </span>
</template>

<script setup lang="ts">
const emits = defineEmits(["click"]);
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.container {
  display: flex;
  align-items: center;
  color: $devui-text;
  font-size: $devui-font-size;
  cursor: pointer;

  i {
    font-size: $devui-font-size;
  }
}
</style>
