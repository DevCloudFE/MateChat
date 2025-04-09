---
title: AIButton 智能按钮
desc: 用于AI场景的智能按钮组件
bannerSrc: '/bubbleBanner.png'
---

### 参数

| 参数名         | 类型                              | 默认值   | 说明                                                   |
| -------------- | --------------------------------- | -------- | ------------------------------------------------------ |
| label        | `string`                          | 'Default'       | 按钮文案                                           |
| styleType        | `IButtonStyleType`                          | 'border-gradient'       | 按钮样式                                           |
| width        | `string`                          | ''       | 按钮宽度                                           |
| disabled        | `boolean`                          | 'false'       | 按钮禁用                                           |
| shape        | `IButtonShapeType`                          | 'capsule'       | 按钮形态                                           |
| size        | `IButtonSizeType`                          | 'md'       | 按钮尺寸                                           |

### 插槽

| 插槽名     | 返回值 | 说明               |
| ---------- | ------ | ------------------ |
| icon | --     | 自定义按钮图标     |
| suffix     | --     | 自定义按钮扩展 |


### 类型定义

```ts
export type IButtonStyleType =
  | "border-gradient"
  | "border-blue"
  | "border-black"
  | "border-none";

export type IButtonSizeType = "sm" | "md" | "lg";

export type IButtonType = "button" | "submit" | "reset";

export type IButtonShapeType = "circle" | "round" | "capsule" | "default";
```