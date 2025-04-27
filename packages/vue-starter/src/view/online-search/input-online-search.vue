<template>
  <d-tooltip position="top" :content="$t('underDevelop')">
    <span class="input-online-search-container">
      <d-switch v-model="checked" size="sm"></d-switch>
      {{ $t("onlineSearch") }}
    </span>
  </d-tooltip>
</template>

<script setup lang="ts">
const checked = ref(false);
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.input-online-search-container {
  display: flex;
  align-items: center;
  color: $devui-text;
}
</style>
