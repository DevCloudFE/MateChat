<template>
  <div ref="markdownCardRef" class="mc-markdown-render" v-html="markedHtml"></div>
</template>

<script setup lang="ts">
import markdownit from 'markdown-it';
import hljs from 'highlight.js';
import { computed } from 'vue';

const props = defineProps({
  content: {
    type: String,
    default: '',
  },
});

const mdt = markdownit({
  breaks: true,
  linkify: true,
  html: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (_) {}
    }
    return ''; // use external default escaping
  },
});
const markedHtml = computed(() => {
  return mdt.render(props.content);
});
</script>

<style lang="scss" scoped>
.mc-markdown-render {
  overflow-x: auto;

  :deep(p) {
    margin: 0 !important;
  }
}
</style>
