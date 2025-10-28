<template>
  <div
    ref="sidebarRef"
    :class="['slide-sidebar', { 'active': isOpen }]"
    @click.stop
  >
    <!-- 侧边栏顶部导航 -->
    <div class="sidebar-header">
      <McHeader
        :logoImg="GlobalConfig.logoPath || Logo"
        :title="GlobalConfig.title || 'MateChat'"
      ></McHeader>
    </div>
    
    <!-- 侧边栏中间内容 -->
    <div class="sidebar-content">
      <HistoryList />
      <slot></slot>
    </div>
    
    <!-- 侧边栏底部导航 -->
    <div class="sidebar-footer">
      <div class="navbar-right">
        <SwitchLang v-if="!GlobalConfig.language" />
        <Theme v-if="!GlobalConfig.theme" />
        <d-popover :position="['bottom-end']" trigger="hover">
          <template #content>
            <span class="devui-text">{{ $t("navbar.systemSetting") }}</span>
          </template>
          <div class="switch-lang-container">
            <i class="icon-setting system-setting" />
          </div>
        </d-popover>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useWindowSize } from '@vueuse/core';
import GlobalConfig from "@/global-config";
import { SwitchLang } from "@/view/navbar";
import { Theme } from "@/view/theme";
import { HistoryList } from "@/view/history";
import Logo from "../../../public/logo.svg";

// 侧边栏引用
const sidebarRef = ref<HTMLDivElement | null>(null);
// 侧边栏开关状态
const isOpen = ref(false);
// 开始触摸位置
const startX = ref(0);
// 是否正在拖动
const isDragging = ref(false);

// 检测窗口大小
const { width } = useWindowSize();
// 仅在小屏幕下显示
const isSmallScreen = computed(() => width.value < 520);

// 打开侧边栏
const openSidebar = () => {
  isOpen.value = true;
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
// 暴露组件属性和方法
defineExpose({
  isOpen,
  openSidebar,
  closeSidebar
});

</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.slide-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 280px;
  background-color: var(--devui-base-bg);
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 950;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* 侧边栏顶部 */
.sidebar-header {
  padding: 16px;
  border-bottom: 1px solid #eee;
}

/* 侧边栏内容区 */
.sidebar-content {
  flex: 1;
  padding: 0;
  overflow: auto;
}

/* 侧边栏底部 */
.sidebar-footer {
  padding: 16px;
  border-top: 1px solid #eee;
  margin-top: auto;
  
  .navbar-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  :deep(.switch-lang-container) {
    width: 28px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    margin: 0 4px;
    color: $devui-text;
    border-radius: $devui-border-radius-card;
    cursor: pointer;

    &:hover {
      background-color: var(--mc-icon-hover-bg);
    }

    i {
      font-size: 16px;
    }
  }
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
  z-index: -1;
}

/* 浅色主题适配 - 与对话区域保持一致 */
body[ui-theme-type="light"] {
  .slide-sidebar {
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
  }
}

/* 深色主题适配 - 与对话区域保持一致 */
body[ui-theme-type="dark"],
body[ui-theme="galaxy-theme"] {
  .slide-sidebar {
    background-color: $devui-global-bg;
    backdrop-filter: blur(10px);
  }
  
  .sidebar-header,
  .sidebar-footer {
    border-color: $devui-line;
  }
  
  :deep(.devui-text) {
    color: $devui-text;
  }
}

@media screen and (min-width: 521px) {
  .slide-sidebar {
    display: none;
  }
}

/* 响应式调整 */
@media screen and (max-width: 520px) {
  :deep(.navbar-top-history) {
    width: 250px;
    border-right: none;
  }
  
  /* 确保在侧边栏中的历史记录组件始终可见 */
  .sidebar-content :deep(.history-list-container) {
    width: 100% !important;
    min-width: 100% !important;
    opacity: 1 !important;
    padding: 0 !important;
  }
}

/* 统一历史记录组件与侧边栏的颜色样式 */
.sidebar-content {
  /* 修改1: 确保内容区域继承侧边栏背景色 */
  background-color: inherit;
}

/* 浅色主题下历史记录组件样式统一 */
body[ui-theme-type="light"] {
  .sidebar-content :deep(.history-list-container) {
    background-color: rgba(255, 255, 255, 0.95) !important;
    color: $devui-text !important;
  }
  
  .sidebar-content :deep(.history-item) {
    background-color: transparent !important;
    border-bottom-color: rgba(0, 0, 0, 0.05) !important;
  }
  
  .sidebar-content :deep(.history-item:hover) {
    background-color: rgba(0, 0, 0, 0.02) !important;
  }
}

/* 深色主题下历史记录组件样式统一 */
body[ui-theme-type="dark"],
body[ui-theme="galaxy-theme"] {
  .sidebar-content :deep(.history-list-container) {
    background-color: $devui-global-bg !important;
    color: $devui-text !important;
  }
  
  .sidebar-content :deep(.history-item) {
    background-color: transparent !important;
    border-bottom-color: $devui-line !important;
  }
  
  .sidebar-content :deep(.history-item:hover) {
    background-color: rgba(255, 255, 255, 0.05) !important;
  }
}
</style>

<style lang="scss">
@import "devui-theme/styles-var/devui-var.scss";
</style>