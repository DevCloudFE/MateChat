<template>
  <div class="mc-markdown-render" :class="themeClass">
      <component :is="markdownComponent" />
  </div>
  <div v-if="false">
      <slot name="actions"></slot>
      <slot name="header"></slot>
      <slot name="content"></slot>
  </div>
</template>

<script setup lang="ts">
import hljs from 'highlight.js';
import markdownit from 'markdown-it';
import type { MarkdownIt, Token } from 'markdown-it';
import { type VNode, computed, h, onMounted, useSlots, watch } from 'vue';
import CodeBlock from './CodeBlock.vue';
import { MDCardService } from './MDCardService';
import { type CodeBlockSlot, mdCardProps } from './mdCard.types';

type MarkdownComponentType = {
  name: string;
  render: () => VNode;
};

const mdCardService = new MDCardService();

const props = defineProps(mdCardProps);

const emit = defineEmits(['afterMdtInit']);

const slots = useSlots();

const mdt: MarkdownIt = markdownit({
  breaks: true,
  linkify: true,
  html: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (_) {}
    }
    return '';
  },
  ...props.mdOptions,
});

mdt.renderer.rules.fence = (tokens: Token[], idx: number) => {
  return `<!----MC_MARKDOWN_CODE_BLOCK_${idx}---->`;
};

const createCodeBlock = (
  language: string,
  code: string,
  blockIndex: number,
) => {
  const codeBlockSlots: CodeBlockSlot = {
    actions: () =>
      slots.actions?.({
        codeBlockData: {
          code,
          language,
        },
      }),
  };
  if (slots.header) {
    codeBlockSlots.header = () =>
      slots.header?.({
        codeBlockData: {
          code,
          language,
        },
      });
  }
  if (slots.content) {
    codeBlockSlots.content = () =>
      slots.content?.({
        codeBlockData: {
          code,
          language,
        },
      });
  }
  return h(
    CodeBlock,
    {
      language,
      code,
      blockIndex,
      theme: props.theme,
    },
    codeBlockSlots,
  );
};

const markdownComponent = computed<MarkdownComponentType>(() => {
  let content = props.content || '';

  if (props.enableThink) {
    const thinkClass = props.thinkOptions?.customClass || 'mc-think-block';
    content =
      props.content
        ?.replace('<think>', `<div class="${thinkClass}">`)
        .replace('</think>', '</div>') || '';
  }

  const tokens = mdt.parse(content, {});
  const html = mdt.render(content);

  return {
    name: 'MarkdownRenderer',
    render() {
      if (typeof document === 'undefined') {
        return;
      }
      const container = document.createElement('div');
      container.innerHTML = html;

      const vNodes = [];
      let lastIndex = 0;
      let match: RegExpExecArray | null;
      const regex = /<!----MC_MARKDOWN_CODE_BLOCK_(\d+)---->/g;
      let codeBlockIndex = 0;

      while (true) {
        match = regex.exec(html);
        if (!match) break;
        if (match.index > lastIndex) {
          vNodes.push(
            h('div', {
              innerHTML: html.slice(lastIndex, match.index),
            }),
          );
        }
        const token = tokens[Number.parseInt(match[1])];
        const lang = token.info || '';
        const code = token.content;

        vNodes.push(createCodeBlock(lang, code, codeBlockIndex));
        codeBlockIndex++;
        lastIndex = regex.lastIndex;
      }

      if (lastIndex < html.length) {
        vNodes.push(
          h('div', {
            innerHTML: html.slice(lastIndex),
          }),
        );
      }

      return h('div', vNodes);
    },
  };
});

watch(
  () => props.customXssRules,
  (rules) => {
    mdCardService.setCustomXssRules(rules);
  },
);

watch(
  () => props.mdPlugins,
  (plugins) => {
    mdCardService.setMdPlugins(plugins, mdt);
  },
  {
    immediate: true,
  },
);

const themeClass = computed(() => {
  return props.theme === 'dark'
    ? 'mc-markdown-render-dark'
    : 'mc-markdown-render-light';
});

onMounted(() => {
  emit('afterMdtInit', mdt);
});

defineExpose({
  mdt,
});
</script>

<style scoped lang="scss">
@import 'devui-theme/styles-var/devui-var.scss';

.mc-markdown-render {
overflow-x: auto;
&.mc-markdown-render-dark {
  color: #CED1DB;
}
&.mc-markdown-render-light {
  color: #252b3a;
}
}

:deep(.mc-think-block) {
  color: $devui-aide-text;
  border-left: 1px solid $devui-line;
  padding-left: 8px;
  margin-bottom: 1rem;
}
</style>