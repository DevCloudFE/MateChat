<template>
  <div class="mc-code-block" :class="themeClass" ref="rootRef">
    <div class="mc-code-block-header" v-if="!$slots.header">
      <span class="mc-code-lang">{{ language }}</span>
      <slot name="actions">
        <div class="mc-code-block-actions">
          <div v-if="isMermaid" style="margin-right: 8px">
            <ul class="mc-diagram-switch" :class="{ 'mc-show-code': !showMermaidDiagram }">
              <li @click="showMermaidDiagram = true" :class="{ 'mc-diagram-switch-active': showMermaidDiagram }">{{ t('Md.diagram') }}</li>
              <li @click="showMermaidDiagram = false" :class="{ 'mc-diagram-switch-active': !showMermaidDiagram }">{{ t('Md.code') }}</li>
            </ul>
          </div>
          <div
            v-if="isMermaid && showMermaidDiagram"
            class="mc-action-btn mc-toggle-btn"
            :title="t('Md.zoomIn')"
            @click="zoomIn"
          >
            <img src="./asset/enlarge.svg" />
          </div>
          <div
            v-if="isMermaid && showMermaidDiagram"
            class="mc-action-btn mc-toggle-btn"
            :title="t('Md.zoomOut')"
            @click="zoomOut"
          >
            <img src="./asset/zoom-out-2.svg" />
          </div>
          <div
            v-if="isMermaid && showMermaidDiagram"
            class="mc-action-btn mc-toggle-btn"
            :title="t('Md.downLoad')"
            @click="download"
          >
            <img src="./asset/download-2.svg" />
          </div>
          <div
            class="mc-action-btn mc-toggle-btn"
            :title="t('Md.toggle')"
            @click="toggleExpand"
          >
            <img src="./asset/all-collapse.svg" />
          </div>
          <div
            class="mc-action-btn mc-copy-btn"
            :title="t('Md.copy')"
            @click="copyCode"
          >
            <img v-if="!copied" src="./asset/copy-new.svg" />
            <img v-else src="./asset/right.svg">
          </div>
        </div>
      </slot>
    </div>
    <slot name="header" v-else></slot>
    <Transition
      name="collapse-transition"
      @beforeEnter="beforeEnter"
      @enter="enter"
      @afterEnter="afterEnter"
      @beforeLeave="beforeLeave"
      @leave="leave"
      @afterLeave="afterLeave"
    >
      <div v-show="expanded">
          <div v-if="isMermaid && showMermaidDiagram && !$slots.content" class="mc-mermaid-content"></div>
          <pre v-else-if="!$slots.content"><code :class="`hljs language-${language}`" v-html="highlightedCode"></code></pre>
          <slot v-else name="content"></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type RendererElement, onMounted, nextTick, watch, type PropType } from 'vue';
import hljs from "highlight.js";
import { debounce } from "lodash-es";
import { MDCardService } from "./MDCardService";
import { useMcI18n } from "@matechat/core/Locale";

type MermaidConfig = {
  theme?: string;
};

const props = defineProps({
  code: {
    type: String,
      required: true
  },
  language: {
    type: String,
      default: ''
  },
  blockIndex: {
    type: Number,
      required: true
  },
  theme: {
    type: String,
      default: 'light'
    },
  enableMermaid: {
    type: Boolean,
    default: false
  },
  mermaidConfig: {
    type: Object as PropType<MermaidConfig>,
    default: () => ({})
  }
});

const { t } = useMcI18n();
const mdCardService = new MDCardService();
let mermaidService: any = null;

const expanded = ref(true);
const copied = ref(false);
const mermaidContent = ref('');
const showMermaidDiagram = ref(true);
const isMermaid = computed(() => {
  return props.enableMermaid && props.language?.toLowerCase() === 'mermaid';
});
const highlightedCode = computed(() => {
  try {
    const typeIndex = props.code.indexOf(`<span class="mc-typewriter`);

    let content;
    if (props.language && hljs.getLanguage(props.language)) {
      if (typeIndex !== -1) {
            content = hljs.highlight(props.code.slice(0, typeIndex), { language: props.language }).value + props.code.slice(typeIndex);
      } else {
            content = hljs.highlight(props.code, { language: props.language }).value;
      }
    } else {
      if (typeof hljs.highlightAuto !== undefined) {
        if (typeIndex !== -1) {
                content = hljs.highlightAuto(props.code.slice(0, typeIndex)).value + props.code.slice(typeIndex);
        } else {
          content = hljs.highlightAuto(props.code).value;
        }
      } else {
        content = mdCardService.filterHtml(props.code);
      }
    }
    return content;
  } catch (_) {}
});

