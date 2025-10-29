<template>
  <textarea
    ref="textareaRef"
    v-model="inputValue"
    :placeholder="placeholder"
    :disabled="rootProps.disabled"
    :maxlength="rootProps.maxLength"
    :style="textareaStyle"
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
import { nextTick, inject, computed, ref, watch, onMounted } from 'vue';
import { inputInjectionKey, SubmitShortKey, DisplayType } from '../input-types';
import type { InputContext } from '../input-types';
import { useMcI18n } from '@matechat/core/Locale';
import { useMcTextareaAutosize } from './use-textarea-autosize';

const { t } = useMcI18n();

const textareaRef = ref<HTMLTextAreaElement | null>(null);
const { inputValue, rootProps, rootEmits, clearInputAfterSubmit } = inject(inputInjectionKey) as InputContext;

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

const { textareaStyle, updateTextareaStyle } = useMcTextareaAutosize({
  textareaRef,
  autosize: rootProps.autosize
});

watch(
  () => inputValue.value,
  () => {
    updateTextareaStyle();
  }
);

onMounted(() => {
  updateTextareaStyle();
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
  setTimeout(()=>{
    lock = false;
    emitChange();
  },10);
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
    clearInputAfterSubmit();
    rootEmits('change', inputValue.value);
  }
};

const onFocus = (e: FocusEvent) => {
  rootEmits('focus', e);
}

const onBlur = (e: FocusEvent) => {
  rootEmits('blur', e);
}

onMounted(() => {
  if (rootProps.autofocus && textareaRef.value && !rootProps.disabled) {
    textareaRef.value.focus();
  }
});
</script>

<style lang="scss">
@import 'devui-theme/styles-var/devui-var.scss';

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
