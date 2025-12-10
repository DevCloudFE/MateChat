---
title: Toolbar组件
desc: Toolbar组件文档
bannerSrc: '/textareaBanner.png'
iconSrc: '/textareaIcon.png'
---

### Toolbar 参数

| 参数名   | 类型                              | 默认值   | 说明                 |
|----------|-----------------------------------|----------|----------------------|
| items    | `Array<ActionItem>`               | []       | 操作项列表           |
| iconSize | `number`                          | 16       | 图标尺寸             |
| gap      | `number`                          | 8        | 操作项之间的间隔     |

### Toolbar 事件

| 事件名   | 类型                                                | 说明                     |
|----------|-----------------------------------------------------|--------------------------|
| onClick  | `(actionItem: ActionItem, event: MouseEvent) => void` | 点击操作项时触发的事件   |

### 图标组件参数
内置图标组件： `McToolbar` `McCopyIcon` `McDeleteIcon` `McLikeIcon` `McDislikeIcon` `McRefreshIcon` `McShareIcon`

| 参数名      | 类型        | 默认值   | 说明             |
|----------|-----------|-------|----------------|
| width    | `number`  | 16    | 宽度             |
| height   | `number`  | 16    | 高度             |
| isActive | `boolean` | false | 点赞/点踩图标 是否默认激活 |
| text     | `string`  | ''    | 复制图标组件需要复制的文本  |

### 类型定义

#### ToolbarAction

```ts
enum ToolbarAction {
    COPY = 'copy',
    LIKE = 'like',
    DISLIKE = 'dislike',
    REFRESH = 'refresh',
    SHARE = 'share',
    DELETE = 'delete',
}
```

#### ActionItem

```ts
interface ActionItem {
  key?: string; // 唯一标识
  icon?: ToolbarAction | VNode | (() => VNode); // icon部分名称
  label?: string; // 操作项title
  onClick?: (actionItem: ActionItem, e: MouseEvent) => void; // 点击事件
  contentRender?: VNode | (() => VNode); // 内容渲染
  isActive?: boolean; // 点赞/点踩图标的 激活状态
  text?: string; // 需要复制的文本
}
```