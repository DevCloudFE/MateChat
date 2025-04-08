import type { PropType } from 'vue';
import { ListDirection, ListVariant } from '@matechat/core/List';

export interface IconConfig {
  name: string;
  size?: string;
  color?: string;
  component?: object;
}

export interface Prompt {
  value: string | number;
  label: string;
  iconConfig?: IconConfig;
  desc?: string;
}

export const promptProps = {
  direction: {
    type: String as PropType<ListDirection>,
    default: ListDirection.Vertical,
  },
  list: {
    type: Array as PropType<Prompt[]>,
    default: () => [],
  },
  variant: {
    type: String as PropType<ListVariant>,
    default: ListVariant.Filled,
  },
};

export const promptItemProps = {
  prompt: {
    type: Object as PropType<Prompt>,
  },
};
