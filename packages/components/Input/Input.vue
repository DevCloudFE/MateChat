<template>
  <div :class="['mc-input', { 'mc-input-disabled': disabled }]">
    <slot name="head" />
    <div class="mc-input-content">
      <slot name="prefix" />
      <Textarea />
      <slot v-if="displayType === DisplayType.Simple" name="button">
        <Button />
      </slot>
    </div>
    <div v-if="displayType === DisplayType.Full" class="mc-input-foot">
      <div class="mc-input-foot-left">
        <slot name="extra" />
        <span v-if="showCount" class="mc-input-foot-count">
          {{ inputValue.length }}{{ !(maxLength ?? false) ? '' : `/${maxLength}` }}
        </span>
      </div>
      <slot name="button">
        <Button />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, provide } from 'vue';
import Textarea from './components/textarea.vue';
import Button from './components/button.vue';
import { inputProps, inputEmits, inputInjectionKey, DisplayType } from './input-types';

const props = defineProps(inputProps);
const emits = defineEmits(inputEmits);

const inputValue = ref('');

const clearInput = () => {
  inputValue.value = '';
};
const getInput = () => inputValue.value;

watch(
  () => props.value,
  () => {
    inputValue.value = props.value;
  },
  { immediate: true },
);

defineExpose({ clearInput, getInput });
provide(inputInjectionKey, { inputValue, rootProps: props, rootEmits: emits });
</script>

<style lang="scss">
@import './input.scss';
</style>
