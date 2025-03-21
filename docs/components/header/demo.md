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

:::demo

```vue
<template>
  <div class="container">
    <McHeader :logoImg="'/logo.svg'" :title="'MateChat'"></McHeader>
  </div>
</template>

<style scoped>
.container {
  background-color: var(--devui-global-bg);
  padding: 8px 12px;
}
</style>
```

:::

### Logo 区域可点击

:::demo

```vue
<template>
  <div class="container">
    <McHeader :logoImg="'/logo.svg'" :title="'MateChat'" :logoClickable="true" @logoClicked="onLogoClicked"></McHeader>
  </div>
</template>

<script setup>
const onLogoClicked = () => {
  console.log('logo clicked');
};
</script>

<style scoped>
.container {
  background-color: var(--devui-global-bg);
  padding: 8px 12px;
}
</style>
```

:::

### 自定义右侧操作区域

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
.container {
  background-color: var(--devui-global-bg);
  padding: 8px 12px;
}

.icon {
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: var(--devui-icon-hover-bg); // #EBEBEB
  }
}
</style>
```

:::
