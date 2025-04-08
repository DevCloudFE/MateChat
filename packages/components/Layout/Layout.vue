<template>
  <div class="mc-layout">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.mc-layout {
  display: flex;
  flex: auto;
  flex-direction: column;

  &-aside {
    flex-direction: row;
  }
}
</style>
