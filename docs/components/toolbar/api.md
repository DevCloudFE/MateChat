---
title: Toolbar组件
desc: Toolbar组件文档
bannerSrc: '/textareaBanner.png'
iconSrc: '/textareaIcon.png'
---

### 参数

| 参数名   | 类型                              | 默认值   | 说明                 |
|----------|-----------------------------------|----------|----------------------|
| items    | `Array<ActionItem>`               | []       | 操作项列表           |
| iconSize | `number`                          | 16       | 图标尺寸             |
| gap      | `number`                          | 8        | 操作项之间的间隔     |

### 事件

| 事件名   | 类型                                                | 说明                     |
|----------|-----------------------------------------------------|--------------------------|
| onClick  | `(actionItem: ActionItem, event: MouseEvent) => void` | 点击操作项时触发的事件   |

### 类型定义

#### ToolbarAction

```ts
enum ToolbarAction {
    COPY = 'copy',
    LIKE = 'like',
    DISLIKE = 'dislike',
    SHARE = 'share',
    DELETE = 'delete',
}
```

#### ActionItem

```ts
interface ActionItem {
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
```