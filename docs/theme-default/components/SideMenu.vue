<template>
  <div class="side-menu-container devui-scroll-overlay devui-scrollbar">
    <template v-for="(item, index) in sidebarList" :key="index">
      <a
        v-if="!item.items"
        :href="item.link"
        :title="item.text"
        :class="['menu-item full-radios devui-text-ellipsis', { 'menu-item-active': isActive(item.link) }]"
      >
        {{ item.text }}
      </a>
      <Collapse class="menu-list" v-else v-model="item.expand" :title="item.text">
        <div>
          <a
            v-for="(menu, idx) in item.items"
            :key="`${index}+${idx}`"
            :href="menu.link"
            :title="menu.text"
            :class="['menu-item devui-text-ellipsis', { 'menu-item-active': isActive(menu.link) }]"
          >
            {{ menu.text }}
          </a>
        </div>
      </Collapse>
    </template>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, onMounted } from 'vue';
import { useData } from 'vitepress';
import { useSidebar } from '../composables/sidebar';
import Collapse from './Collapse.vue';

interface SidebarItem {
  text: string;
  link: string;
  expand?: boolean;
  items?: SidebarItem[];
}

const { page } = useData();
const { sidebarGroups } = useSidebar();
const relativePath = ref('');
const sidebarList = ref<SidebarItem[]>([]);

const isActive = (link: string) => {
  let currentPath = relativePath.value.replace('.md', '').replace('.html', '');
  let currentLink = link.replace('/demo', '').replace('/api', '');
  if (currentLink.startsWith('/')) {
    currentLink = currentLink.substring(1);
  }
  return currentPath.includes(currentLink);
};
const initSidebarList = () => {
  sidebarList.value = sidebarGroups.value.map((item) => {
    if (!item.text && item.items.length === 1) {
      return item.items[0];
    } else {
      item.expand = true;
      return item;
    }
  });
};

watch(
  page,
  () => {
    relativePath.value = page.value.relativePath;
    initSidebarList();
  },
  { immediate: true },
);
</script>

<style scoped lang="scss">
@import 'devui-theme/styles-var/devui-var.scss';

.side-menu-container {
  border-right: 1px solid $devui-dividing-line;
  width: 302px;
  height: 100vh;
  position: fixed;
  z-index: 10;
  top: 48px;
  background: $devui-base-bg;
  padding: 16px 8px;

  :deep(.collapse-container):not(:first-child) {
    margin-top: 8px;
  }
}


.menu-item {
  display: block;
  width: 100%;
  height: 40px;
  padding: 0 12px;
  margin-top: 8px;
  line-height: 40px;
  color: $devui-text-weak;
  border-radius: $devui-border-radius;
  font-size: $devui-font-size;
  font-weight: 400;
  box-sizing: border-box;
  transition:
    font-weight $devui-animation-duration-fast $devui-animation-ease-in-out-smooth,
    background-color $devui-animation-duration-fast $devui-animation-ease-in-out-smooth;
  cursor: pointer;

  &.full-radios {
    border-radius: $devui-border-radius-full	;
  }

  &.menu-item-active {
    color: $devui-list-item-active-text;
    background-color: $devui-list-item-active-bg;
    font-weight: 700;
  }

  &:hover {
    color: $devui-list-item-hover-text;
    background-color: $devui-list-item-hover-bg;
  }
}

.menu-list {
  .menu-item {
    padding-left: 22px;
  }
}
</style>
