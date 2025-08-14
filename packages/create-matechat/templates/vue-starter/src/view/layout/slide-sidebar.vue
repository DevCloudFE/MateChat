<template>
  <div
    ref="sidebarRef"
    :class="['slide-sidebar', { 'active': isOpen }]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useWindowSize } from '@vueuse/core';

// 侧边栏引用
const sidebarRef = ref<HTMLDivElement | null>(null);
// 侧边栏开关状态
const isOpen = ref(false);
// 开始触摸位置
const startX = ref(0);
// 是否正在拖动
const isDragging = ref(false);
// 侧边栏宽度
const sidebarWidth = 280;

// 检测窗口大小
const { width } = useWindowSize();
// 仅在小屏幕下显示
const isSmallScreen = computed(() => width.value < 520);

// 打开侧边栏
const openSidebar = () => {
  if (isSmallScreen.value) {
    isOpen.value = true;
  }
};

// 关闭侧边栏
const closeSidebar = () => {
  isOpen.value = false;
};

// 触摸开始事件
const handleTouchStart = (e: TouchEvent) => {
  if (!isSmallScreen.value) return;
  startX.value = e.touches[0].clientX;
  isDragging.value = true;
};

// 触摸移动事件
const handleTouchMove = (e: TouchEvent) => {
  if (!isDragging.value || !isSmallScreen.value) return;
  const currentX = e.touches[0].clientX;
  const diffX = currentX - startX.value;

  // 从左侧边缘滑动，且滑动距离足够大 - 打开侧边栏
  if (startX.value < 50 && diffX > 30) {
    openSidebar();
    isDragging.value = false;
  }
  // 从右侧向左侧滑动，且滑动距离足够大 - 关闭侧边栏
  else if (isOpen.value && diffX < -30) {
    closeSidebar();
    isDragging.value = false;
  }
};

// 触摸结束事件
const handleTouchEnd = () => {
  isDragging.value = false;
};

// 点击空白区域关闭
const handleClickOutside = (e: MouseEvent) => {
  if (
    isOpen.value &&
    sidebarRef.value &&
    !sidebarRef.value.contains(e.target as Node)
  ) {
    closeSidebar();
  }
};

// 挂载时添加事件监听
onMounted(() => {
  document.addEventListener('touchstart', handleTouchStart);
  document.addEventListener('touchmove', handleTouchMove);
  document.addEventListener('touchend', handleTouchEnd);
  document.addEventListener('click', handleClickOutside);
});

// 卸载时移除事件监听
onUnmounted(() => {
  document.removeEventListener('touchstart', handleTouchStart);
  document.removeEventListener('touchmove', handleTouchMove);
  document.removeEventListener('touchend', handleTouchEnd);
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped lang="scss">
.slide-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 280px;
  background-color: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 1000;
  padding: 16px;
  box-sizing: border-box;
  overflow: auto;
}

.slide-sidebar.active {
  transform: translateX(0);
}

// 遮罩层
.slide-sidebar.active::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: -1;
}

@media screen and (min-width: 521px) {
  .slide-sidebar {
    display: none;
  }
}
</style>