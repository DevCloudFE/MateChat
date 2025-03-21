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
import markdownit from 'markdown-it';
import hljs from 'highlight.js';
import { computed,h, useSlots, type VNode, watch, onMounted } from 'vue';
import CodeBlock from './CodeBlock.vue';
import { mdCardProps } from './mdCard.types';
import { MDCardService } from './MDCardService';

type MarkdownComponentType = {
name: string;
render: () => VNode;
};

const mdCardService = new MDCardService();

const props = defineProps(mdCardProps);

const emit = defineEmits(['afterMdtInit']);

const slots = useSlots();

const mdt = markdownit({
  breaks: true,
  linkify: true,
  html: true,
  highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
          try {
              return hljs.highlight(str, { language: lang }).value;
          } catch (_) { }
      }
      return '';
  },
  ...props.mdOptions
}) as any;

mdt.renderer.rules.fence = (tokens: any, idx: number) => {
return `<!----MC_MARKDOWN_CODE_BLOCK_${idx}---->`;
};

const createCodeBlock = (language: string, code: string, blockIndex: number) => {
const codeBlockSlots: any = {
  actions: () => slots.actions?.({
    codeBlockData: {
      code,
      language
    }
  })
};
if (slots.header) {
  codeBlockSlots.header = () => slots.header?.({
    codeBlockData: {
      code,
      language
    }
  });
}
if (slots.content) {
  codeBlockSlots.content = () => slots.content?.({
    codeBlockData: {
      code,
      language
    }
  });
}
return h(CodeBlock, {
  language,
  code,
  blockIndex,
  theme: props.theme
}, codeBlockSlots);
};

const markdownComponent = computed<MarkdownComponentType>(() => {
const tokens = mdt.parse(props.content, {});
const html = mdt.render(props.content);


return {
  name: 'MarkdownRenderer',
  render() {
    const container = document.createElement('div');
    container.innerHTML = html;
    
    
    const vNodes = [];
    let lastIndex = 0;
    let match;
    const regex = /<!----MC_MARKDOWN_CODE_BLOCK_(\d+)---->/g;
    let codeBlockIndex = 0;
    
    while ((match = regex.exec(html)) !== null) {
      
      if (match.index > lastIndex) {
        vNodes.push(h(
              'div', {
              innerHTML: html.slice(lastIndex, match.index)
          }
        ));
      }
      const token = tokens[parseInt(match[1])];
      const lang = token.info || '';
      const code = token.content;
      
      vNodes.push(createCodeBlock(lang, code, codeBlockIndex));
      codeBlockIndex++;
      lastIndex = regex.lastIndex;
    }
    
    
    if (lastIndex < html.length) {
      vNodes.push(h('div', {
        innerHTML: html.slice(lastIndex)
      }));
    }
    
    return h('div', vNodes);
  }
};
});

watch(() => props.customXssRules, (rules) => {
mdCardService.setCustomXssRules(rules);
});

watch(() => props.mdPlugins, (plugins) => {
  mdCardService.setMdPlugins(plugins, mdt);
},{
  immediate: true,
});

const themeClass = computed(() => {
return props.theme === 'dark' ? 'mc-markdown-render-dark' : 'mc-markdown-render-light';
});

onMounted(() => {
  emit('afterMdtInit', mdt)
})

defineExpose({
mdt
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
</style>