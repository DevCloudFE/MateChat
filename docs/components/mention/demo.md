---
title: Mention 快捷操作
desc: 用于根据输入内容进行快捷提示的组件
bannerSrc: '/mentionBanner.png'
iconSrc: '/mentionIcon.png'
---

按需引入路径：

```ts
import { McMention } from '@matechat/core';
```

### 基本用法

通过`v-model`控制组件的展开收起。

通过`prefix`传入触发组件显示的前缀符。

监听`searchChange`事件，获取触发组件显示的前缀符、前缀符的位置、光标位置等数据。

:::demo

```vue
<template>
  <McMention v-model="isVisible" :prefix="prefix" @searchChange="onSearchChange" @toggleChange="onToggleChange">
    <McInput ref="inputRef" :value="inputValue" @change="onInputChange"> </McInput>
    <template #menu>
      <McList :data="listData" :inputEl="inputRef" enableShortKey @select="onListSelect"></McList>
    </template>
  </McMention>
</template>

<script>
import { defineComponent, ref, nextTick } from 'vue';

export default defineComponent({
  setup() {
    const isVisible = ref(false);
    const inputValue = ref('');
    const inputRef = ref();
    const listData = ref([]);
    const prefix = [{ key: '/', onlyInputStart: true }, '@'];
    let triggerIndex;
    let cursorIndex;
    let currentTrigger;
    let currentListLabel;

    const onSearchChange = (e) => {
      triggerIndex = e.triggerIndex;
      cursorIndex = e.cursorIndex;
      currentTrigger = e.trigger;
      if (e.value.includes(currentListLabel)) {
        nextTick(() => {
          isVisible.value = false;
        });
        return;
      }
      if (currentTrigger === '/') {
        listData.value = [
          { label: '写一个故事', value: 'write a story' },
          { label: '翻译一段内容', value: 'translate some text' },
          { label: '解释一段代码', value: 'explain some code' },
        ];
      }
      if (currentTrigger === '@') {
        listData.value = [
          { label: 'MateChat', value: 'matechat' },
          { label: 'InsCode', value: 'inscode' },
        ];
      }
    };

    const onToggleChange = (e) => {
      console.log('mention toggle change', e);
    };

    const onInputChange = (e) => {
      inputValue.value = e;
    };

    const onListSelect = (e) => {
      isVisible.value = false;
      currentListLabel = e.label;
      inputValue.value = inputValue.value.slice(0, triggerIndex) + currentTrigger + e.label + inputValue.value.slice(cursorIndex);
    };

    return { isVisible, prefix, inputValue, inputRef, listData, onSearchChange, onToggleChange, onInputChange, onListSelect };
  },
});
</script>
```

:::

### 自定义样式

组件宽度默认和宿主宽度保持一致，将`fitHostWidth`参数设置为`false`，组件根据`menu`插槽的内容自适应宽度；通过`menuClass`可自定义组件的样式。

:::demo

```vue
<template>
  <McMention v-model="isVisible" :prefix="prefix" :fitHostWidth="false" menuClass="custom-mention-menu" @searchChange="onSearchChange">
    <McInput ref="inputRef" :value="inputValue" @change="onInputChange"> </McInput>
    <template #menu>
      <McList :data="listData" :inputEl="inputRef" enableShortKey @select="onListSelect"></McList>
    </template>
  </McMention>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const isVisible = ref(false);
    const inputValue = ref('');
    const inputRef = ref();
    const listData = ref([]);
    const prefix = [{ key: '/', onlyInputStart: true }];
    let triggerIndex;
    let cursorIndex;
    let currentTrigger;

    const onSearchChange = (e) => {
      triggerIndex = e.triggerIndex;
      cursorIndex = e.cursorIndex;
      currentTrigger = e.trigger;
      if (currentTrigger === '/') {
        listData.value = [
          { label: '写一个故事', value: 'write a story' },
          { label: '翻译一段内容', value: 'translate some text' },
          { label: '解释一段代码', value: 'explain some code' },
        ];
      }
    };

    const onInputChange = (e) => {
      inputValue.value = e;
    };

    const onListSelect = (e) => {
      isVisible.value = false;
      inputValue.value = inputValue.value.slice(0, triggerIndex) + currentTrigger + e.label + inputValue.value.slice(cursorIndex);
    };

    return { isVisible, prefix, inputValue, inputRef, listData, onSearchChange, onInputChange, onListSelect };
  },
});
</script>

<style>
.custom-mention-menu {
  width: 200px;
}
</style>
```

:::
