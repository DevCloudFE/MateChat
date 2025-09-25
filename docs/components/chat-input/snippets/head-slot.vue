<template>
  <div class="demo-wrapper">
    <McChatInput v-model="value" @submit="handleSubmit">
      <template #head="{ disabled }">
        <div class="demo-head">
          <span class="demo-head-label">正在回复</span>
          <span class="demo-head-target">MateChat 助手</span>
          <button
            class="demo-head-button"
            type="button"
            :disabled="disabled"
            @click="clearReply"
          >
            取消引用
          </button>
        </div>
      </template>
    </McChatInput>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('与助手的对话');

const handleSubmit = (text: string) => {
  console.log('submit', text);
  value.value = '';
};

const clearReply = () => {
  console.log('clear reply');
};
</script>

<style scoped>
.demo-wrapper {
  display: grid;
  gap: 8px;
}

.demo-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  background-color: var(--vp-c-default-soft);
  border-radius: 4px;
  color: var(--vp-c-text-2);
}

.demo-head-label {
  font-weight: 500;
}

.demo-head-target {
  color: var(--vp-c-text-1);
}

.demo-head-button {
  margin-left: auto;
  padding: 2px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background-color: transparent;
  cursor: pointer;
}

.demo-head-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.demo-head-button:not(:disabled):hover {
  background-color: var(--vp-c-default-soft);
}
</style>
