---
title: Header 头部
desc: 用于在头部展示logo、标题等内容的组件
bannerSrc: '/headerBanner.png'
iconSrc: '/headerIcon.png'
---

按需引入路径：

```ts
import { McHeader } from '@matechat/core';
```

### 基本用法
用于呈现头部 `logo` 与 `title` 信息。

:::demo

```vue
<template>
  <div class="container">
    <McHeader :logoImg="'/logo.svg'" :title="'MateChat'"></McHeader>
  </div>
</template>
```

:::

### Logo 区域可点击
设置 `Logo` 可进行点击，对点击事件进行监听。
:::demo

```vue
<template>
  <div class="container">
    <McHeader :logoImg="'/logo.svg'" :title="'MateChat '" :logoClickable="true" @logoClicked="onLogoClicked"></McHeader>
  </div>
</template>

<script setup>
const onLogoClicked = () => {
  console.log('logo clicked');
};
</script>
```

:::

### 自定义右侧操作区域
通过 `slot` 进行右侧操作区域自定义，可用于定义头部工具栏等。

:::demo

```vue
<template>
  <div class="container">
    <McHeader :logoImg="'/logo.svg'" :title="'MateChat'">
      <template #operationArea>
        <i class="icon icon-setting"></i>
        <i class="icon icon-history"></i>
        <i class="icon icon-personal-data"></i>
      </template>
    </McHeader>
  </div>
</template>

<style scoped lang="scss">
.icon {
  font-size: 16px;
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: var(--devui-icon-hover-bg); // #EBEBEB
  }
}
</style>
```

:::
