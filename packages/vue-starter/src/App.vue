<template>
  <Layout :class="[displayShape]">
    <template #header>
      <NavBar v-if="displayShape === DisplayShape.Immersive" />
    </template>
    <template #content>
      <History v-if="displayShape === DisplayShape.Immersive" />
      <ChatView />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { useLang, useTheme } from "@/hooks";
import { ChatView } from "@view/chat-view";
import { History } from "@view/history";
import { Layout } from "@view/layout";
import { NavBar } from "@view/navbar";
import GlobalConfig from "@/global-config";
import { DisplayShape } from "@/global-config-types";

const displayShape = GlobalConfig.displayShape;
useLang();
useTheme();
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
