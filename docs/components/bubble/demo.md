---
title: Bubble 气泡
desc: 用于承载对话内容的气泡组件
bannerSrc: '/bubbleBanner.png'
---

按需引入路径：

```ts
import { McBubble } from '@matechat/core';
```

### 基本用法

基本用法只需传入 `content` 即可。

:::demo

```vue
<template>
  <McBubble :content="'Hello MateChat'"></McBubble>
</template>
```

:::

### 显示 Loading 状态

当设置 `loading` 为 `true` 时，将不会显示气泡内的其他区域。我们内置了一个默认的 `loading` 状态，如果不满足你的使用需求，可以通过 `loadingTpl` 插槽来自定义 `loading`。

:::demo

```vue
<template>
  <div class="demo-container">
    <McBubble :content="'Hello MateChat'" :avatarConfig="avatarConfig" :loading="true"></McBubble>
    <McBubble :content="'Hello MateChat'" :avatarConfig="avatarConfig" :loading="true">
      <template #loadingTpl>
        <div>The model is thinking ......</div>
      </template>
    </McBubble>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const avatarConfig = {
  imgSrc: '/logo.svg',
};
</script>

<style scoped>
.demo-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
```

:::

### 支持不同的气泡样式

默认为 `filled`，还可以设置 `bordered` 和 `none`，其中 `filled` 和 `bordered` 我们为其设置了间距和圆角，`none` 则不带任何样式。

:::demo

```vue
<template>
  <div class="demo-container">
    <McBubble :content="'Hello MateChat'"></McBubble>
    <McBubble :content="'Hello MateChat'" :variant="'bordered'"></McBubble>
    <McBubble :content="'Hello MateChat'" :variant="'none'"></McBubble>
  </div>
</template>

<style scoped>
.demo-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
```

:::

### 支持不同的气泡对齐方式

我们提供了 `left` 和 `right` 两种对齐方式，方便你区分用户提问和模型回答。

:::demo

```vue
<template>
  <div class="demo-container">
    <McBubble :content="'Hello MateChat'" :align="'right'"></McBubble>
    <McBubble :content="'Hello, what can I do for you?'"></McBubble>
  </div>
</template>

<style scoped>
.demo-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
```

:::

### 支持配置头像, 设置不同的头像位置

默认的我们的头像将显示在侧边，你也可以通过 `avatarPosition` 将其显示在气泡上方。

:::demo

```vue
<template>
  <div class="demo-container">
    <McBubble :content="'Hello MateChat'" :align="'right'" :avatarConfig="userAvatar"></McBubble>
    <McBubble :content="'Hello, what can I do for you?'" :avatarConfig="modelAvatar"></McBubble>
    <McBubble :content="'You can ask me everything~'" :avatarConfig="{}"></McBubble>
    <McBubble :content="'Hello MateChat'" :align="'right'" :avatarConfig="userAvatarTop" :avatarPosition="'top'"></McBubble>
    <McBubble :content="'Hello, what can I do for you?'" :avatarConfig="modelAvatarTop" :avatarPosition="'top'"></McBubble>
  </div>
</template>

<script setup>
const modelAvatar = {
  imgSrc: '/logo.svg',
};
const userAvatar = {
  imgSrc: '/png/demo/userAvatar.svg',
};
const modelAvatarTop = {
  ...modelAvatar,
  displayName: 'MateChat',
};
const userAvatarTop = {
  ...userAvatar,
  displayName: 'User',
};
</script>

<style scoped>
.demo-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
```

:::

### 完全自定义头像区域

我们提供了 `avatar` 插槽，支持你自定义头像区的显示，进行更复杂的头像渲染。

:::demo

```vue
<template>
  <div class="demo-container">
    <McBubble content="Hello MateChat" align="right" avatarPosition="top">
      <template #avatar>
        <div class="demo-container" style="gap: 0; align-items: center;">
          <img src="/png/demo/userAvatar.svg" style="{ width: 40px; height: 40px; }" />
          <span>User</span>
        </div>
      </template>
    </McBubble>
    <McBubble :content="'Hello, what can I do for you?'" :avatarConfig="modelAvatar">
      <template #avatar>
        <div class="demo-container" style="gap: 0;">
          <img src="/logo.svg" style="{ width: 40px; height: 40px; }" />
          <span>MateChat</span>
        </div>
      </template>
    </McBubble>
  </div>
</template>

<script setup>
</script>

<style scoped>
.demo-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
```
:::

### 自定义气泡内容区

我们提供了 `default` 插槽，支持你自定义内容区的显示，进行更复杂的数据渲染，下面将以 `markdown` 为例。

:::demo

```vue
<template>
  <McBubble>
    <!-- 实际场景中请注意配合 xss 一起使用 -->
    <div v-html="mdt.render(content)"></div>
  </McBubble>
</template>

<script setup>
import markdownit from 'markdown-it';

const mdt = markdownit({ breaks: true, linkify: true, html: true }); // 更多配置可以参考 markdown-it api 文档，或直接使用 Markdown卡片 组件

const content = `#标题1 标题1内容\n\n##标题2 标题2内容\n\n>引用引用`;
</script>
```

:::

### 完全自定义气泡内容区域

将 `variant` 设置为 `none` 之后我们将不会为气泡内容区添加任何样式，方便你进行更多个性化的展示。

:::demo

```vue
<template>
  <McBubble :variant="'none'" :avatarConfig="{ imgSrc: '/logo.svg' }">
    <div class="suggestion-list">
      <div class="suggestion-item">
        <i class="icon-inform"></i>
        <span class="suggestion-text">Do you want me to inform you at Monday afternoon ?</span>
      </div>
      <div class="suggestion-item">
        <i class="icon-mandatory"></i>
        <span class="suggestion-text">Add this item to your todo list ?</span>
      </div>
      <div class="suggestion-item">
        <i class="icon-publish-new"></i>
        <span class="suggestion-text">Send this message to chat ?</span>
      </div>
    </div>
  </McBubble>
</template>

<style scoped lang="scss">
.suggestion-list {
  display: flex;
  flex-direction: column;
  gap: 12px;

  .suggestion-item {
    border: 1px solid var(--devui-dividing-line);
    border-radius: 8px;
    padding: 4px 8px;
    cursor: pointer;

    &:hover {
      background-color: var(--devui-global-bg);
    }

    .suggestion-text {
      margin-left: 8px;
    }

    .icon-inform {
      color: var(--devui-info);
    }

    .icon-mandatory {
      color: var(--devui-success);
    }

    .icon-publish-new {
      color: var(--devui-waiting);
    }
  }
}
</style>
```

:::

### 自定义气泡操作区域

我们还为气泡提供了 `top` 和 `bottom` 两个自定义区域，方便你实现一些自定义需求。

:::demo

```vue
<template>
  <McBubble :content="'Hello MateChat'" :avatarConfig="{ imgSrc: '/logo.svg' }">
    <template #top>
      <div class="bubble-top-area">
        <span>MateChat</span>
      </div>
    </template>
    <template #bottom>
      <div class="bubble-bottom-area">
        <i class="icon icon-copy-new"></i>
        <i class="icon icon-like"></i>
        <i class="icon icon-dislike"></i>
      </div>
    </template>
  </McBubble>
</template>

<style scoped lang="scss">
.bubble-top-area {
  margin-bottom: 4px;
}

.bubble-bottom-area {
  margin-top: 4px;

  .icon {
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: var(--devui-icon-hover-bg); // #EBEBEB
    }
  }
}
</style>
```

:::
