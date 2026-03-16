---
title: Layout 布局
desc: 用于对不同的模块进行排列布局
bannerSrc: '/layoutBanner.png'
iconSrc: '/layoutIcon.png'
---

按需引入路径：

```ts
import { McLayoutAside, McLayoutContent, McLayoutHeader, McLayout, McLayoutSender } from '@matechat/core';
```

### 基本用法
可使用 `McLayoutAside`, `McLayoutContent`, `McLayoutHeader`, `McLayout`, `McLayoutSender` 布局容器，进行语义化结构定义，各容器将持续演进其通用能力。

:::demo

```vue
<template>
  <McLayout>
    <McLayoutHeader>
      <McHeader :logoImg="'/logo.svg'" :title="'MateChat'"></McHeader>
    </McLayoutHeader>
    <McLayoutContent style="margin: 16px 0;">
      <McBubble content="Hello MateChat" align="right"></McBubble>
      <McBubble content="Hello, what can I do for you?"></McBubble>
    </McLayoutContent>
    <McLayoutSender>
      <McInput :value="inputValue" :maxLength="2000" showCount></McInput>
    </McLayoutSender>
  </McLayout>
</template>

<script setup>
import { ref } from 'vue';

const msg = ref('组件demo');
const inputValue = ref('');
</script>
```

:::


### 自动滚动
`McLayoutContent` 组件支持`autoScroll`属性，用于自动滚动到容器底部；以及`showScrollArrow`属性，控制显示滚动箭头。

:::demo

```vue
<template>
  <button class="demo-btn" @click="pushMessage">点击添加消息</button>
  <McLayout>
    <McLayoutHeader>
      <McHeader :logoImg="'/logo.svg'" :title="'MateChat'"></McHeader>
    </McLayoutHeader>
    <McLayoutContent style="margin: 16px 0; max-height: 400px;">
      <template v-for="(item, index) in messages" :key="index">
        <McBubble v-if="item.from === 'user'" :content="item.content" :align="'right'"></McBubble>
        <McBubble v-else :content="item.content"></McBubble>
      </template>
    </McLayoutContent>
    <McLayoutSender>
      <McInput :value="inputValue" :maxLength="2000" showCount></McInput>
    </McLayoutSender>
  </McLayout>
</template>

<script setup>
import { ref } from 'vue';

const msg = ref('组件demo');
const inputValue = ref('');
const getInitMessags = () => {
  return new Array(10).fill(0).map((item, index) => ({
    from: index % 2 === 0 ? 'user' : 'ai',
    content: index % 2 === 0 ? 'Hello MateChat' : 'Hello, what can I do for you?',
  }));
};
const messages = ref(getInitMessags());
const pushMessage = () => {
  messages.value.push(...[
    { from: 'user', content: 'Hello MateChat' },
    { from: 'ai', content: 'Hello, what can I do for you?' },
  ]);
}
</script>
<style scoped>
.demo-btn {
  background-color: var(--devui-primary, #5e7ce0);
  border-color: transparent;
  color: var(--devui-light-text, #ffffff);
  min-width: 64px;
  border-radius: var(--devui-border-radius, 2px);
  cursor: pointer;
  position: relative;
  margin-bottom: 16px;
  padding: var(--devui-btn-padding, 0 20px);
  font-size: var(--devui-font-size-md, 12px);
  height: 32px;
  line-height: var(--devui-line-height-base, 1.5);
  border-width: 1px;
  border-color: transparent;

  &:active {
    background-color: var(--devui-primary-active, #344899);
  }
}
</style>
```

:::
