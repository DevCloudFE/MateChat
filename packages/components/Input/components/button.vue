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

const { inputValue, rootProps, rootEmits } = inject(
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
    inputValue.value = "";
    rootEmits('change', inputValue.value);
  }
};
</script>

<style scoped lang="scss">
@import '@matechat/common/Base/vue.scss';
@import '@matechat/common/Input/common/button.scss';
</style>
