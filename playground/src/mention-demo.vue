<template>
  <div class="container">
    <McInput
      ref="inputRef"
      v-mention="isVisible"
      :trigger="[{ key: '/', onlyInputStart: true }, '@']"
      :onSearchChange="onSearchChange"
      :value="inputValue"
      :maxLength="2000"
      @change="onInputChange"
    >
      <template #mention>
        <McList :data="options" :inputEl="inputRef" enableShortKey @select="onListSelect"></McList>
      </template>
    </McInput>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const inputRef = ref();
const inputValue = ref('');
const isVisible = ref(false);
const options = ref(new Array(6).fill(0).map((item, i) => ({ label: `Option ${i + 1}`, value: i + 1 })));
let triggerIndex: number;
let cursorIndex: number;
let currentTrigger: string;

const onSearchChange = (e) => {
  triggerIndex = e.triggerIndex;
  cursorIndex = e.cursorIndex;
  currentTrigger = e.trigger;
};
const onListSelect = (e) => {
  inputValue.value = inputValue.value.slice(0, triggerIndex) + currentTrigger + e.label + inputValue.value.slice(cursorIndex);
};
const onInputChange = (e) => {
  inputValue.value = e;
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  width: 500px;
  height: 600px;
}
</style>
