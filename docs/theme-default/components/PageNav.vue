<template>
  <div class="page-nav-container">
    <ul>
      <li
        v-for="({ link, title }, index) in headers"
        :key="index"
        :title="title"
        :id="`nav-${link}`"
        class="page-nav-link devui-text-ellipsis"
        @click="() => onClick(link)"
      >
        {{ title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';
import { onContentUpdated, useData } from 'vitepress';
import { getHeaders } from '../composables/outline';

const { frontmatter, theme } = useData();
const headers = shallowRef([]);
let timer: ReturnType<typeof setTimeout> | null = null;

const onClick = (link: string) => {
  const heading = document.getElementById(decodeURIComponent(link));
  heading?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  timer = setTimeout(() => {
    window.location.href = `#${link}`;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }, 1000);
};

onContentUpdated(() => {
  headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline);
});
</script>

<style scoped lang="scss">
@use 'devui-theme/styles-var/devui-var.scss' as *;

.page-nav-link {
  list-style: none;
  width: 100%;
  height: 36px;
  line-height: 36px;
  padding-left: 16px;
  font-size: 12px;
  color: $devui-text;
  border-radius: 100px;
  cursor: pointer;

  &.active {
    color: $devui-list-item-active-text;
    background-color: $devui-list-item-active-bg;
    font-weight: 600;
  }

  &:hover {
    color: $devui-list-item-hover-text;
    background-color: $devui-list-item-hover-bg;
  }
}
</style>
