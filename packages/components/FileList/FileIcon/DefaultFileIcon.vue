<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: number | string;
    title?: string;
    class?: string;
  }>(),
  {
    size: 16,
  },
);
</script>

<template>
  <svg 
    :width="props.size" 
    :height="props.size" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    :aria-label="props.title"
    :class="props.class"
  >
    <path 
      d="M9 2L15 2L20 7L20 17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17L4 4C4 2.89543 4.89543 2 6 2L9 2Z" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    />
    <path 
      d="M15 2L15 7L20 7" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    />
  </svg>
</template>