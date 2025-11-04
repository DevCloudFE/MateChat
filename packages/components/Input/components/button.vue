<template>
  <button
    :disabled="rootProps.disabled || (!rootProps.loading && !inputValue)"
    :class="buttonClasses"
    @click="onConfirm"
    @mousedown="() => (isMouseDown = true)"
    @mouseup="() => (isMouseDown = false)"
  >
    <span class="mc-button-content">
      <LoadingIcon v-if="rootProps.loading" />
      <SendIcon v-else />
      <span v-if="rootProps.sendBtnVariant === SendBtnVariant.Full">
        {{ rootProps.loading ? t("Input.pauseAnswer") : t("Input.send") }}
      </span>
    </span>
    <div v-if="showWave" class="mc-button-water-wave" :style="waveStyle"></div>
  </button>
</template>

<script setup lang="ts">
import { inject, ref, reactive, computed } from "vue";
import LoadingIcon from "./LoadingIcon.vue";
import SendIcon from "./SendIcon.vue";
import { inputInjectionKey, SendBtnVariant } from "../input-types";
import type { InputContext } from "../input-types";
import { useMcI18n } from "@matechat/core/Locale";

const { t } = useMcI18n();

const { inputValue, rootProps, rootEmits, clearInputAfterSubmit } = inject(
  inputInjectionKey
) as InputContext;
const isMouseDown = ref(false);
const showWave = ref(false);
const waveStyle = reactive({
  top: "0px",
  left: "0px",
});
const buttonClasses = computed(() => ({
  "mc-button": true,
  "mc-button-loading": rootProps.loading,
  mousedown: isMouseDown.value,
  "mc-button-simple": rootProps.sendBtnVariant === SendBtnVariant.Simple,
}));

const showClickWave = (e: MouseEvent) => {
  waveStyle.left = e.offsetX + "px";
  waveStyle.top = e.offsetY + "px";
  showWave.value = true;

  setTimeout(() => {
    showWave.value = false;
  }, 300);
};

const onConfirm = (e: MouseEvent) => {
  showClickWave(e);
  if (rootProps.loading) {
    rootEmits("cancel");
  } else {
    rootEmits("submit", inputValue.value);
    clearInputAfterSubmit();
    rootEmits('change', inputValue.value);
  }
};
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.mc-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  height: 32px;
  line-height: 1.5;
  color: $devui-light-text;
  font-size: var(--devui-font-size, 14px);
  padding: 0 12px;
  border-radius: 20px;
  background-color: $devui-primary;
  overflow: hidden;
  border: none;
  cursor: pointer;
  transition: background-color $devui-animation-duration-slow
      $devui-animation-ease-in-out-smooth,
    border-color $devui-animation-duration-slow
      $devui-animation-ease-in-out-smooth,
    color $devui-animation-duration-slow $devui-animation-ease-in-out-smooth;

  &.mc-button-loading {
    svg {
      animation: rotating 1s linear infinite;
    }
  }

  &.mousedown:not(:disabled) {
    transform: scale(0.95);
  }

  &.mc-button-simple {
    width: 32px;
    padding: 6px;
    flex-shrink: 0;
    border-radius: 100%;

    svg {
      margin-right: 0;
    }
  }

  &:hover {
    background-color: $devui-primary-hover;
  }
  &:active {
    background-color: $devui-primary-active;
  }
  &:disabled {
    color: $devui-light-text;
    background-color: $devui-primary-disabled;
    cursor: not-allowed;
  }

  .mc-button-content {
    display: inline-flex;
    align-items: center;
    font-size: var(--devui-font-size, 14px);
  }

  .mc-button-water-wave {
    position: absolute;
    background-color: $devui-base-bg;
    border-radius: 50%;
    opacity: 0;
    width: 20px;
    height: 20px;
    transform: translate(-50%, -50%);
    animation: waterWave $devui-animation-duration-slow $devui-animation-linear;
  }

  svg {
    :deep(path) {
      fill: $devui-light-text;
    }
    margin-right: 4px;
  }
}

@keyframes rotating {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(180deg);
  }
}

@keyframes waterWave {
  0% {
    opacity: 0.2;
    width: 30px;
    height: 30px;
  }

  100% {
    opacity: 0;
    width: 200px;
    height: 200px;
  }
}
</style>
