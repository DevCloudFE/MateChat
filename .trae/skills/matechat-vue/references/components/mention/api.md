---
title: Mention 快捷操作
desc: 用于根据输入内容进行快捷提示的组件
bannerSrc: '/mentionBanner.png'
iconSrc: '/mentionIcon.png'
---

### 参数

| 参数名       | 类型              | 默认值 | 说明                                 |
| ------------ | ----------------- | ------ | ------------------------------------ |
| v-model      | `boolean`         | false  | 控制组件是否显示                     |
| prefix       | [Prefix](#prefix) | []     | 触发组件的前缀符                     |
| fitHostWidth | `boolean`         | true   | 是否和默认插槽的宿主元素宽度保持一致 |
| menuClass    | `string`          | --     | 自定义样式                           |

### 事件

| 事件名       | 类型                             | 说明                                       |
| ------------ | -------------------------------- | ------------------------------------------ |
| searchChange | `(e: SearchChangeEvent) => void` | 用户输入的内容与任意前缀符匹配后触发的事件 |
| toggleChange | `(e: boolean) => void`           | 组件展开收起状态变化后触发的事件           |

### 插槽

| 插槽名  | 返回值 | 说明               |
| ------- | ------ | ------------------ |
| default | --     | 自定义宿主元素     |
| menu    | --     | 自定义弹出框的内容 |

### 类型定义

#### Prefix

```ts
type Prefix = Array<string | Trigger>;
```

#### Trigger

```ts
interface Trigger {
  key: string; // 前缀符
  onlyInputStart?: boolean; // 是否仅在前缀符出现在输入内容首部的时候触发组件
}
```

#### SearchChangeEvent

```ts
interface SearchChangeEvent {
  trigger: string; // 触发组件显示的前缀符
  value: string; // 前缀符到光标位置的文本
  triggerIndex: number; // 前缀符在整个输入内容中的索引
  cursorIndex: number; // 光标在整个输入内容中的索引
}
```
