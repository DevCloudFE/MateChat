<template>
  <div class="demo-wrapper">
    <McChatInput
      v-model="value"
      :disabled="isGenerating"
      @submit="handleSubmit"
    >
      <template #extra="{ disabled: slotDisabled, value: inputValue }">
        <div class="demo-extra">
          <span class="demo-extra-metrics">
            {{ charCount }} 字 · 约 {{ tokenCount }} tokens
          </span>
          <button
            class="demo-extra-tip"
            type="button"
            :disabled="slotDisabled"
            @click="applyTip(inputValue)"
          >
            插入快捷提示
          </button>
          <span v-if="isGenerating" class="demo-extra-status">
            正在生成…
          </span>
        </div>
      </template>
      <template #suffix="{ disabled: slotDisabled }">
        <button
          class="demo-submit"
          type="button"
          :disabled="slotDisabled || value.trim().length === 0"
          @click="handleSubmit(value)"
        >
          发送
        </button>
      </template>
    </McChatInput>
  </div>
</template>

<script setup lang="ts">
import { computed, onScopeDispose, ref, watch } from 'vue';

const value = ref('');
const isGenerating = ref(false);
const tips = ['请帮我总结要点', '生成一段示例代码', '润色以下回复'];
const nextTipIndex = ref(0);

const charCount = computed(() => value.value.trim().length);
const tokenCount = computed(() => (charCount.value === 0 ? 0 : Math.max(1, Math.ceil(charCount.value / 4))));

const handleSubmit = (text: string) => {
  if (text.trim().length === 0) {
    return;
  }
  console.log('submit', text);
  value.value = '';
  isGenerating.value = true;
};

const applyTip = (inputValue: string) => {
  if (isGenerating.value) {
    return;
  }
  value.value = inputValue.trim().length > 0 ? `${inputValue}\n${tips[nextTipIndex.value]}` : tips[nextTipIndex.value];
  nextTipIndex.value = (nextTipIndex.value + 1) % tips.length;
};

let resetTimer: ReturnType<typeof setTimeout> | null = null;

watch(isGenerating, (current) => {
  if (resetTimer) {
    clearTimeout(resetTimer);
    resetTimer = null;
  }
  if (current) {
    resetTimer = setTimeout(() => {
      isGenerating.value = false;
      resetTimer = null;
    }, 1500);
  }
});

onScopeDispose(() => {
  if (resetTimer) {
    clearTimeout(resetTimer);
    resetTimer = null;
  }
});
</script>

<style scoped>
.demo-wrapper {
  display: grid;
  gap: 8px;
}

.demo-extra {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.demo-extra-metrics {
  white-space: nowrap;
}

.demo-extra-tip {
  padding: 3px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background-color: transparent;
  color: inherit;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.demo-extra-tip:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.demo-extra-tip:not(:disabled):hover {
  background-color: var(--vp-c-default-soft);
}

.demo-extra-status {
  color: var(--vp-c-brand-1);
}

.demo-submit {
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
</style>
