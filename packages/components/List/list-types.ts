import type { ExtractPropTypes, PropType } from 'vue';

export enum ListDirection {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}
export enum ListVariant {
  Transparent = 'transparent',
  Filled = 'filled',
  Bordered = 'bordered',
  None = 'none',
}
export interface ListItemData {
  label: string;
  value: string | number;
  disabled?: boolean;
  active?: boolean;
  [key: string]: any;
}

export const listProps = {
  direction: {
    type: String as PropType<ListDirection>,
    default: ListDirection.Vertical,
  },
  autoWrap: {
    type: Boolean,
    default: true,
  },
  variant: {
    type: String as PropType<ListVariant>,
    default: ListVariant.Transparent,
  },
  enableLazyLoad: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Array as PropType<ListItemData[]>,
    default: () => [],
  },
  enableShortKey: {
    type: Boolean,
    default: false,
  },
  inputEl: {
    type: Object as PropType<HTMLElement>,
  },
  selectable: {
    type: Boolean,
    default: true,
  },
};
export type ListProps = ExtractPropTypes<typeof listProps>;
