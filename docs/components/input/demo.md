---
title: Input 输入
desc: 用于对话的输入框组件
bannerSrc: '/inputBanner.png'
iconSrc: '/inputIcon.png'
---

按需引入路径：

```ts
import { McInput } from '@matechat/core';
```

### 基本用法
绑定 `value` 等基本参数进行使用。

:::demo

```vue
<template>
  <McInput :value="inputValue" :maxLength="2000" :loading="loading" showCount @change="onInputChange" @submit="onSubmit" @cancel="onCancel">
  </McInput>
</template>

<script setup>
import { defineComponent, ref } from 'vue';

const inputValue = ref('');
const loading = ref(false);

const onInputChange = (e) => {
  console.log('input change---', e);
};
const onSubmit = (e) => {
  loading.value = true;
  console.log('input submit---', e);
};
const onCancel = () => {
  loading.value = false;
  console.log('input cancel');
};
</script>
```

:::

### 展示形态

通过`displayType`参数设置展示形态，支持的值为`full`和`simple`，默认为`full`。

`full`形态，prefix 插槽和输入框在同一行，extra 插槽和发送按钮在下方。

`simple`形态，prefix 插槽、输入框和发送按钮在同一行，不支持 extra 插槽。

`variant`参数设置为`borderless`，可设置不带边框。

通过`sendBtnVariant`参数控制发送按钮的形态，支持的值为`full`和`simple`，默认为`full`。

:::demo

```vue
<template>
  <McInput :value="inputValue" displayType="simple" :loading="loading" sendBtnVariant="simple" variant="borderless" @submit="onSubmit">
    <template #suffix>
      <div class="input-prefix-wrap">
        <i class="icon-appendix"></i>
      </div>
    </template>
  </McInput>
</template>

<script setup>
import { defineComponent, ref } from 'vue';

const inputValue = ref('');
const loading = ref(false);

const onSubmit = (e) => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 1000);
  console.log('input submit---', e);
};
</script>

<style scoped lang="scss">
.input-prefix-wrap {
  height: 32px;
  line-height: 32px;
  margin-right: 8px;
  cursor: pointer;
}
</style>
```

:::

### 提交模式

通过`submitShortKey`设置提交快捷键，支持的值为`enter`和`shiftEnter`，默认为`enter`。

当提交快捷键为`enter`时，换行快捷键为`shift+enter`；当提交快捷键为`shift+enter`时，换行快捷键为`enter`。

:::demo

```vue
<template>
  <McInput :value="inputValue" :loading="loading" submitShortKey="shiftEnter" @submit="onSubmit"> </McInput>
</template>

<script setup>
import { defineComponent, ref } from 'vue';

const inputValue = ref('');
const loading = ref(false);

const onSubmit = (e) => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 1000);
  console.log('input submit---', e);
};
</script>
```

:::

### 自定义发送按钮

通过`button`插槽自定义发送按钮，实现按钮 disable、loading 等状态和按钮图标、按钮文案的自定义。

:::demo

```vue
<template>
  <McInput :value="inputValue" :maxLength="2000" :loading="loading" showCount @change="onInputChange" @submit="onSubmit" @cancel="onCancel">
    <template #button>
      <div
        class="my-button"
        :class="{ 'disabled': !loading && !inputValue}"
        @click="onConfirm"
      >
        <span class="mc-button-content">
          <!-- 此处可自定义图标及其文案 -->
          <span>{{ loading ? '停止' : '发送' }}</span>
        </span>
      </div>
    </template>
  </McInput>
</template>

<script setup>
import { defineComponent, ref } from 'vue';

const inputValue = ref('');
const loading = ref(false);

const onInputChange = (e) => {
  inputValue.value = e;
  console.log('input change---', e);
};
const onSubmit = (e) => {
  loading.value = true;
  inputValue.value = '';
  setTimeout(() => {
    loading.value = false;
  }, 1000);
  console.log('input submit---', e);
};
const onCancel = () => {
  loading.value = false;
  console.log('input cancel');
};

const onConfirm = () => {
   if(loading.value) {
    onCancel();
   } else {
    onSubmit();
   }
}
</script>

<style scoped lang="scss">
.my-button {
  display: flex;
  align-items: center;
  height: 32px;
  background: #5e7ce0;
  padding: 0 16px;
  border-radius: 20px;
  color: #fff;
}

.disabled {
  background: #beccfa;
}
</style>
```

:::

### 自定义插槽

通过`head`插槽自定义输入框顶部的内容，通过`extra`自定义发送按钮左侧的内容。

:::demo

```vue
<template>
  <McInput :value="inputValue" :loading="loading" @submit="onSubmit">
    <template #head>
      <div class="appendix-wrap">
        <div class="appendix-item">
          <span>README.md</span>
          <i class="icon-code-editor-close"></i>
        </div>
      </div>
    </template>
    <template #extra>
      <div class="input-foot-left">
        <span><i class="icon-at"></i>智能体</span>
        <span><i class="icon-appendix"></i>附件</span>
      </div>
    </template>
  </McInput>
</template>

<script setup>
import { defineComponent, ref } from 'vue';

const inputValue = ref('');
const loading = ref(false);

const onSubmit = (e) => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 1000);
  console.log('input submit---', e);
};
</script>

<style scoped lang="scss">
.input-foot-left {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--devui-font-size-sm);
  color: var(--devui-text);

  i {
    margin-right: 4px;
  }
}

.appendix-wrap {
  display: flex;
  padding: 4px 16px;

  .appendix-item {
    padding: 4px 8px;
    border-radius: var(--devui-border-radius);
    background-color: var(--devui-area);

    i {
      margin-left: 4px;
      cursor: pointer;
    }
  }
}
</style>
```

:::
