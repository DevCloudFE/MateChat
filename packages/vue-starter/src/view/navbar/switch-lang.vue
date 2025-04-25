<template>
  <div class="switch-lang-container" @click="onClick">
    <span>{{ langStore.currentLang === "zh-cn" ? "EN" : "CN" }}</span>
  </div>
</template>

<script setup lang="ts">
import { useLangStore } from "@/store";
import { LangType } from "@/types";

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
@import "devui-theme/styles-var/devui-var.scss";

.switch-lang-container {
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  margin-bottom: 8px;
  color: $devui-text;
  border-radius: $devui-border-radius-card;
  transition: all $devui-animation-duration-slow
    $devui-animation-ease-in-out-smooth;
  cursor: pointer;

  &:hover {
    background-color: $devui-base-bg;
    box-shadow: $devui-shadow-length-base $devui-light-shadow;
  }
}
</style>
