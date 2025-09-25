---
title: ChatInput 聊天输入
desc: 用于多轮对话输入的富文本框组件，支持快捷提交与代码块输入
bannerSrc: "/example1.png"
---

按需引入路径：

```ts
import { McChatInput } from "@matechat/core";
```

### 基本用法

- 通过 `v-model` 绑定输入内容
- 通过 `disabled` 禁用输入框
- 支持 ` ```[lang] ` + 换行生成代码块
- 默认情况下，按下`Enter`触发`submit`事件

:::demo

````vue
<template>
  <div class="demo-wrapper">
    <McChatInput v-model="value" :disabled="disabled" @submit="handleSubmit">
    </McChatInput>
    <div class="demo-footer">
      <div class="demo-value">
        <span>value:</span>
        <pre>{{ value }}</pre>
      </div>
      <button class="demo-toggle" type="button" @click="toggleDisabled">
        {{ disabled ? "启用" : "禁用" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const value = ref("");
const disabled = ref(false);

const handleSubmit = (text: string) => {
  console.log("submit", text);
  value.value = "";
};

const toggleDisabled = () => {
  disabled.value = !disabled.value;
};
</script>

<style scoped>
.demo-wrapper {
  display: grid;
  gap: 12px;
}

.demo-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.demo-toggle {
  padding: 6px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  background: transparent;
  cursor: pointer;
  font-size: 12px;
  white-space: nowrap;
}

.demo-toggle:hover {
  background: var(--vp-c-default-soft);
}

.demo-value {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.demo-value pre {
  margin: 0;
  font-family: ui-monospace, SFMono-Regular, SFMono, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  font-size: 12px;
  white-space: pre-wrap;
  word-break: break-word;
  display: inline-flex;
}
</style>
````

:::

### 自定义提交快捷键

使用 `submitKey` 切换提交快捷键，支持 `Enter`、`Shift-Enter` 与 `Mod-Enter`。

:::demo

```vue
<template>
  <div class="demo-wrapper">
    <McChatInput
      v-model="value"
      :submitKey="submitKey"
      @submit="handleSubmit"
    />
    <div class="demo-actions">
      <span>当前快捷键：{{ submitKey }}</span>
      <button class="demo-button" type="button" @click="toggleShortcut">
        切换快捷键
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const shortcuts = ["Enter", "Shift-Enter", "Mod-Enter"];
const currentIndex = ref(0);
const submitKey = ref(shortcuts[currentIndex.value]);
const value = ref("");

const toggleShortcut = () => {
  currentIndex.value = (currentIndex.value + 1) % shortcuts.length;
  submitKey.value = shortcuts[currentIndex.value];
};

const handleSubmit = (text) => {
  console.log("submit", text);
  value.value = "";
};
</script>

<style scoped>
.demo-wrapper {
  display: grid;
  gap: 8px;
}

.demo-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--vp-c-text-2);
}

.demo-button {
  padding: 4px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background-color: transparent;
  cursor: pointer;
}

.demo-button:hover {
  background-color: var(--vp-c-default-soft);
}
</style>
```

:::

### 监听键盘事件

`keydown` 事件在每次按键时触发，可用于实现自定义快捷键或输入监控。

:::demo

```vue
<template>
  <div class="demo-wrapper">
    <McChatInput v-model="value" @keydown="handleKeydown" />
    <div class="demo-value">最后按下的键：{{ lastKeyPressed }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const value = ref("");
const lastKeyPressed = ref("");

const handleKeydown = (event) => {
  lastKeyPressed.value = event.key;
};
</script>

<style scoped>
.demo-wrapper {
  display: grid;
  gap: 8px;
}

.demo-value {
  color: var(--vp-c-text-2);
}
</style>
```

:::

### 前缀插槽

通过 `prefix` 插槽可以在编辑区域左侧放置操作按钮。

:::demo

```vue
<!-- @include: @/components/chat-input/snippets/prefix-slot.vue -->
```

:::

### 尾部插槽

`suffix` 插槽位于编辑区域右侧，可以承载模式切换、状态指示灯等快捷操作。

:::demo

```vue
<!-- @include: @/components/chat-input/snippets/suffix-slot.vue -->
```

:::

### 底部扩展插槽

`extra` 插槽位于输入框底部左侧，可以实时展示字数、令牌统计或提示文案，并结合业务状态显示正在生成等信息。

:::demo

```vue
<!-- @include: @/components/chat-input/snippets/extra-slot.vue -->
```

:::

### 头部插槽

通过 `head` 插槽可以在输入区域上方渲染上下文信息，例如引用消息或会话提示。

:::demo

```vue
<!-- @include: @/components/chat-input/snippets/head-slot.vue -->
```

:::

### 使用组件实例方法

通过 `ref` 获取实例并调用 `clearInput` 清空内容或 `focus` 使其聚焦。

:::demo

```vue
<template>
  <div class="demo-wrapper">
    <McChatInput ref="chatInputRef" v-model="value" @submit="handleSubmit" />
    <div class="demo-actions">
      <button class="demo-button" type="button" @click="clearInput">
        手动清空
      </button>
      <button class="demo-button" type="button" @click="focusInput">
        手动聚焦
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const value = ref("内置的文本示例");
const chatInputRef = ref();

const handleSubmit = (text) => {
  console.log("submit", text);
  value.value = "";
};

const clearInput = () => {
  chatInputRef.value?.clearInput();
  value.value = "";
};

const focusInput = () => {
  chatInputRef.value?.focus();
};
</script>

<style scoped>
.demo-wrapper {
  display: grid;
  gap: 8px;
}

.demo-actions {
  display: flex;
  justify-content: flex-end;
}

.demo-button {
  padding: 4px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background-color: transparent;
  cursor: pointer;
}

.demo-button:hover {
  background-color: var(--vp-c-default-soft);
}
</style>
```

:::
