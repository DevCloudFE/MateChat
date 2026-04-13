---
title: Introduction 介绍
desc: 用于介绍向用户提供的功能
bannerSrc: '/introductionBanner.png'
---

按需引入路径：

```ts
import { IntroductionComponent } from '@matechat/ng';
```

### 基本用法

用于呈现 `logo`、`title`、`subTitle`，显示介绍信息。

<mc-ng-introduction-basic></mc-ng-introduction-basic>

### 补充描述信息

使用 `description` 字段增加描述，用于介绍更多有用信息。

<mc-ng-introduction-description></mc-ng-introduction-description>

### 自定义下方补充区域

可通过 `slot插槽` 自定义更多信息，如一些提示词，“猜你想问”等信息。

<mc-ng-introduction-slot></mc-ng-introduction-slot>

### 设置不同的文字对齐方式

通过 `align` 参数，可用于设置文字的不同对齐方式，适用不同的场景。

<mc-ng-introduction-align></mc-ng-introduction-align>
