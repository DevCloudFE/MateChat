<template>
  <div class="mc-markdown-render" :class="themeClass">
    <component :is="markdownContent" />
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
import { Fragment, type VNode, computed, h, nextTick, onMounted, ref, useSlots, watch } from 'vue';
import CodeBlock from './CodeBlock.vue';
import { MDCardService } from './MDCardService';
import { type CodeBlockSlot, defaultTypingConfig, mdCardProps } from './mdCard.types';
import { tokensToAst, htmlToVNode, type ASTNode, isValidTagName } from './MDCardParser';

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

const typingIndex = ref(0)
const isTyping = ref(false)

const markdownContent = ref<VNode>();

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
  const ast = tokensToAst(tokens);
  const vnodes = astToVnodes(ast);
  markdownContent.value = h(Fragment, vnodes);
};

const astToVnodes = (nodes: ASTNode[]): VNode[] => {
  return nodes.map(node => processASTNode(node));
}

const processASTNode = (node: ASTNode | Token): VNode => {
  if (node.nodeType === 'html_inline' || node.nodeType === 'html_block') {
    const vNodes = htmlToVNode(node.openNode?.content || '');
    
    if (!vNodes || vNodes.length === 0) {
      return h('span', node.openNode?.content || '');
    }
    
    const processedVNodes = vNodes.map(vNode => {
      if (typeof vNode === 'string') {
        return h('span', vNode);
      }
      
      const children = node.children.map(child => processASTNode(child));
      if (Array.isArray(vNode.children)) {
        vNode.children = [...vNode.children, ...children];
      } else {
        vNode.children = [vNode.children, ...children].filter(n => n);
      }
      return vNode;
    });
    
    return h(Fragment, processedVNodes);
  }

  if (node.nodeType === 'inline') {
    const html = mdt.renderer.render([node.openNode], mdt.options, {});
    const vNodes = htmlToVNode(html);
    return h(Fragment, vNodes);
  }
  
  if (isToken(node)) {
    return processToken(node);
  }
  
  return processASTNodeInternal(node);
}

const isToken = (node: ASTNode | Token): node is Token => {
  return 'type' in node && 'content' in node;
}

const processToken = (token: Token): VNode => {
  if (token.type === 'text') {
    return token.content;
  }
  
  if (token.type === 'inline') {
    return processInlineToken(token);
  }

  if (token.type === 'fence') {
    return processFenceToken(token);
  }

  if (token.type === 'softbreak') {
    return mdt.options.breaks ? h('br') : '\n';
  }

  if (token.type === 'html_block' || token.type === 'html_inline') {
    return token.type === 'html_block' ? h('div', { innerHTML: token.content }) : h('span', { innerHTML: token.content });
  }

  if (token.type === 'math_block' && token.markup === '$$') {
    const html = mdt.renderer.render([token], mdt.options, {});
    const vNode = htmlToVNode(html);
    return h(Fragment, vNode)
  }
  
  // 优先使用token的tag属性
  if (token.tag) {
    const tagName = isValidTagName(token.tag) ? token.tag : 'div'
    const attrs = convertAttrsToProps(token.attrs || []);
    return h(tagName, { ...attrs, key: token.vNodeKey }, token.content);
  }
  
  return token.content;
}

const processInlineToken = (token: Token): VNode => {
  const html = mdt.renderer.render([token], mdt.options, {});
  const vNodes = htmlToVNode(html);
  return h(Fragment, vNodes);
}



const processASTNodeInternal = (node: ASTNode): VNode => {
  let tagName = 'div';
  if (node.openNode?.tag && isValidTagName(node.openNode?.tag)) {
    tagName = node.openNode?.tag
  }
  const attrs = convertAttrsToProps(node.openNode?.attrs || []);

  // 特殊处理fence类型的token
  if (node.openNode?.type === 'fence') {
    return processFenceToken(node.openNode);
  }
  
  // 处理所有带tag的AST节点
  if (node.openNode?.tag) {
    let tagName = isValidTagName(node.openNode?.tag) ? node.openNode?.tag : 'div'
    const children = node.children.map(child => processASTNode(child));
    const attrs = convertAttrsToProps(node.openNode?.attrs || []);
    return h(tagName, { ...attrs, key: node.vNodeKey }, children);
  }
  
  const children = node.children.map(child => processASTNode(child));
  
  return h(tagName, { ...attrs, key: node.vNodeKey}, children);
}

const processFenceToken = (token: Token): VNode => {
  const language = token.info?.replace(/<span\b[^>]*>/i, '').replace('</span>', '') || '';
  const code = token.content;
  return createCodeBlock(language, code, token.tokenIndex);
}

const convertAttrsToProps = (attrs: [string, string][]): Record<string, string> => {
  return attrs.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
}


watch(
  () => [props.enableThink, props.thinkOptions?.customClass, props.theme],
  () => {
    parseContent();
  }
);

const createCodeBlock = (
  language: string,
  code: string,
  blockIndex: number,
) => {
  const codeBlockSlots: CodeBlockSlot = {
    actions: slots.actions
      ? () => slots.actions?.({ codeBlockData: { code, language } }) || null
      : undefined,
    header: slots.header
      ? () => slots.header?.({ codeBlockData: { code, language } }) || null
      : undefined,
    content: slots.content
      ? () => slots.content?.({ codeBlockData: { code, language } }) || null
      : undefined,
  };
  return h(
    CodeBlock,
    {
      language,
      code,
      blockIndex,
      theme: props.theme,
      enableMermaid: props.enableMermaid,
      mermaidConfig: props.mermaidConfig,
      key: `code-block-${blockIndex}`,
    },
    codeBlockSlots,
  );
};

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
});

defineExpose({ mdt });
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";
@import "./markdown.scss";

.mc-markdown-render {
  font-size: var(--devui-font-size, 14px);
  overflow-x: auto;
  position: relative;
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
  line-height: 24px;
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
