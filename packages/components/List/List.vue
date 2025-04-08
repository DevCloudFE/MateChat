<template>
  <div :class="listClasses" @scroll="onListScroll">
    <template v-for="(item, index) in data" :key="index">
      <slot v-if="variant === ListVariant.None" name="item" :item="item"></slot>
      <div
        v-else
        :class="[
          'mc-list-item',
          {
            'mc-list-item-disabled': item.disabled,
            'mc-list-item-active': item.active,
            'mc-list-item-pre-selection': index === preSelectIndex,
          },
          variant,
        ]"
        @click="() => onItemClick(item)"
      >
        <slot name="item" :item="item">
          {{ item.label }}
        </slot>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { listProps, ListVariant } from './list-types';
import { useList, useListRender } from './use-list';

const props = defineProps(listProps);
const emits = defineEmits(['select', 'loadMore']);

const { listClasses } = useListRender(props);
const { preSelectIndex, onItemClick, onListScroll } = useList(props, emits);
</script>

<style scoped lang="scss">
@import './list.scss';
</style>
