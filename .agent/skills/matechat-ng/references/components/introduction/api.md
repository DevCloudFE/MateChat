---
title: Introduction 介绍
desc: 用于介绍向用户提供的功能
bannerSrc: '/introductionBanner.png'
---

### 参数

| 参数名      | 类型                                              | 默认值        | 说明             |
| ----------- | ------------------------------------------------- | ------------- | ---------------- |
| logoImg     | `string`                                          | ''            | 介绍页 logo 链接 |
| logoWidth   | `string \| number`                                | ''            | logo 图片宽度    |
| logoHeight  | `string \| number`                                | ''            | logo 图片高度    |
| title       | `string`                                          | ''            | 介绍页标题       |
| subTitle    | `string`                                          | ''            | 介绍页副标题     |
| description | `string[]`                                        | []            | 介绍内容         |
| background  | [IntroductionBackground](#introductionbackground) | 'transparent' | 背景样式         |
| align       | [IntroductionAlign](#introductionalign)           | 'center'      | 内容对齐方式     |

### 插槽

| 插槽名  | 返回值 | 说明                   |
| ------- | ------ | ---------------------- |
| default | --     | 位于最下方的自定义区域 |

### 类型定义

#### IntroductionBackground

```ts
type IntroductionBackground = 'filled' | 'transparent';
```

#### IntroductionAlign

```ts
type IntroductionAlign = 'left' | 'center' | 'right';
```
