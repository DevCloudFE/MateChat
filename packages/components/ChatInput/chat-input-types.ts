import type { ExtractPropTypes, PropType } from 'vue';

export const chatInputProps = {
  modelValue: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  submitKey: {
    type: String as PropType<'Enter' | 'Shift-Enter' | 'Mod-Enter'>,
    default: 'Enter',
    validator: (value: string) =>
      ['Enter', 'Shift-Enter', 'Mod-Enter'].includes(value)
  },
  placeholder: {
    type: String,
    default: '请输入您的问题...'
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
};

export const chatInputEmits = {
  'update:modelValue': (value: string) => typeof value === 'string',
  submit: (value: string) => typeof value === 'string',
  keydown: (event: KeyboardEvent) => event instanceof KeyboardEvent,
};

export type ChatInputProps = ExtractPropTypes<typeof chatInputProps>;

export interface ChatInputExpose {
  clearInput: () => void;
  focus: () => void;
}
