<template>
  <d-popover :position="['right', 'bottom-end']" trigger="click">
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

const themeList = [
  { name: 'light', cnName: 'theme.lightTheme', value: ThemeEnum.Light },
  { name: 'dark', cnName: 'theme.darkTheme', value: ThemeEnum.Dark },
];
const themeStore = useThemeStore();
const { applyTheme } = useTheme();

applyTheme();
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
