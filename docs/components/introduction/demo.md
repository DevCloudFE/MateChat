---
title: Introduction 介绍
desc: 用于介绍向用户提供的功能
bannerSrc: '/introductionBanner.png'
---

按需引入路径：

```ts
import { McIntroduction } from '@matechat/core';
```

### 基本用法

用于呈现 `logo`、`title`、`subTitle`，显示介绍信息。

:::demo

```vue
<template>
  <McIntroduction :logoImg="'/logo2x.svg'" :title="'MateChat'" :subTitle="'Hi，欢迎使用 MateChat'"></McIntroduction>
</template>
```

:::

### 补充描述信息

使用 `description` 字段增加描述，用于介绍更多有用信息。

:::demo

```vue
<template>
  <McIntroduction
    :logoImg="'/logo2x.svg'"
    :title="'MateChat'"
    :subTitle="'Hi，欢迎使用 MateChat'"
    :description="description"
  ></McIntroduction>
</template>

<script setup>
const description = [
  'MateChat 可以辅助研发人员编码、查询知识和相关作业信息、编写文档等。',
  '作为AI模型，MateChat 提供的答案可能不总是确定或准确的，但您的反馈可以帮助 MateChat 做的更好。',
];
</script>
```

:::

### 自定义下方补充区域

可通过 `slot插槽` 自定义更多信息，如一些提示词，“猜你想问”等信息。

:::demo

```vue
<template>
  <McIntroduction :logoImg="'/logo2x.svg'" :title="'MateChat'" :subTitle="'Hi，欢迎使用 MateChat'">
    <div class="quick-start">
      <i class="icon-helping"></i>
      <span>点我快速开始</span>
    </div>
  </McIntroduction>
</template>

<style scoped lang="scss">
.quick-start {
  padding: 8px 12px;
  border: 1px solid var(--devui-line);
  border-radius: 8px;
  cursor: pointer;

  i {
    margin-right: 8px;
  }
}
</style>
```
:::

### 设置不同的文字对齐方式

通过 `align` 参数，可用于设置文字的不同对齐方式，适用不同的场景。

:::demo

```vue
<template>
  <McIntroduction
    :logoImg="'/logo2x.svg'"
    :title="'MateChat'"
    :subTitle="'Hi，欢迎使用 MateChat'"
    :description="['MateChat 可以辅助研发人员编码、查询知识和相关作业信息、编写文档等。']"
    :align="'left'"
  ></McIntroduction>
  <div style="margin: 40px;"/>
  <McIntroduction
    :logoImg="'/logo2x.svg'"
    :title="'MateChat'"
    :subTitle="'Hi，欢迎使用 MateChat'"
    :description="['MateChat 可以辅助研发人员编码、查询知识和相关作业信息、编写文档等。']"
  ></McIntroduction>
  <div style="margin: 40px;"/>
  <McIntroduction
    :logoImg="'/logo2x.svg'"
    :title="'MateChat'"
    :subTitle="'Hi，欢迎使用 MateChat'"
    :align="'right'"
    :description="['MateChat 可以辅助研发人员编码、查询知识和相关作业信息、编写文档等。']"
  ></McIntroduction>
</template>
```

:::

