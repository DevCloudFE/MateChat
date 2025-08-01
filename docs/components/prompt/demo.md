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
:::demo

```vue
<template>
  <div style="width: 300px">
    <McPrompt :list="promptData"></McPrompt>
  </div>
</template>

<script setup>
const promptData = [
  {
    value: 'quickSort',
    label: '帮我写一个快速排序',
    iconConfig: { name: 'icon-info-o', color: '#5e7ce0' },
    desc: '使用 js 实现一个快速排序',
  },
  {
    value: 'helpMd',
    label: '你可以帮我做些什么？',
    iconConfig: { name: 'icon-star', color: 'rgb(255, 215, 0)' },
    desc: '了解当前大模型可以帮你做的事',
  },
];
</script>
```

:::

### 切换不同的排布

通过 `direction` 来控制 `prompt` 的排布方式。

:::demo

```vue
<template>
  <div class="demo-container">
    <div style="width: 300px">
      <McPrompt :list="promptData"></McPrompt>
    </div>
    <div>
      <McPrompt :list="promptData" :direction="'horizontal'"></McPrompt>
    </div>
  </div>
</template>

<script setup>
const promptData = [
  {
    value: 'quickSort',
    label: '帮我写一个快速排序',
    iconConfig: { name: 'icon-info-o', color: '#5e7ce0' },
    desc: '使用 js 实现一个快速排序',
  },
  {
    value: 'helpMd',
    label: '你可以帮我做些什么？',
    iconConfig: { name: 'icon-star', color: 'rgb(255, 215, 0)' },
    desc: '了解当前大模型可以帮你做的事',
  },
];
</script>

<style scoped lang="scss">
.demo-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
```

:::

### 展示不同详细度的 prompt

你可以提示详细的内容，也可以只显示一个图标。

:::demo

```vue
<template>
  <div class="demo-container">
    <McPrompt :list="promptData1" :direction="'horizontal'"></McPrompt>
    <McPrompt :list="promptData2" :direction="'horizontal'"></McPrompt>
    <McPrompt :list="promptData3" :direction="'horizontal'"></McPrompt>
  </div>
</template>

<script setup>
const promptData1 = [
  {
    value: 'quickSort',
    label: '帮我写一个快速排序',
    iconConfig: { name: 'icon-info-o', color: '#5e7ce0' },
    desc: '使用 js 实现一个快速排序',
  },
];
const promptData2 = [
  {
    value: 'quickSort',
    label: '帮我写一个快速排序',
    iconConfig: { name: 'icon-info-o', color: '#5e7ce0' },
  },
];
const promptData3 = [
  {
    value: 'quickSort',
    iconConfig: { name: 'icon-info-o', color: '#5e7ce0' },
  },
];
</script>

<style scoped lang="scss">
.demo-container {
  display: flex;
  gap: 8px;
}
</style>
```

:::

### 不同形态的 prompt

你可以通过 `variant` 控制不同的 `prompt` 样式。

:::demo

```vue
<template>
  <div class="container">
    <p style="margin: 0 0 8px;">带背景色的 prompt 列表</p>
    <McPrompt :list="promptData" :direction="'horizontal'"></McPrompt>
    <p style="margin-bottom: 8px;">带边框的 prompt 列表</p>
    <McPrompt :list="promptData" :direction="'horizontal'" :variant="'bordered'"></McPrompt>
    <p style="margin-bottom: 8px;">透明背景色的 prompt 列表</p>
    <McPrompt :list="promptData" :direction="'horizontal'" :variant="'transparent'"></McPrompt>
    <p style="margin-bottom: 8px;">无任何样式的 prompt 列表，方便你覆盖样式</p>
    <McPrompt :list="promptData" :direction="'horizontal'" :variant="'none'"></McPrompt>
  </div>
</template>

<script setup>
const promptData = [
  {
    value: 'quickSort',
    label: '帮我写一个快速排序',
    iconConfig: { name: 'icon-info-o', color: '#5e7ce0' },
    desc: '使用 js 实现一个快速排序',
  },
];
</script>
```

:::

### 配置不同的 prompt 图标

传入不同的图标，设置颜色，大小，以及自定义 icon。

:::demo

```vue
<template>
  <div class="demo-container">
    <McPrompt :list="promptData1"></McPrompt>
    <McPrompt :list="promptData2"></McPrompt>
    <McPrompt :list="promptData3"></McPrompt>
    <McPrompt :list="promptData4"></McPrompt>
  </div>
</template>

<script setup>
import Icon from './Icon.vue';

const promptData1 = [
  {
    value: 'quickSort',
    label: '帮我写一个快速排序',
    iconConfig: { name: 'icon-info-o' },
    desc: '使用 js 实现一个快速排序',
  },
];

const promptData2 = [
  {
    value: 'quickSort',
    label: '帮我写一个快速排序',
    iconConfig: { name: 'icon-info-o', color: '#5e7ce0' },
    desc: '使用 js 实现一个快速排序',
  },
];

const promptData3 = [
  {
    value: 'quickSort',
    label: '帮我写一个快速排序',
    iconConfig: { name: 'icon-info-o', color: 'rgb(255, 215, 0)', size: '18px' },
    desc: '使用 js 实现一个快速排序',
  },
];

const promptData4 = [
  {
    value: 'quickSort',
    label: '帮我写一个快速排序',
    iconConfig: { component: Icon },
    desc: '使用 js 实现一个快速排序',
  },
];
</script>

<style scoped lang="scss">
.demo-container {
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 8px;
}
</style>
```

:::
