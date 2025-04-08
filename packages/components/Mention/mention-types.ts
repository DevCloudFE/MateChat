import type { ExtractPropTypes, PropType } from 'vue';

export interface Trigger {
  key: string;
  onlyInputStart?: boolean;
}

export const mentionProps = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  prefix: {
    type: Array as PropType<Array<string | Trigger>>,
    default: () => [],
  },
  fitHostWidth: {
    type: Boolean,
    default: true,
  },
  menuClass: {
    type: String,
  },
};
export type MentionProps = ExtractPropTypes<typeof mentionProps>;

export const mentionEmits = ['update:modelValue', 'searchChange', 'toggleChange'];
