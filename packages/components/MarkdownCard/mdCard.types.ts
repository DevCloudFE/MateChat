import type {
  CustomXssRule,
  MdPlugin,
  MermaidConfig,
  Theme,
  TypingStyle,
} from '@matechat/common/MarkdownCard/common/mdCard.types';
import type { Options } from 'markdown-it';
import type { PropType } from 'vue';

export const mdCardProps = {
  content: {
    type: String,
    default: '',
  },

  typing: {
    type: Boolean,
    default: false,
  },

  enableThink: {
    type: Boolean,
    default: false,
  },

  typingOptions: {
    step: {
      type: Number,
      default: 2,
    },

    interval: {
      type: [Number, Array] as PropType<number | [number, number]>,
      default: 60,
    },

    style: {
      type: String as PropType<TypingStyle>,
      default: 'normal',
    },
  },

  thinkOptions: {
    customClass: {
      type: String,
      default: '',
    },
  },

  mdOptions: {
    type: Object as PropType<Options>,
    default: () => ({}),
  },

  mdPlugins: {
    type: Array as PropType<Array<MdPlugin>>,
    default: () => [],
  },

  customXssRules: {
    type: Array as PropType<Array<CustomXssRule>>,
    default: () => [],
  },

  theme: {
    type: String as PropType<Theme>,
    default: 'light',
  },

  enableMermaid: {
    type: Boolean,
    default: false,
  },

  mermaidConfig: {
    type: Object as PropType<MermaidConfig>,
    default: () => ({}),
  },
};
