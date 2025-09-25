<template>
  <div class="demo-wrapper">
    <McChatInput
      ref="chatInputRef"
      v-model="value"
      :disabled="isBusy"
      @submit="handleSubmit"
    >
      <template #suffix="{ disabled: slotDisabled, value: inputValue }">
        <button
          class="demo-submit"
          type="button"
          :disabled="slotDisabled || inputValue.trim().length === 0"
          @click="handleSuffixSubmit(inputValue)"
        >
          <SendIcon class="demo-submit-icon" />
          <span>发送</span>
        </button>
      </template>
    </McChatInput>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import SendIcon from '@matechat/core/Input/components/SendIcon.vue';

const value = ref('');
const isBusy = ref(false);

type ChatInputInstance = ComponentPublicInstance & {
  submit: (value?: string) => void;
};

const chatInputRef = ref<ChatInputInstance | null>(null);

const handleSubmit = (text: string) => {
  console.log('submit', text);
  value.value = '';
};

const handleSuffixSubmit = (inputValue: string) => {
  if (!chatInputRef.value || inputValue.trim().length === 0 || isBusy.value) {
    return;
  }
  chatInputRef.value.submit(inputValue);
};

</script>

<style scoped>
.demo-wrapper {
  display: grid;
  gap: 8px;
}

.demo-submit {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border: none;
  border-radius: 999px;
  background-color: var(--vp-c-brand-1);
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: filter 0.2s ease;
}

.demo-submit:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.demo-submit:not(:disabled):hover {
  filter: brightness(1.1);
}

.demo-submit-icon {
  display: inline-flex;
}

.demo-submit-icon :deep(path) {
  fill: currentColor;
}
</style>
