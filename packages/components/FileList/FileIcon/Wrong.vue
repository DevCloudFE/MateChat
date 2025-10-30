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
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 14 14"
    :class="class"
    role="img"
    :aria-hidden="!title"
    fill="none"
  >
    <title v-if="title">{{ title }}</title>
    <!-- 移除了不必要的 <g> 和 <clipPath> -->
    <!-- 背景三角 -->
    <path 
      d="M7.84 0.99L13.88 12.12C14.13 12.57 13.95 13.14 13.49 13.38C13.35 13.46 13.2 13.5 13.04 13.5H0.95C0.42 13.5 0 13.08 0 12.56C0 12.4 0.03 12.25 0.11 12.12L6.15 0.99C6.4 0.53 6.98 0.36 7.44 0.61C7.61 0.69 7.75 0.83 7.84 0.99Z" 
      fill="white"
    />
    <!-- 感叹号的点 -->
    <path 
      d="M7 11.5C6.58 11.5 6.25 11.16 6.25 10.75C6.25 10.33 6.58 10 7 10C7.41 10 7.75 10.33 7.75 10.75C7.75 11.16 7.41 11.5 7 11.5Z" 
      fill="#F23030"
    />
    <!-- 感叹号的竖线 -->
    <rect 
      x="6.5" 
      y="4.5" 
      width="1" 
      height="4.5" 
      rx="0.5" 
      fill="#F23030"
    />
  </svg>
</template>
