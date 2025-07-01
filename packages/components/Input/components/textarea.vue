<template>
  <textarea
    v-model="inputValue"
    :placeholder="placeholder"
    :disabled="rootProps.disabled"
    :maxlength="rootProps.maxLength"
    :class="[
      'mc-textarea',
      { 'mc-textarea-simple': rootProps.displayType === DisplayType.Simple, 'mc-textarea-disabled': rootProps.disabled },
    ]"
    @input="onInput"
    @compositionstart="onCompositionStart"
    @compositionend="onCompositionEnd"
    @keydown="onKeydown"
    @focus="onFocus"
    @blur="onBlur"
  ></textarea>
</template>

<script setup lang="ts">
import { nextTick, inject, computed } from 'vue';
import { inputInjectionKey, SubmitShortKey, DisplayType } from '../input-types';
import type { InputContext } from '../input-types';
import { useMcI18n } from '@matechat/core/Locale';

const { t } = useMcI18n();

const { inputValue, rootProps, rootEmits } = inject(inputInjectionKey) as InputContext;
const placeholder = computed(() => {
  let enterKey = '';
  let shiftEnterKey = '';
  if (rootProps.submitShortKey === SubmitShortKey.Enter) {
    enterKey = 'Enter';
    shiftEnterKey = 'Shift + Enter';
  }
  if (rootProps.submitShortKey === SubmitShortKey.ShiftEnter) {
    enterKey = 'Shift + Enter';
    shiftEnterKey = 'Enter';
  }
  return (
    rootProps.placeholder ??
    (enterKey ? t(`Input.pleaseEnterPlaceholder`, { enterKey: enterKey, shiftEnterKey: shiftEnterKey }) : t('Input.pleaseEnter'))
  );
});
let lock = false;

const emitChange = () => {
  nextTick(() => {
    rootEmits('change', inputValue.value);
  });
};
const onInput = () => {
  if (!lock) {
    emitChange();
  }
};
const onCompositionStart = () => {
  lock = true;
};
const onCompositionEnd = () => {
  lock = false;
  emitChange();
};

const onKeydown = (e: KeyboardEvent) => {
  if (rootProps.submitShortKey === null) {
    return;
  }
  const shiftKey =
    rootProps.submitShortKey === SubmitShortKey.Enter
      ? !e.shiftKey
      : rootProps.submitShortKey === SubmitShortKey.ShiftEnter
      ? e.shiftKey
      : false;
  if (shiftKey && e.key === 'Enter' && !lock) {
    e.preventDefault();
    rootEmits('submit', inputValue.value);
    inputValue.value = '';
    rootEmits('change', inputValue.value);
  }
};

const onFocus = (e: FocusEvent) => {
  rootEmits('focus', e);
}

const onBlur = (e: FocusEvent) => {
  rootEmits('blur', e);
}
</script>

<style lang="scss">
@use 'devui-theme/styles-var/devui-var.scss' as *;

.mc-textarea {
  width: 100%;
  height: 64px;
  padding: 4px 0;
  color: $devui-text;
  font-size: var(--devui-font-size, 14px);
  background-color: $devui-form-control-bg;
  vertical-align: middle;
  outline: none;
  box-sizing: border-box;
  resize: none;
  border: none;

  &.mc-textarea-simple {
    height: 32px;
  }

  &.mc-textarea-disabled {
    color: $devui-disabled-text;
    background-color: $devui-disabled-bg;
    cursor: not-allowed;
  }

  &::placeholder {
    color: $devui-placeholder;
  }
}
</style>
