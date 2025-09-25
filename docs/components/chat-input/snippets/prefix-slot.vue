<template>
  <div class="demo-wrapper">
    <McChatInput v-model="value" :disabled="isDisabled">
      <template #prefix="{ disabled }">
        <div class="demo-prefix">
          <button
            class="demo-prefix-button"
            type="button"
            :disabled="disabled"
            @click="handleAction('attachment')"
          >
            附件
          </button>
          <button
            class="demo-prefix-button"
            type="button"
            :disabled="disabled"
            @click="handleAction('voice')"
          >
            语音
          </button>
          <button
            class="demo-prefix-button"
            type="button"
            :disabled="disabled"
            @click="handleAction('emoji')"
          >
            表情
          </button>
        </div>
      </template>
    </McChatInput>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('');
const isDisabled = ref(false);

const handleAction = (type: 'attachment' | 'voice' | 'emoji') => {
  console.log(`click ${type}`);
};
</script>

<style scoped>
.demo-wrapper {
  display: grid;
  gap: 8px;
}

.demo-prefix {
  display: flex;
  align-items: center;
  gap: 4px;
}

.demo-prefix-button {
  padding: 4px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background-color: transparent;
  font-size: 12px;
  cursor: pointer;
}

.demo-prefix-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.demo-prefix-button:not(:disabled):hover {
  background-color: var(--vp-c-default-soft);
}
</style>
