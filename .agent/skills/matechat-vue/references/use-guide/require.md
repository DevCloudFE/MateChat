# 按需引入

除了全量引入，我们也支持单个组件按需引入。

#### 全局安装单个组件：

在`main.ts`文件中安装组件：

```ts
import App from './App.vue';
import { McBubble } from '@matechat/core';

createApp(App).use(McBubble).mount('#app');
```

在任意`.vue`文件中使用组件：

```vue
<template>
  <McBubble :content="'Hello MateChat'"></McBubble>
</template>
```

#### 直接使用单个组件：

在任意`.vue`文件中直接引入组件：

```vue
<template>
  <McBubble :content="'Hello MateChat'"></McBubble>
</template>

<script setup>
import { McBubble } from '@matechat/core';
</script>
```
