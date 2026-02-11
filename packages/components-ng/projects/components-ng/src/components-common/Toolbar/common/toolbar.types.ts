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
  icon?: ToolbarAction; // icon部分名称
  label?: string; // 操作项title
  onClick?: (actionItem: ActionItem, e: MouseEvent) => void; // 点击事件
  isActive?: boolean; // 是否激活状态，点赞点踩用
  text?: string; // 需要复制的文本
}
