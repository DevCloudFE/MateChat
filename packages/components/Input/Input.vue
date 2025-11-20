<template>
  <div :class="inputClasses">
    <slot name="head" />
    <div class="mc-input-content">
      <slot name="prefix" />
      <!-- 替换Textarea -->
      <div v-if="showEditableBlock" class="editable-block-container">
        <!-- 可编辑块 -->
         <EditableBlock v-if="showEditableBlock"
          ref="editableBlockRef"
          :placeholder="props.placeholder"
          :maxLength="props.maxLength"
          :disabled="props.disabled"
          :submit-short-key="props.submitShortKey"
          :autofocus="props.autofocus"
          @input="handleDivInput"
          @send="handleDivSubmit"
          @blur="onDivBlur"
          @focus="onDivFocus"
         >
          <template #tipTagIcon>
            <slot name="tipTagIcon" ></slot>
          </template>
         </EditableBlock>
      </div>
      <Textarea v-if="!showEditableBlock"/>
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
import EditableBlock from "./components/EditableBlock.vue";
import Button from "./components/button.vue";
import {
  inputProps,
  inputEmits,
  inputInjectionKey,
  DisplayType,
  InputVariant,
  MixTagItem,
} from "./input-types";

const props = defineProps(inputProps);
const emits = defineEmits(inputEmits);
const editableBlockRef:any = ref(null);
const showEditableBlock = ref(false);
const inputValue = ref("");
const inputClasses = computed(() => ({
  "mc-input": true,
  "mc-input-disabled": props.disabled,
  "mc-input-simple": props.displayType === DisplayType.Simple,
  "mc-input-borderless": props.variant === InputVariant.BorderLess,
}));

const clearInput = () => {
  if(showEditableBlock.value) {
    editableBlockRef.value?.clearInput();
  }else{
    inputValue.value = "";
  }
};

const clearInputAfterSubmit = () => {
  if (props.autoClear) {
    clearInput();
  }
};
const getInput = () => {
  if(showEditableBlock.value) {
    return editableBlockRef.value?.getInput();
  }
  return inputValue.value;
}

const setInputTag = (key: string, placeholder: string, defaultValue?:string) => {
  if(props.disabled) {
    return;
  }
  showEditableBlock.value = true;
  setTimeout(() => {
    editableBlockRef.value?.setInputTag(key, placeholder, defaultValue);
  }, 50);
}

const setText = (text: string) => {
  if(props.disabled) {
    return;
  }
  showEditableBlock.value = true;
  setTimeout(() => {
    editableBlockRef.value?.setText(text);
  }, 50);
  
}

const setMixTags = (mixTagConfig: MixTagItem[]) => {
  if(props.disabled) {
    return;
  }
  showEditableBlock.value = true;
  setTimeout(() => {
    editableBlockRef.value?.setMixTags(mixTagConfig);
  }, 50);
}

const openTipTag = (tipTagText: string, clearInput?: boolean) => {
  if(props.disabled) {
    return;
  }
  showEditableBlock.value = true;
  setTimeout(() => {
    editableBlockRef.value?.openTipTag(tipTagText, clearInput);
  }, 50);
}

const closeTipTag = () => {
  if(showEditableBlock.value) {
    editableBlockRef.value?.closeTipTag();
  }
}

const handleDivInput = (value: string) => {
  if(!value) {
    setTimeout(() => {
      showEditableBlock.value = false;
    }, 50);
  }
  inputValue.value = value;
  emits('change', value);
}

const handleDivSubmit = (value: string) => {
  emits('submit', value);
}

const onDivBlur = (e: FocusEvent) => {
  emits('blur', e);
}

const onDivFocus = (e: FocusEvent) => {
  emits('focus', e);
}

watch(
  () => props.value,
  () => {
    inputValue.value = props.value;
  },
  { immediate: true }
);

defineExpose({ clearInput, getInput, setInputTag, setText, setMixTags, openTipTag, closeTipTag });
provide(inputInjectionKey, { inputValue, rootProps: props, rootEmits: emits, clearInputAfterSubmit });
</script>

<style lang="scss">
@import "./input.scss";
</style>
