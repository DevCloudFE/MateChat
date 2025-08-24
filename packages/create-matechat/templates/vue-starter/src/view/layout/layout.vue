<template>
  <d-layout class="matechat-layout">
    <d-aside :class="['aside-content', GlobalConfig.displayShape]">
      <slot name="header"></slot>
    </d-aside>
    <d-content class="main-content main-content-container" :class="{'sidebar-open': isSidebarOpen && isSmallScreen}">
      <slot name="content"></slot>
    </d-content>
  </d-layout>

    <!-- 侧边栏开关按钮 - 仅在小屏幕且侧边栏关闭时显示 -->
    <button
      v-if="isSmallScreen && !isSidebarOpen && !state.isCameraPage"
      class="sidebar-toggle-btn"
      @click.stop="handleToggleSidebar"
      aria-label="Toggle sidebar"
    >
      <img src="/siderbaropen.svg" alt="Open sidebar" width="24" height="24">
    </button>

    <!-- 侧边栏遮罩层 -->
    <div
      v-if="isSidebarOpen && isSmallScreen"
      class="sidebar-overlay"
      @click="handleToggleSidebar"
    ></div>
  
  <!-- 滑动侧边栏 -->
  <SlideSidebar ref="slideSidebarRef">
  </SlideSidebar>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePageState } from '@/store/pageState';

const { state } = usePageState();
import { useWindowSize } from '@vueuse/core';
import GlobalConfig from '@/global-config';
import SlideSidebar from './slide-sidebar.vue';

// 侧边栏引用
const slideSidebarRef = ref<InstanceType<typeof SlideSidebar> | null>(null);

// 检测窗口大小
const { width } = useWindowSize();
// 仅在小屏幕下显示按钮
const isSmallScreen = computed(() => width.value < 520);

// 侧边栏状态
const isSidebarOpen = computed(() => slideSidebarRef.value?.isOpen || false);

// 切换侧边栏状态
const handleToggleSidebar = () => {
  console.log('按钮点击 - handleToggleSidebar 被调用');
  console.log('slideSidebarRef 是否存在:', !!slideSidebarRef.value);
  console.log('当前 isSmallScreen 值:', isSmallScreen.value);
  console.log('当前 isSidebarOpen 值:', isSidebarOpen.value);
  
  if (slideSidebarRef.value) {
    console.log('侧边栏实例存在，调用对应方法');
    if (isSidebarOpen.value) {
      console.log('调用 closeSidebar()');
      slideSidebarRef.value.closeSidebar();
    } else {
      console.log('调用 openSidebar()');
      slideSidebarRef.value.openSidebar();
    }
  } else {
    console.error('slideSidebarRef 不存在，无法操作侧边栏');
  }
};
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.matechat-layout {
    width: 100%;
    height: 100vh;
    padding: 8px 8px 8px 0;
    overflow: auto;
    box-sizing: border-box;
    background: var(--mc-global-bg);
  }
.main-content {
  position: relative;
  flex: 1;
  display: flex;
  border-radius: 12px;
  overflow: auto;
}

/* 侧边栏按钮样式 */
.sidebar-toggle-btn {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1100;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: var(--devui-base-bg);
 box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 10px;
  cursor: pointer;
 display: flex;
 align-items: center;
 justify-content: center;
}

/*主内容区位移样式 */
.main-content-container {
  transition: transform .3s ease;
}

.main-content-container.sidebar-open {
 transform: translateX(280px);
}

/*遮罩层样式 */
.sidebar-overlay {
 position: fixed;
 top:0;
 left:0;
 right:0;
 bottom:0;
 background-color: rgba(0,0,0,.3);
 z-index: 900;
 backdrop-filter: blur(4px);
}

body[ui-theme="galaxy-theme"] {
  .matechat-layout {
    background-color: $devui-global-bg;
  }
}

@media screen and (max-width: 940px) {
  .matechat-layout {
    padding: 8px;
  }
  .aside-content {
    padding: 0;
  }
}

@media screen and (max-width: 860px) {
  .main-content :deep(.history-list-container) {
    display: none;
  }
}

@media screen and (max-width: 520px) {
  .matechat-layout {
    background: none;
  }
}
</style>