const rootRef = ref<HTMLElement | null>(null);

const zoomIn = () => {
  const container = rootRef.value?.querySelector('.mc-mermaid-content');
  if (container && mermaidService) {
    mermaidService.zoomIn(container);
  }
};
const zoomOut = () => {
  const container = rootRef.value?.querySelector('.mc-mermaid-content');
  if (container && mermaidService) {
    mermaidService.zoomOut(container);
  }
};
const download = () => {
  const container = rootRef.value?.querySelector('.mc-mermaid-content');
  if (container && mermaidService) {
    mermaidService.download(container);
  }
};

const renderMermaid = async () => {
  if (!isMermaid.value || !props.code) {
    return;
  }
  if (!mermaidService) {
    try {
      const { MermaidService } = await import('./MermaidService');
      const config: MermaidConfig = {
        theme: props.theme === 'dark' ? 'dark' : 'default',
        ...props.mermaidConfig
      };
      mermaidService = new MermaidService(config);
    } catch (error) {
      console.error('Failed to load MermaidService:', error);
      return;
    }
  }
  nextTick(async () => {
    const container = rootRef.value?.querySelector('.mc-mermaid-content');
    if (container) {
      await mermaidService.renderToContainer(container, props.code.replace(/<span[^>]*\bclass\s*=\s*['"]mc-typewriter[^>]*>([\s\S]*?)<\/span>/g, `$1`), props.theme as 'light' | 'dark');
    }
  });
};

const toggleExpand = () => {
  expanded.value = !expanded.value;
};

const copyCode = debounce((e: Event) => {
  const target = e.target as HTMLElement;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(props.code);
  } else {
      const textarea = document.createElement('textarea');
      textarea.style.position = 'fixed';
      textarea.style.top = '-9999px';
      textarea.style.left = '-9999px';
      textarea.style.zIndex = '-1';
    textarea.value = props.code;
    document.body.appendChild(textarea);
    textarea.select();
      document.execCommand('copy');
    document.body.removeChild(textarea);
  }
    target.classList.remove('icon-copy-new');
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 1500);
}, 300);

const beforeEnter = (el: RendererElement) => {
  if (!el.dataset) {
    el.dataset = {};
  }
  if (el.style.height) {
    el.dataset.height = el.style.height;
  }
  el.style.maxHeight = 0;
};
const enter = (el: RendererElement) => {
  requestAnimationFrame(() => {
    el.dataset.oldOverflow = el.style.overflow;
    if (el.dataset.height) {
      el.style.maxHeight = el.dataset.height;
    } else if (el.scrollHeight !== 0) {
      el.style.maxHeight = `${el.scrollHeight}px`;
    } else {
      el.style.maxHeight = 0;
    }
      el.style.overflow = 'hidden';
  });
};
const afterEnter = (el: RendererElement) => {
    el.style.maxHeight = '';
  el.style.overflow = el.dataset.oldOverflow;
};
const beforeLeave = (el: RendererElement) => {
  if (!el.dataset) {
    el.dataset = {};
  }
  el.dataset.oldOverflow = el.style.overflow;
  el.style.maxHeight = `${el.scrollHeight}px`;
    el.style.overflow = 'hidden';
};
const leave = (el: RendererElement) => {
  if (el.scrollHeight !== 0) {
    el.style.maxHeight = 0;
  }
};
const afterLeave = (el: RendererElement) => {
    el.style.maxHeight = '';
  el.style.overflow = el.dataset.oldOverflow;
};

const themeClass = computed(() => {
    return props.theme === 'dark' ? 'mc-code-block-dark' : 'mc-code-block-light';
});

watch(() => [props.code, props.theme, props.enableMermaid], () => {
  if (isMermaid.value) {
    nextTick(() => {
      renderMermaid();
    });
  }
}, { immediate: true });

watch(
  () => showMermaidDiagram.value,
  (val) => {
    if (val && isMermaid.value) {
      nextTick(() => {
        renderMermaid();
      });
    }
  }
);

onMounted(() => {
  if (isMermaid.value) {
    renderMermaid();
  }
});
</script>

<style scoped lang="scss">
@use 'devui-theme/styles-var/devui-var.scss' as *;
@use "sass:meta";
.mc-code-block-light :deep() {
  @include meta.load-css("highlight.js/styles/a11y-light");
}
.mc-code-block-dark :deep() {
  @include meta.load-css("highlight.js/styles/a11y-dark");
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.mc-code-block {
  margin: 1rem 0;
  overflow: hidden;
  border-radius: 14px;

  pre {
    margin: 0;
  }

  .mc-action-btn {
    width: 24px;
    height: 24px;
  }

  .mc-code-block-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    .mc-code-lang {
      font-size: var(--devui-font-size, 14px);
    }
  }

  .mc-mermaid-content {
    position: relative;
    width: 100%;
    height: 400px;
    overflow: hidden;
    background: inherit;
  }

  .mc-code-block-actions {
    display: flex;
    align-items: center;
    .mc-copy-btn,
    .mc-toggle-btn {
      cursor: pointer;
      border-radius: 4px;
      font-size: 18px;
      padding: 4px;
    }
  }
  .mc-diagram-switch {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 2px;
    border-radius: 4px;
    background-color: var(--devui-icon-hover-bg);
    position: relative;
    transition: all 0.3s ease;
    overflow: hidden;
    height: 24px;
    
    &::before {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      width: calc(50% - 2px);
      height: calc(100% - 4px);
      background-color: $devui-base-bg;
      border-radius: 4px;
      transition: transform 0.3s ease;
      box-shadow: 0 1px 2px var(--devui-hover-shadow);
      z-index: 1;
    }
    
    &.mc-show-code::before {
      transform: translateX(100%);
    }

    .mc-diagram-switch-active {
      text-shadow: 0 0 .4px var(--devui-text);
    }
    
    li {
      position: relative;
      padding: 0 8px;
      font-size: 12px;
      cursor: pointer;
      transition: color 0.3s ease;
      z-index: 2;
      user-select: none;
      width: 50%;
      text-align: center;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      line-height: initial;
    }
  }
}

.mc-code-block-light {
  border: 1px solid #d7d8da;
  code.hljs {
    padding: 1em;
  }
  background-color: #f5f5f5;
  .mc-code-lang {
    color: #252b3a;
  }
  .mc-code-block-actions {
    .mc-copy-btn,
    .mc-toggle-btn {
      color: #252b3a;
      &:hover {
          background-color: #EBEBEB;
      }
    }
  }
  .mc-mermaid-content {
    background: #fefefe;
  }
}

.mc-code-block-dark {
  border: 1px solid #4e5057;
  code.hljs {
    padding: 1em;
  }
    background-color: #34363A;
  .mc-code-lang {
      color: #CED1DB;
  }
  .mc-code-block-actions {
    .mc-copy-btn,
    .mc-toggle-btn {
        color: #CED1DB;
      &:hover {
        background-color: #393a3e;
      }
      img {
        filter: brightness(1.5);
      }
    }
  }
  .mc-mermaid-content {
    background: #2b2b2b;
  }
}

.collapse-transition {
  &-enter-from,
  &-leave-to {
    opacity: 0;
  }

  &-enter-to,
  &-leave-from {
    opacity: 1;
  }

  &-enter-active,
  &-leave-active {
      transition:
        max-height 0.3s cubic-bezier(0.5, 0.05, 0.5, 0.95),
      opacity 0.3s cubic-bezier(0.5, 0.05, 0.5, 0.95);
  }
}
</style>

<style>
div[id^="dmc_mermaid"] {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -9999;
}
</style>