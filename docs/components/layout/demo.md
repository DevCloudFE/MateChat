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
