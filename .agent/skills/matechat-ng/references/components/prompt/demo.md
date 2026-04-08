---
title: Prompt 提示
desc: 用于展示一组预定义的问题或建议
iconSrc: '/promptIcon.png'
---

按需引入路径：

```ts
import { McPrompt } from '@matechat/core';
```

### 基本用法
定义 `prompt` 列表。
<mc-ng-prompt-basic />

### 切换不同的排布

通过 `direction` 来控制 `prompt` 的排布方式。
<mc-ng-prompt-direction />


### 展示不同详细度的 prompt

你可以提示详细的内容，也可以只显示一个图标。
<mc-ng-prompt-data />

### 不同形态的 prompt

你可以通过 `variant` 控制不同的 `prompt` 样式。
<mc-ng-prompt-variant />

### 配置不同的 prompt 图标

传入不同的图标，设置颜色，大小，以及自定义 icon。
<mc-ng-prompt-icon />
