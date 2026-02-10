import {
  type ActionItem,
  ToolbarAction,
} from '@matechat/common/Toolbar/common/toolbar.types';
import {
  TOOLBAR_GAP_DEFAULT_VALUE,
  TOOLBAR_ICON_SIZE_DEFAULT_VALUE,
} from '@matechat/common/Toolbar/common/toolbar-constants';
import type { PropType } from 'vue';

export { ToolbarAction, type ActionItem };

export const ToolbarProps = {
  // 操作项列表
  items: {
    type: Array as PropType<ActionItem[]>,
    default: () => [],
  },
  iconSize: {
    type: Number,
    default: TOOLBAR_ICON_SIZE_DEFAULT_VALUE,
  },
  // 操作项之间的间隔
  gap: {
    type: Number,
    default: TOOLBAR_GAP_DEFAULT_VALUE,
  },
};

export type ToolbarEmits = (
  e: 'onClick',
  actionItem: ActionItem,
  event: MouseEvent,
) => void;

export const IconComponentProps = {
  width: {
    type: Number,
    default: TOOLBAR_ICON_SIZE_DEFAULT_VALUE,
  },
  height: {
    type: Number,
    default: TOOLBAR_ICON_SIZE_DEFAULT_VALUE,
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
