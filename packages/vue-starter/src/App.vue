<template>
  <ChatView />
</template>

<script setup lang="ts">
import ChatView from "@view/chat-view.vue";
import { useTheme } from "@/hooks";

useTheme();
</script>

<style scoped></style>
