import type { ExtractPropTypes, PropType } from 'vue';
import type { Trigger, SearchChangeEvent } from '@matechat/common/Mention/common/mention-types';

export type { Trigger, SearchChangeEvent };

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
  optionsCount: {
    type: Number,
    default: 0,
  },
};
export type MentionProps = ExtractPropTypes<typeof mentionProps>;

export const mentionEmits = ['update:modelValue', 'searchChange', 'toggleChange'];
