<template>
  <div ref="container" class="mc-markdown-render" :class="themeClass" v-html="parsedContent.html"></div>
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
import { type VNode, computed, h, nextTick, onMounted, ref, useSlots, watch } from 'vue';
import { createApp } from 'vue';
import CodeBlock from './CodeBlock.vue';
import { MDCardService } from './MDCardService';
import { type CodeBlockSlot, defaultTypingConfig, mdCardProps } from './mdCard.types';

const mdCardService = new MDCardService();
const props = defineProps(mdCardProps);
const emit = defineEmits(['afterMdtInit', 'typingStart', 'typing', 'typingEnd']);
const slots = useSlots();
let timer: ReturnType<typeof setTimeout> | null = null

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

// 用注释作为占位符
mdt.renderer.rules.fence = (tokens: Token[], idx: number) => {
  return `<!--MC_MARKDOWN_CODE_BLOCK_${idx}-->`;
};

const parsedContent = ref<{ tokens: Token[]; html: string }>({
  tokens: [],
  html: '',
});

const typingIndex = ref(0)
const isTyping = ref(false)

const parseContent = () => {
  let content = props.content || '';
  if (props.typing && isTyping.value) {
    content = props.content.slice(0, typingIndex.value) || '';
    const options = {...defaultTypingConfig, ...props?.typingOptions};

    if (options.style === 'cursor') {
      content += `<span class="mc-typewriter mc-typewriter-cursor">|</span>`;
    } else if (options.style === 'color' || options.style === 'gradient') {
      content = content.slice(0, -5) + `<span class="mc-typewriter mc-typewriter-${options.style}">${content.slice(-5)}</span>`;
    }
  }

  if (props.enableThink) {
    const thinkClass = props.thinkOptions?.customClass || 'mc-think-block';
    content = content
        ?.replace('<think>', `<div class="${thinkClass}">`)
        .replace('</think>', '</div>') || '';
  }
  const tokens = mdt.parse(content, {});
  const html = mdt.render(content);
  parsedContent.value = { tokens, html };
};

watch(
  () => [props.enableThink, props.thinkOptions?.customClass],
  () => {
    parseContent();
  }
);

const container = ref<HTMLElement | null>(null);

// 动态替换占位符为 CodeBlock 组件
const replacePlaceholders = () => {
  if (!container.value) return;
  // 清理旧的 code block app（防止内存泄漏）
  if ((container.value as any)._codeBlockApps) {
    (container.value as any)._codeBlockApps.forEach((app: any) => app.unmount());
  }
  (container.value as any)._codeBlockApps = [];

  // 先收集所有注释节点，避免替换时影响遍历
  const commentNodes: Comment[] = [];
  const walker = document.createTreeWalker(
    container.value,
    NodeFilter.SHOW_COMMENT,
    {
      acceptNode: (node) => node.nodeValue?.startsWith('MC_MARKDOWN_CODE_BLOCK_') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    }
  );
  let node: Comment | null = walker.nextNode() as Comment | null;
  while (node) {
    commentNodes.push(node);
    node = walker.nextNode() as Comment | null;
  }

  // 依次替换所有占位符
  commentNodes.forEach((node) => {
    const idx = Number(node.nodeValue?.replace('MC_MARKDOWN_CODE_BLOCK_', ''));
    const token = parsedContent.value.tokens[idx];
    const lang = token?.info?.replace(/<span\b[^>]*>/i, '').replace('</span>', '') || '';
    const code = token.content;
    // 创建代码块组件
    const codeBlockEl = document.createElement('div');
    // 处理 slot 传递
    const codeBlockSlots: CodeBlockSlot = {
      actions: slots.actions && typeof slots.actions === 'function'
        ? () => (slots.actions ? slots.actions({ codeBlockData: { code, language: lang } }) : null)
        : undefined,
      header: slots.header && typeof slots.header === 'function'
        ? () => (slots.header ? slots.header({ codeBlockData: { code, language: lang } }) : null)
        : undefined,
      content: slots.content && typeof slots.content === 'function'
        ? () => (slots.content ? slots.content({ codeBlockData: { code, language: lang } }) : null)
        : undefined,
    };
    node.parentNode?.replaceChild(codeBlockEl, node);
    // 动态挂载 CodeBlock
    const app = createApp(CodeBlock, {
      language: lang,
      code,
      blockIndex: idx,
      theme: props.theme,
      enableMermaid: props.enableMermaid,
      mermaidConfig: props.mermaidConfig,
      // 事件透传
      onAfterMdtInit: (e: any) => emit('afterMdtInit', e),
      onTypingStart: () => emit('typingStart'),
      onTyping: () => emit('typing'),
      onTypingEnd: () => emit('typingEnd'),
    });
    if (codeBlockSlots.actions) app.component('actions', codeBlockSlots.actions);
    if (codeBlockSlots.header) app.component('header', codeBlockSlots.header);
    if (codeBlockSlots.content) app.component('content', codeBlockSlots.content);
    app.mount(codeBlockEl);
    (container.value as any)._codeBlockApps.push(app);
  });
};

watch(
  () => props.content,
  (newVal, oldVal) => {
    if (!props.typing) {
      typingIndex.value = newVal?.length || 0;
      parseContent();
      return
    }

    if (newVal.indexOf(oldVal) === -1) {
      typingIndex.value = 0;
    }

    nextTick(() => typewriterStart())
  },
  { immediate: true },
)

const typewriterEnd = () => {
  isTyping.value = false;
  emit('typingEnd');
}

const typewriterStart = () => {
  clearTimeout(timer!)

  isTyping.value = true;
  emit('typingStart');
  const options = {...defaultTypingConfig, ...props?.typingOptions};

  const typingStep = () => {
    let step = options.step;
    if (Array.isArray(options.step)) {
      step = options.step[0] + Math.floor(Math.random() * (options.step[1] - options.step[0]));
    }
    typingIndex.value += step;
    parseContent();
    emit('typing');

    if (typingIndex.value >= props.content!.length) {
      typewriterEnd();
      parseContent();
      return;
    }

    timer = setTimeout(typingStep, options.interval);
  }

  timer = setTimeout(typingStep);
}

watch(
  () => props.customXssRules,
  (rules) => {
    mdCardService.setCustomXssRules(rules);
    parseContent();
  },
  { deep: false },
);

watch(
  () => props.mdPlugins,
  (plugins) => {
    mdCardService.setMdPlugins(plugins, mdt);
    parseContent();
  },
  { immediate: true, deep: false },
);

const themeClass = computed(() => {
  return props.theme === 'dark'
    ? 'mc-markdown-render-dark'
    : 'mc-markdown-render-light';
});

onMounted(() => {
  emit('afterMdtInit', mdt);
  nextTick(() => replacePlaceholders());
});

watch(
  () => parsedContent.value.html,
  () => {
    nextTick(() => replacePlaceholders());
  }
);

defineExpose({ mdt });
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";
@import "./markdown.scss";

.mc-markdown-render {
  font-size: var(--devui-font-size, 14px);
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

:deep(.mc-typewriter-color) {
  background-image: -webkit-linear-gradient(left, #191919, #5588f0, #e171ee, #f2c55c);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

:deep(.mc-typewriter-gradient) {
  background: linear-gradient(to right, $devui-text, $devui-base-bg);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

:deep(.mc-typewriter-cursor) {
  font-weight: 900;
  animation: typewriter 800ms linear 0s infinite;
}

@keyframes typewriter {
  0% {
    opacity: 1;
  }
  50% {
      opacity: 0;
  }
  100% {
      opacity: 1;
  }
}

</style>
