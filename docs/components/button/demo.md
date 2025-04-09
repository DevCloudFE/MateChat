---
title: AIButton 智能按钮
desc: 用于AI场景的智能按钮组件
bannerSrc: '/bubbleBanner.png'
---

按需引入路径：

```ts
import { McButton } from '@matechat/core';
```

### 基本用法

基本用法只需传入 label 即可

:::demo

```vue
<template>
  <div style="display: flex; gap: 20px">
    <div class="btn-demo-wrap">
      <McButton label="Primary" @click="btnClick"></McButton>
    </div>
    <div class="btn-demo-wrap">
      <McButton label="Primary" @click="btnClick">
        <template #icon><img style="height:18px;width:18px" src="/logo.svg" /></template>
      </McButton>
    </div>
    <!-- <div class="btn-demo-wrap">
      <McButton label="Secondary" styleType="border-blue"  @click="btnClick"></McButton>
    </div>
        <div class="btn-demo-wrap">
      <McButton label="Common" styleType="border-black"  @click="btnClick"></McButton>
    </div>
        <div class="btn-demo-wrap">
      <McButton label="Black" styleType="border-none"  @click="btnClick"></McButton>
    </div> -->
  </div>
</template>
<script setup>
const btnClick = () => {
  console.log('btnclick vue')
}
</script>
<style lang="scss" >
.btn-demo-wrap {
  margin-bottom: 20px;
}
</style>
```
:::

### 按钮形态

:::demo

```vue
<template>
  <div class="shape">
    <div class="btn-demo-wrap">
      <McButton label="Primary" @click="btnClick"></McButton>
    </div>
    <div class="btn-demo-wrap">
      <McButton label="+" shape="circle"  @click="btnClick"></McButton>
    </div>
        <div class="btn-demo-wrap">
      <McButton label="round" shape="round"  @click="btnClick"></McButton>
    </div>
  </div>
</template>
<script setup>
const btnClick = () => {
  console.log('btnclick vue')
}
</script>
<style lang="scss" >
.btn-demo-wrap {
  margin-bottom: 20px;
}
.shape {
  display: flex;
  gap: 24px;
}
</style>
```
:::

### 按钮状态

:::demo

```vue
<template>
  <div>
    <div class="btn-demo-wrap">
      <McButton size="md" label="Disabled" :disabled="true" @click="btnClick"></McButton>
       <McButton size="md" label="处理中..." :disabled="true" @click="btnClick"></McButton>
    </div>
  </div>
</template>
<script setup>
const btnClick = () => {
  console.log('btnclick vue')
}
</script>
<style lang="scss" >
.btn-demo-wrap {
  display: flex;
  align-items: end;
  margin-bottom: 20px;
  gap: 10px;
}
</style>
```
:::


### 按钮尺寸

:::demo

```vue
<template>
  <div>
    <div class="btn-demo-wrap">
      <McButton size="sm" label="Primary" @click="btnClick"></McButton>
      <McButton size="md" label="Primary" @click="btnClick"></McButton>
      <McButton size="lg" label="Primary" @click="btnClick"></McButton>
    </div>
  </div>
</template>
<script setup>
const btnClick = () => {
  console.log('btnclick vue')
}
</script>
<style lang="scss" >
.btn-demo-wrap {
  display: flex;
  align-items: end;
  margin-bottom: 20px;
  gap: 10px;
}
</style>
```
:::

### 扩展插槽

:::demo

```vue
<template>
  <div>
    <div class="btn-demo-wrap">
      <McButton  label="待处理" @click="btnClick">
        <template #icon><img style="height:18px;width:18px" src="/logo.svg" /></template>
        <template #suffix>
          <span class="split-line"></span>
          <i class="icon icon-arrow-up-l" @click="arrowUp"></i>
          <i class="icon icon-arrow-down-l" @click="arrowDown"></i>
          <span class="split-line"></span>
          <i class="icon icon-recover" @click="refresh"></i>
        </template>
      </McButton>
    </div>
  </div>
</template>
<script setup>
const btnClick = () => {
  console.log('btnclick vue')
}
const arrowUp = (e) => {
  e.stopPropagation();
  console.log('arrowUp vue')
}
const arrowDown = (e) => {
  e.stopPropagation();
  console.log('arrowDown vue')
}
const refresh = (e) => {
  e.stopPropagation();
  console.log('refresh vue');
}
</script>
<style lang="scss" >
.btn-demo-wrap {
  display: flex;
  align-items: end;
  margin-bottom: 20px;
  gap: 10px;

  .icon {
    font-size: 16px;
    width: 30px;
    height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    &:hover {
      background-color: var(--devui-icon-hover-bg);
    }
  }
}
.split-line {
  display: inline-block;
  margin: 0 8px;
  width: 1px;
  height: 12px;
  background-color: #dbdbdb;
}
</style>
```
:::




