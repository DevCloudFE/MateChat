import type {
  Options,
  PluginSimple,
  PluginWithOptions,
  PluginWithParams,
} from 'markdown-it';
import type { PropType } from 'vue';

export interface CustomXssRule {
  key: string;
  value: string[] | null;
}

export interface CodBlockData {
  code: string;
  language: string;
}

export type CodeBlockSlot = {
  actions?: () => void;
  header?: () => void;
  content?: () => void;
};

export type Theme = 'light' | 'dark';

export interface MdPlugin {
  plugin: PluginSimple | PluginWithOptions | PluginWithParams;
  opts?: unknown;
}

export const mdCardProps = {
  content: {
    type: String,
    default: '',
  },

  enableThink: {
    type: Boolean,
    default: false,
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
};
