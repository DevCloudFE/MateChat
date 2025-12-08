import type { PropType, VNode } from 'vue';

export enum ToolbarAction {
  COPY = 'copy',
  LIKE = 'like',
  DISLIKE = 'dislike',
  // REFRESH = 'refresh',
  SHARE = 'share',
  DELETE = 'delete',
}

export interface ActionItem {
  key?: string;
  /** 操作项图标 */
  icon?: ToolbarAction | VNode | (() => VNode);
  /** 操作项文本 */
  label?: string;
  /** 点击事件 */
  onClick?: (actionItem: ActionItem, e: MouseEvent) => void;
  // 内容渲染
  contentRender?: VNode | (() => VNode);
  // 是否激活状态，点赞点踩用
  isActive?: boolean;
  // 需要复制的文本
  text?: string;
}

export const ToolbarProps = {
  /** 操作项列表 */
  items: {
    type: Array as PropType<ActionItem[]>,
    default: () => [],
  },
  iconSize: {
    type: Number,
    default: 16,
  },
  // 操作项直接的间隔
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
