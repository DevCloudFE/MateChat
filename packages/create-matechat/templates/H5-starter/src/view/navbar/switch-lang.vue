<template>
  <div class="switch-lang-container" @click="onClick">
    <span>{{ langStore.currentLang === "zh-cn" ? "EN" : "CN" }}</span>
  </div>
</template>

<script setup lang="ts">
import { useLangStore } from '@/store';
import { LangType } from '@/types';

const langStore = useLangStore();

const onClick = () => {
  if (langStore.currentLang === LangType.CN) {
    langStore.updateCurrentLang(LangType.EN);
  } else {
    langStore.updateCurrentLang(LangType.CN);
  }
};
</script>

<style scoped lang="scss">
</style>
