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

export interface ThemeTagItem {
  type: 'themeTag';
  themeTagKey?: string; // 主题标签的唯一标识
  themeTagText: string; // 主题标签的文本内容
  clearInput?: boolean; // 关闭主题标签时是否清空对应输入框内容
  popoverContent: string; // 主题标签的pop弹出提示内容
}

export interface TipTagOption {
  tipTagKey?: string; // 前置提示标签的唯一标识
  tipTagText: string; // 前置提示标签的文本内容
  clearInput?: boolean; // 关闭前置标签时是否清空对应输入框内容
  popoverContent: string; // 前置提示标签的pop弹出提示内容
}

export interface FormatTextItem {
  type: 'text';
  key: string; // 标签的唯一标识
  content: string; 
}

export interface FormatInputItem {
  type: 'input';
  key: string; // 标签的唯一标识
  placeholder?: string; // input标签的占位提示内容
  content?: string; // input标签的默认展示内容，与placeholder需保证有其一
}

export type FormatContentItem = FormatTextItem | FormatInputItem | ThemeTagItem;
export interface FormatContentOptions {
  formatContent: FormatContentItem[]; // 当前仅支持最多设置一个ThemeTag，且必须放在数组的第一个位置
}

export const TimeToViewRender = 50;