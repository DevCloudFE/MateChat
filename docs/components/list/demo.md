---
title: List 列表
desc: 用于展示一组内容或选项，适用历史对话列表呈现等场景
bannerSrc: '/listBanner.png'
iconSrc: '/listIcon.png'
---

按需引入路径：

```ts
import { McList } from '@matechat/core';
```

### 基本用法

一般用于选中类场景。选项数据中通过`disabled`字段设置选项禁用，通过`active`字段设置选中。默认悬浮高亮，点击时选中高亮。

:::demo

```vue
<template>
  <McList :data="options" @select="onSelect" class="my-list"></McList>
</template>

<script setup>
import { defineComponent, ref } from 'vue';

const options = ref(
  new Array(6).fill(0).map((item, i) => ({
    label: `Option ${i + 1}`,
    value: i + 1,
    disabled: i === 3,
    active: i === 1,
  })),
);

const onSelect = (e) => {
  console.log('list selected', e);
};
</script>
<style scoped lang="scss">
  .my-list {
    width: 280px;
  }
</style>
```

:::

### 水平排列

一般用于展示类场景。`direction`参数可设置列表的排列方式，`variant`参数可设置选项的展示形态，`autoWrap`参数可在列表水平排列时设置是否自动换行，`selectable`设置为`false`可禁用点击选项时的选中高亮。

:::demo

```vue
<template>
  <div style="display: flex; margin-bottom: 10px; align-items: center;">
    <div style="margin-right: 10px;">展示形态</div>
    <d-radio-group v-model="selectedVariant" direction="row">
      <d-radio v-for="item in variantList" :key="item.value" :value="item.value">{{ item.label }}</d-radio>
    </d-radio-group>
  </div>
  <div style="display: flex; margin-bottom: 10px; align-items: center;">
    <div style="margin-right: 10px;">自动换行</div>
    <d-switch v-model="autoWrap" size="sm"></d-switch>
  </div>
  <McList :data="options" :selectable="false" :autoWrap="autoWrap" direction="horizontal" :variant="selectedVariant"></McList>
</template>

<script setup>
import { defineComponent, ref } from 'vue';

const selectedVariant = ref('bordered');
const autoWrap = ref(true);
const variantList = ref([
  { label: '填充', value: 'filled' },
  { label: '边框', value: 'bordered' },
]);
const options = ref(new Array(10).fill(0).map((item, i) => ({ label: `Option ${i + 1}`, value: i + 1 })));
</script>
```

:::

### 自定义

:::demo

```vue
<template>
  <h4>部分自定义</h4>
  <p>通过item插槽自定义选项的内容，悬浮高亮和圆角等样式仍由组件控制。</p>
  <McList :data="options">
    <template #item="{ item }"><i :class="item.icon" style="margin-right:4px;"></i>{{ item.label }}</template>
  </McList>

  <h4>完全自定义</h4>
  <p>通过item插槽自定义选项的内容，variant参数设置为none，悬浮高亮和圆角等样式也由用户自行控制。</p>
  <McList :data="options" variant="none">
    <template #item="{ item }">
      <div class="custom-list-item"><i :class="item.icon" style="margin-right:4px;"></i>{{ item.label }}</div>
    </template>
  </McList>
</template>

<script setup>
import { defineComponent, ref } from 'vue';

const options = ref([
  { label: `Option 1`, value: 1, icon: 'icon-information' },
  { label: `Option 2`, value: 2, icon: 'icon-inform' },
  { label: `Option 3`, value: 3, icon: 'icon-infrastructure' },
]);
</script>

<style scoped lang="scss">
.custom-list-item {
  line-height: 20px;
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: var(--devui-list-item-active-bg);
  }
}
</style>
```

:::

### 快捷键

一般用于下拉列表场景的连贯性操作。`enableShortKey`可设置是否启用快捷键，启用后可通过键盘的上下按键预选中选项，按回车健完成选择。启用快捷键后，可通过`inputEl`参数设置需要监听按键的元素，默认在`document`上监听按键事件。

:::demo

```vue
<template>
  <d-dropdown :visible="isOpen" trigger="manually" :position="['top-start']" @toggle="(e) => (isOpen = e)">
    <d-input
      ref="inputEl"
      v-model="inputValue"
      placeholder="点击后，可通过快捷键选中选项，并将选中项回显到这里"
      clearable
      @click="() => (isOpen = true)"
    ></d-input>
    <template #menu>
      <McList :data="options" enableShortKey :inputEl="inputEl" style="width:300px" @select="onSelect"></McList>
    </template>
  </d-dropdown>
</template>

<script setup>
import { defineComponent, ref } from 'vue';

const inputValue = ref('');
const inputEl = ref();
const isOpen = ref(false);
const options = ref(new Array(4).fill(0).map((item, i) => ({ label: `Option ${i + 1}`, value: i + 1 })));

const onSelect = (e) => {
  inputValue.value = e.label;
  isOpen.value = false;
};
</script>
```

:::


### 懒加载

`enableLazyLoad`可设置是否启用懒加载，当启用懒加载时滚动到接近底部时会触发`loadMore`事件。

组件默认设置列表最大高度为`300px`，用户可直接在组件标签上通过`style`或`class`的方式设置自定义样式。

:::demo

```vue
<template>
  <div v-loading="loading" :backdrop="true" position-type="relative" :view="{ top: '50%', left: '50%' }" :z-index="100">
    <McList :data="options" enableLazyLoad @loadMore="onLoadMore" style="height:400px"></McList>
  </div>
</template>

<script setup>
import { defineComponent, ref } from 'vue';

const options = ref(new Array(10).fill(0).map((item, i) => ({ label: `Option ${i + 1}`, value: i + 1 })));
const loading = ref(false);
const total = 30;
const onLoadMore = () => {
  if (loading.value || options.value.length >= total) {
    return;
  }
  loading.value = true;
  setTimeout(() => {
    const newData = new Array(10).fill(0).map((item, i) => ({
      label: `Option ${options.value.length + i}`,
      value: options.value.length + i,
    }));
    options.value.push(...newData);
    loading.value = false;
  }, 1500);
};
</script>
```

:::