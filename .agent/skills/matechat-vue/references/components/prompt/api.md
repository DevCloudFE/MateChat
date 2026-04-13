---
title: Prompt 提示
desc: 用于展示一组预定义的问题或建议
iconSrc: '/promptIcon.png'
---

### 参数

| 参数名    | 类型                            | 默认值     | 说明                 |
| --------- | ------------------------------- | ---------- | -------------------- |
| direction | [ListDirection](#listdirection) | 'vertical' | 排列方式，水平或垂直 |
| list      | [Prompt[]](#prompt)             | []         | 提示列表             |
| variant   | [ListVariant](#listvariant)     | 'filled'   | 提示样式             |

### 事件

| 事件名    | 类型                     | 说明                 |
| --------- | ------------------------ | -------------------- |
| itemClick | `(item: Prompt) => void` | 点击 prompt 时的事件 |

### 类型定义

#### ListDirection

```ts
enum ListDirection {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}
```

#### Prompt

```ts
interface Prompt {
  value: string | number;
  label: string;
  iconConfig?: IconConfig;
  desc?: string;
}

interface IconConfig {
  name: string;
  size?: string;
  color?: string;
  component?: Component; // 支持传入自定义 vue 组件
}
```

#### ListVariant

```ts
enum ListVariant {
  Transparent = 'transparent',
  Filled = 'filled',
  Bordered = 'bordered',
  None = 'none',
}
```
