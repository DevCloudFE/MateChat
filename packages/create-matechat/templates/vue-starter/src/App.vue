<template>
  <Layout :class="[displayShape]">
    <template #header>
      <NavBar v-if="displayShape === DisplayShape.Immersive" />
    </template>
    <template #content>
      <template v-if="displayShape === DisplayShape.Immersive">
        <HistoryList></HistoryList>
      </template>
      <ChatView />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import GlobalConfig from '@/global-config';
import { DisplayShape, ThemeEnum } from '@/global-config-types';
import { useLang, useTheme } from '@/hooks';
import { useLangStore, useThemeStore } from '@/store';
import { LangType } from '@/types';
import { ChatView } from '@view/chat-view';
import { HistoryList } from '@view/history';
import { Layout } from '@view/layout';
import { NavBar } from '@view/navbar';

const displayShape = GlobalConfig.displayShape;
useLang();
const { initTheme, applyTheme, createCustomThemeFromConfig } = useTheme();
const themeStore = useThemeStore();
const langStore = useLangStore();

init();
function init() {
  if (GlobalConfig.theme) {
    themeStore.theme = ThemeEnum.Custom;
    themeStore.currentCustomTheme = createCustomThemeFromConfig(GlobalConfig.theme)
  }
  initTheme();
  applyTheme();

  if (GlobalConfig.language) {
    langStore.updateCurrentLang(
      GlobalConfig.language === LangType.EN ? LangType.EN : LangType.CN,
    );
  }
}
</script>

<style scoped lang="scss">
.Assistant {
  &.matechat-layout {
    padding: 8px;
  }

  :deep(.navbar-top-container) {
    display: flex;

    .icon-history {
      display: inline-block !important;
    }
  }
}
</style>
