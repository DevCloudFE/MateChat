<template>
  <span class="editable-span" contenteditable="false">
    <span 
      ref="editableSpanRef"
      :contenteditable="isEditable"
      :placeholder="placeholder"
      class="input-custom-item"
      :class="{'input-custom-placeholder': !localValue?.length, 'inline-text': localValue?.length}"
      tabindex="0"
      @input.stop="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @paste.stop="handleInputPaste"
    >
      {{ content }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { handlePaste} from './util';
const emits = defineEmits(['change']);
const props = defineProps({
  content: String,
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const isEditable = ref(false);
const localValue = ref(props.content);
const editableSpanRef: any = ref(null);

watch(() => props.content, (newVal) => {
  localValue.value = newVal;
});

const handleFocus = () => {
  isEditable.value = !props.disabled;
};

const handleBlur = () => {
  isEditable.value = false;
};

const handleInput = (e: any) => {
  const prompt = editableSpanRef.value?.textContent || '';
  localValue.value = prompt;
  emits('change', prompt);
};

const handleInputPaste = (e: any) => {
  handlePaste(e);
  handleInput(e);
};

</script>

<style lang="scss" scoped>
@import "devui-theme/styles-var/devui-var.scss";
.input-custom-item {
  display: inline-block;
  border: none;
  padding: 0 8px;
  outline: none;
  width: auto;
  max-width: 100%;
  border-radius: 2px;
  background-color: $devui-list-item-hover-bg;
  color: $devui-text;
  font-family: inherit;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
  margin: 0 2px;
}

.input-custom-placeholder:after {
  color: $devui-placeholder;
  content: attr(placeholder);
}

.inline-text {
  display: inline;
  padding: 2px 8px;
}
</style>