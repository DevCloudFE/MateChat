import type { ExtractPropTypes, PropType, Ref } from "vue";

export enum DisplayType {
  Simple = "simple",
  Full = "full",
}
export enum InputVariant {
  Bordered = "bordered",
  BorderLess = "borderless",
}
export enum SendBtnVariant {
  Simple = "simple",
  Full = "full",
}
export enum SubmitShortKey {
  Enter = "enter",
  ShiftEnter = "shiftEnter",
}

export type TextareaAutoSize = { minRows?: number; maxRows?: number } | boolean;

export const DEFAULT_AUTOSIZE = {
  minRows: 1,
  maxRows: 5
};

export const inputProps = {
  value: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  displayType: {
    type: String as PropType<DisplayType>,
    default: DisplayType.Full,
  },
  variant: {
    type: String as PropType<InputVariant>,
    default: InputVariant.Bordered,
  },
  sendBtnVariant: {
    type: String as PropType<SendBtnVariant>,
    default: SendBtnVariant.Full,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  showCount: {
    type: Boolean,
    default: false,
  },
  maxLength: {
    type: Number,
  },
  submitShortKey: {
    type: [String, null] as PropType<SubmitShortKey | null>,
    default: SubmitShortKey.Enter,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  autosize: {
    type: [Boolean, Object] as PropType<TextareaAutoSize>,
    default: false,
  },
  autoClear: {
    type: Boolean,
    default: true,
  },
};
export type InputProps = ExtractPropTypes<typeof inputProps>;

export interface InputContext {
  inputValue: Ref<string>;
  rootProps: InputProps;
  rootEmits: (event: string, ...args: any[]) => void;
  clearInputAfterSubmit: () => void;
}

export const inputEmits = ["change", "submit", "cancel", "focus", "blur"];
export const inputInjectionKey = "mc-input";
