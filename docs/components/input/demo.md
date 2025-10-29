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

### 自动调整高度

通过 `autosize` 属性让文本域自动调整高度，支持布尔值和配置对象两种形式。

- 设置为 `true`：使用默认配置（最小1行，最大5行）
- 设置为对象：可自定义最小和最大行数，如 `{ minRows: 2, maxRows: 10 }`

:::demo

```vue
<template>
  <div class="autosize-demo">
    <h4>默认自动调整（最小1行，最大5行）</h4>
    <McInput
      :value="inputValue1"
      autosize
      placeholder="输入多行文本查看自动调整效果..."
      @change="onChange1"
    />

    <h4>自定义行数范围（最小2行，最大10行）</h4>
    <McInput
      :value="inputValue2"
      :autosize="{ minRows: 2, maxRows: 10 }"
      placeholder="输入多行文本查看自定义行数效果..."
      @change="onChange2"
    />

    <h4>禁用自动调整</h4>
    <McInput
      :value="inputValue3"
      :autosize="false"
      placeholder="固定高度的文本域"
      @change="onChange3"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const inputValue1 = ref('');
const inputValue2 = ref('');
const inputValue3 = ref('');

const onChange1 = (e) => {
  inputValue1.value = e;
};

const onChange2 = (e) => {
  inputValue2.value = e;
};

const onChange3 = (e) => {
  inputValue3.value = e;
};
</script>

<style scoped lang="scss">
.autosize-demo {
  h4 {
    margin: 20px 0 10px;
    color: var(--devui-text);
    font-size: 14px;
  }
}
</style>
```

:::

### 自动聚焦

通过 `autofocus` 属性设置输入框在组件挂载后自动获得焦点，默认为 `false`。当输入框被禁用时，自动聚焦不会生效。

:::demo

```vue
<template>
  <McInput :value="inputValue" autofocus :loading="loading" @change="onInputChange" @submit="onSubmit" @cancel="onCancel">
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
</script>
```

:::

### 提交时不自动清空输入

通过 `autoClear` 属性设置输入框在提交后是否自动清空内容，默认为 `true`。
可以通过 `clearInput` 方法手动清空输入框内容。

:::demo

```vue
<template>
  <McInput ref="mcInputRef" :value="inputValue" :autoClear="false" :loading="loading" @submit="onSubmit" @cancel="onCancel">
  </McInput>
</template>

<script setup>
import { defineComponent, ref } from 'vue';

const mcInputRef = ref();
const inputValue = ref('');
const loading = ref(false);

const onSubmit = (e) => {
  loading.value = true;
  setTimeout(() => {
    // 发送成功后手动清空输入框内容
    mcInputRef.value.clearInput();
    loading.value = false;
  }, 1000);
  console.log('input submit---', e);
};
const onCancel = () => {
  loading.value = false;
  console.log('input cancel');
};
</script>
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
