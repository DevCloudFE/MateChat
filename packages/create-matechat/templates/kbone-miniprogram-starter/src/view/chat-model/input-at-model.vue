<template>
  <div class="container" @click="emits('click')">
    <i class="icon-at"></i>
    <span>{{ $t('agent') }}</span>
  </div>
</template>
<script setup lang="ts">
const emits = defineEmits(['click']);
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.container {
  display: flex;
  gap: 4px;
  align-items: center;
  height: 30px;
  color: $devui-text;
  border-radius: 4px;
  padding: 6px;
  cursor: pointer;

  span {
    font-size: $devui-font-size-sm;
  }

  &:hover {
    background-color: var(--devui-icon-hover-bg);
  }
}

@media screen and (max-width: 520px) {
  .container span {
    display: none;
  }
}
</style>
