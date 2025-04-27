<template>
  <Layout>
    <template #header>
      <NavBar />
    </template>
    <template #content>
      <History />
      <ChatView />
    </template> 
  </Layout>
</template>

<script setup lang="ts">
import { useLang, useTheme } from '@/hooks';
import ChatView from '@view/chat-view.vue';
import { History } from '@view/history';
import { Layout } from '@view/layout';
import { NavBar } from '@view/navbar';

useLang();
useTheme();
</script>

<style scoped lang="scss"></style>
