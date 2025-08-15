<template>
  <d-popover :position="popPosition" trigger="click">
    <template #content>
      <div class="matechat-theme-content">
        <div class="title">{{ $t('theme.themeTitle') }}</div>
        <div class="theme-list">
          <d-radio
            v-for='item in themeList'
            v-model='themeStore.theme'
            :key='item.name'
            :value='item.value'
            class="mb-2"
            @change='handleChange'
          >
            {{ t(item.cnName) }}

          </d-radio>
        </div>
      </div>
    </template>
    <div class="switch-lang-container">
      <i class="icon-theme system-setting" />
    </div>
  </d-popover>
</template>

<script setup lang='ts'>
import { ThemeEnum } from '@/global-config-types';
import { useTheme } from '@/hooks';
import { useThemeStore } from '@/store';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
import { ref, computed, onMounted, onUnmounted } from 'vue';

const themeList = [
  { name: 'light', cnName: 'theme.lightTheme', value: ThemeEnum.Light },
  { name: 'dark', cnName: 'theme.darkTheme', value: ThemeEnum.Dark },
];
const themeStore = useThemeStore();
const { applyTheme } = useTheme();

// 检测窗口宽度，用于响应式调整弹窗位置
const windowWidth = ref(window.innerWidth);

// 根据窗口宽度决定弹窗位置
const popPosition = computed(() => {
  // 在520px以下的屏幕向上弹出
  if (windowWidth.value < 520) {
    return ['right', 'top-end'];
  }
  // 在大屏幕上保持向下弹出
  return ['right', 'bottom-end'];
});

// 窗口大小变化时更新宽度
const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  applyTheme();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

const handleChange = (_val: string) => {
  applyTheme();
};
</script>

<style lang='scss' scoped>
.matechat-theme-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px 0;
  box-sizing: border-box;

  .title {
    color: var(--devui-text, #252b3a);
    font-weight: 600;
    padding-bottom: 4px;
    line-height: 1.5;
    border-bottom: 1px dashed var(--devui-line, #adb0b8);
  }

  .theme-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
