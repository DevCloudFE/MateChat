<template>
  <div :class="inputClasses">
    <slot name="head" />
    <div class="mc-input-content">
      <slot name="prefix" />
      <Textarea />
      <slot name="suffix" />
      <slot v-if="displayType === DisplayType.Simple" name="button">
        <Button />
      </slot>
    </div>
    <div v-if="displayType === DisplayType.Full" class="mc-input-foot">
      <div class="mc-input-foot-left">
        <slot name="extra" />
        <span v-if="showCount" class="mc-input-foot-count">
          {{ inputValue.length
          }}{{ !(maxLength ?? false) ? "" : `/${maxLength}` }}
        </span>
      </div>
      <slot name="button">
        <Button />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, provide, computed } from "vue";
import Textarea from "./components/textarea.vue";
import Button from "./components/button.vue";
import {
  inputProps,
  inputEmits,
  inputInjectionKey,
  DisplayType,
  InputVariant,
} from "./input-types";

const props = defineProps(inputProps);
const emits = defineEmits(inputEmits);

const inputValue = ref("");
const inputClasses = computed(() => ({
  "mc-input": true,
  "mc-input-disabled": props.disabled,
  "mc-input-simple": props.displayType === DisplayType.Simple,
  "mc-input-borderless": props.variant === InputVariant.BorderLess,
}));

const clearInput = () => {
  inputValue.value = "";
};
const clearInputAfterSubmit = () => {
  if (props.autoClear) {
    clearInput();
  }
};
const getInput = () => inputValue.value;

watch(
  () => props.value,
  () => {
    inputValue.value = props.value;
  },
  { immediate: true }
);

defineExpose({ clearInput, getInput });
provide(inputInjectionKey, { inputValue, rootProps: props, rootEmits: emits, clearInputAfterSubmit });
</script>

<style lang="scss">
@import "./input.scss";
</style>
