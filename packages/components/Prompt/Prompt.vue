<template>
  <div class="mc-prompt">
    <McList :data="props.list" :direction="props.direction" :variant="props.variant" :selectable="false">
      <template #item="{ item }">
        <PromptItem :prompt="item" @click="emit('itemClick', item)"></PromptItem>
      </template>
    </McList>
  </div>
</template>

<script setup lang="ts">
import { McList } from '@matechat/core/List';
import PromptItem from './PromptItem.vue';
import { promptProps } from './prompt-types';
const emit = defineEmits(['itemClick']);

const props = defineProps(promptProps);
</script>

<style scoped lang="scss"></style>
