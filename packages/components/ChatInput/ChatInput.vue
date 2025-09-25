<template>
  <div
    class="mc-chat-input"
    :class="rootClasses"
    :aria-disabled="props.disabled ? 'true' : undefined"
  >
    <div v-if="slots.head" class="mc-chat-input__head">
      <slot name="head" :value="props.modelValue"></slot>
    </div>
    <div class="mc-chat-input__body" :class="bodyClasses">
      <div v-if="slots.prefix" class="mc-chat-input__prefix">
        <slot name="prefix" :value="props.modelValue"></slot>
      </div>
      <div ref="editorRef" class="mc-chat-input__editor"></div>
      <div v-if="showSuffixInline" class="mc-chat-input__suffix">
        <slot name="suffix" :value="props.modelValue"></slot>
      </div>
    </div>
    <div v-if="showFoot" class="mc-chat-input__foot">
      <div v-if="hasExtraSlot" class="mc-chat-input__extra">
        <slot name="extra" :value="props.modelValue"></slot>
      </div>
      <div
        v-if="showSuffixInFoot"
        class="mc-chat-input__suffix mc-chat-input__suffix--foot"
      >
        <slot name="suffix" :value="props.modelValue"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import {
  chatInputProps,
  chatInputEmits,
  type ChatInputExpose,
} from "./chat-input-types";
import { useChatInputEditor } from "./use-chat-input-editor";

const props = defineProps(chatInputProps);
const emit = defineEmits(chatInputEmits);
const slots = useSlots();

const hasPrefixSlot = computed(() => Boolean(slots.prefix));
const hasSuffixSlot = computed(() => Boolean(slots.suffix));
const hasExtraSlot = computed(() => Boolean(slots.extra));
const hasHeadSlot = computed(() => Boolean(slots.head));
const isMultiline = computed(() => (props.modelValue ?? "").includes("\n"));

const emitSubmitIfValid = (value: string) => {
  if (props.disabled) return;
  if (value.trim().length === 0) {
    return;
  }
  emit("submit", value);
};

const editorApi = useChatInputEditor({
  props,
  onSubmit: emitSubmitIfValid,
  onUpdateModelValue: (value) => emit("update:modelValue", value),
  onKeydown: (event) => emit("keydown", event),
});

const { editorRef, clearInput, focus, getContent } = editorApi;

const submit = (value?: string) => {
  const content = value ?? getContent();
  emitSubmitIfValid(content);
};

// 单行条件（内容无换行 + 无 head/extra 插槽）
const isSingleLine = computed(
  () =>
    !isMultiline.value &&
    !hasExtraSlot.value &&
    !hasHeadSlot.value
);
const rootClasses = computed(() => ({
  "mc-chat-input--disabled": props.disabled,
  "mc-chat-input--single-line": isSingleLine.value,
}));
const bodyClasses = computed(() => ({
  "mc-chat-input__body--single-line": isSingleLine.value,
  "mc-chat-input__body--no-prefix": !hasPrefixSlot.value,
}));
const showSuffixInline = computed(
  () => hasSuffixSlot.value && !hasExtraSlot.value && !isMultiline.value
);
const showSuffixInFoot = computed(
  () => hasSuffixSlot.value && !showSuffixInline.value
);
const showFoot = computed(() => hasExtraSlot.value || showSuffixInFoot.value);

defineExpose<ChatInputExpose>({
  clearInput,
  focus,
  submit,
});
</script>

<style lang="scss">
@import "./chat-input.scss";
</style>
