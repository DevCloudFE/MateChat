import type { PropType, VNode } from 'vue';

export enum ToolbarAction {
  COPY = 'copy',
  LIKE = 'like',
  DISLIKE = 'dislike',
  REFRESH = 'refresh',
  SHARE = 'share',
  DELETE = 'delete',
}

export interface ActionItem {
  key: string; // 唯一标识
  icon?: ToolbarAction | VNode | (() => VNode); // icon部分名称
  label?: string; // 操作项title
  onClick?: (actionItem: ActionItem, e: MouseEvent) => void; // 点击事件
  contentRender?: VNode | (() => VNode); // 内容渲染
  isActive?: boolean; // 是否激活状态，点赞点踩用
  text?: string; // 需要复制的文本
}

export const ToolbarProps = {
  // 操作项列表
  items: {
    type: Array as PropType<ActionItem[]>,
    default: () => [],
  },
  iconSize: {
    type: Number,
    default: 16,
  },
  // 操作项之间的间隔
  gap: {
    type: Number,
    default: 8,
  },
};

export type ToolbarEmits = (
  e: 'onClick',
  actionItem: ActionItem,
  event: MouseEvent,
) => void;

export const ActionItemProps = {
  size: {
    type: Number,
    default: 16,
  },
  configData: {
    type: Object as PropType<ActionItem>,
    required: true,
  },
};

export const IconComponentProps = {
  width: {
    type: Number,
    default: 16,
  },
  height: {
    type: Number,
    default: 16,
  },
  // 点赞/点踩 是否默认激活
  isActive: {
    type: Boolean,
    default: false,
  },
  // 需要复制的文本 仅对复制Icon组件生效
  text: {
    type: String,
    default: '',
  },
};
