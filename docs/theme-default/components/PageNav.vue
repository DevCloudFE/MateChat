<template>
  <div class="page-nav-container">
    <ul>
      <li
        v-for="({ link, title, level }, index) in headers"
        :key="index"
        :title="title"
        :id="`nav-${link}`"
        class="page-nav-link devui-text-ellipsis"
        :style="{ paddingLeft: `${16 + level * 12}px` }"
        @click="() => onClick(link)"
      >
        {{ title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onContentUpdated, useData } from 'vitepress';
import { shallowRef } from 'vue';
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

// 递归扁平化标题结构，将嵌套的children展开成扁平数组
const flattenHeaders = (items, level = 0) => {
  const result = [];
  for (const item of items) {
    result.push({
      ...item,
      level: level, // 保留层级信息用于缩进显示
    });
    if (item.children && item.children.length > 0) {
      result.push(...flattenHeaders(item.children, level + 1));
    }
  }
  return result;
};

onContentUpdated(() => {
  const nestedHeaders = getHeaders(
    frontmatter.value.outline ?? theme.value.outline,
  );
  headers.value = flattenHeaders(nestedHeaders);
});
</script>

<style scoped lang="scss">
@import 'devui-theme/styles-var/devui-var.scss';

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
