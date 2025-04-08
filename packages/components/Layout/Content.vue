<template>
  <div class="mc-layout-content">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.mc-layout-content {
  flex: auto;
  /* fix firefox can't set height smaller than content on flex item */
  min-height: 0;
}
</style>
