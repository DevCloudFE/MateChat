<template>
  <d-popover :position="['right']" trigger="click">
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
            {{ item.cnName }}
          </d-radio>
        </div>
      </div>
    </template>
    <i class="icon-theme system-setting"></i>
  </d-popover>
</template>

<script setup lang='ts'>
import { useTheme } from '@/hooks';
import { useThemeStore } from '@/store';

const themeList = [
  { name: 'light', cnName: '浅色模式', value: 'light' },
  { name: 'dark', cnName: '深色模式', value: 'dark' },
];
const themeStore = useThemeStore();
const { applyTheme } = useTheme();

const handleChange = (_val: string) => {
  applyTheme();
};
</script>

<style lang='scss' scoped>
.matechat-theme-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  box-sizing: border-box;

  .title {
    color: var(--devui-text, #252b3a);
    font-weight: 600;
    padding-bottom: 4px;
    margin: 8px 0 4px;
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
