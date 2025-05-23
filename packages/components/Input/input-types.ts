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
};
export type InputProps = ExtractPropTypes<typeof inputProps>;

export interface InputContext {
  inputValue: Ref<string>;
  rootProps: InputProps;
  rootEmits: (event: string, ...args: any[]) => void;
}

export const inputEmits = ["change", "submit", "cancel", "focus", "blur"];
export const inputInjectionKey = "mc-input";
