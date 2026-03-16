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


### 基本用法
`McLayoutContent` 组件支持`autoScroll`属性，用于自动滚动到容器底部；以及`showScrollArrow`属性，控制显示滚动箭头。

:::demo

```vue
<template>
  <button class="demo-btn" @click="pushMessage">点击添加消息</button>
  <McLayout style="max-height: 500px;">
    <McLayoutHeader>
      <McHeader :logoImg="'/logo.svg'" :title="'MateChat'"></McHeader>
    </McLayoutHeader>
    <McLayoutContent style="margin: 16px 0;">
      <McBubble content="Hello MateChat" align="right"></McBubble>
      <McBubble content="Hello, what can I do for you?"></McBubble>
      <template v-for="(item, index) in messages" :key="index">
        <McBubble v-if="item.from === 'user'" :content="item.content" align="right"></McBubble>
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
const messages = ref([]);
const pushMessage = () => {
  messages.value.push(...[
  { from: 'user', content: 'Hello MateChat' },
  { from: 'ai', content: 'Hello, what can I do for you?' },
]);
}
</script>
<style scoped>
.demo-btn {
  padding: 8px 16px;
}
</style>
```

:::
