// Mention组件的公共类型定义
export interface Trigger {
  key: string;
  onlyInputStart?: boolean;
}

export interface MentionProps {
  modelValue: boolean;
  prefix: Array<string | Trigger>;
  fitHostWidth: boolean;
  optionsCount: number;
}

export interface SearchChangeEvent {
  value: string;
  trigger: string;
  triggerIndex: number;
  cursorIndex: number;
}