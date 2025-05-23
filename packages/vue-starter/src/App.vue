<template>
  <Layout :class="[displayShape]">
    <template #header>
      <NavBar v-if="displayShape === DisplayShape.Immersive" />
    </template>
    <template #content>
      <template v-if="displayShape === DisplayShape.Immersive">
        <HistoryContainer>
          <HistoryList></HistoryList>
        </HistoryContainer>
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
import { HistoryContainer, HistoryList } from '@view/history';
import { Layout } from '@view/layout';
import { NavBar } from '@view/navbar';

const displayShape = GlobalConfig.displayShape;
useLang();
const { applyTheme } = useTheme();
const themeStore = useThemeStore();
const langStore = useLangStore();

init();
function init() {
  if (GlobalConfig.theme) {
    themeStore.theme =
      GlobalConfig.theme === ThemeEnum.Dark ? ThemeEnum.Dark : ThemeEnum.Light;
  }
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
