---
title: Attachment 附件
desc: 用于上传和管理文件附件的组件，支持拖拽、自定义上传行为等。
---

按需引入路径：

```ts
import { McAttachment } from '@matechat/core';
```

`McAttachment` 组件专注于提供强大的文件上传功能。它最核心的用法是与 `McInput` 和 `McFileList` 组合，构建一个功能完备的对话输入框。


### 基本用法

通过 `upload-options` 配置上传地址，并通过 `accept` 和 `size` 属性来启用组件内置的文件类型和大小校验。

:::demo

```vue
<template>
  <McInput v-model="inputValue" placeholder="点击左侧图标上传附件...">
    <!-- 1. 文件列表放置在 head 插槽 -->
    <template #head>
      <McFileList 
        v-if="fileList.length > 0"
        :file-items="fileList" 
        context="input"
        @remove="handleRemove"
        @retry-upload="handleRetryUpload"
      />
    </template>
    <!-- 2. 附件上传器放置在 extra 插槽 -->
    <template #extra>
      <div class="input-foot-left">
        <McAttachment 
          v-model="fileList" 
          :draggable="false"
          :upload-options="uploadOptions"
          accept="image/*"
          :max-size="0.5"
          @success="handleSuccess"
          @error="handleError"
        >
        </McAttachment>
      </div>
    </template>
  </McInput>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { FileItem, UploadOptions } from '@matechat/core/Attachment';

const inputValue = ref('');
const fileList = ref<FileItem[]>([]);

// 核心：配置上传参数
const uploadOptions = ref<UploadOptions>({
  uri: 'https://run.mocky.io/v3/132b3ea3-23ea-436b-aed4-c43ef9d116f0',
});

// 监听上传成功和失败事件
const handleSuccess = (file: File, response: any) => {
  console.log(`文件 ${file.name} 上传成功，响应:`, response);
};
const handleError = (file: File, error: any) => {
  console.error(`文件 ${file.name} 上传失败，错误:`, error);
};

// 处理文件列表的移除事件
const handleRemove = (file: FileItem) => {
  fileList.value = fileList.value.filter(item => item.uid !== file.uid);
};

// 处理文件列表的重试上传事件
const handleRetryUpload = (file: FileItem) => {
  const targetFile = fileList.value.find(item => item.uid === file.uid);
  if (targetFile) {
    targetFile.status = 'uploading';
    targetFile.percentage = 0;
  }
};
</script>

```
:::

### 拖拽上传

`draggable` 属性（默认为 `true`）支持拖拽上传。下面的示例同样配置了图片和大小的限制。

:::demo

```vue
<template>
  <McInput v-model="inputValue" placeholder="拖拽文件到页面，或点击左侧图标上传附件...">
    <!-- 1. 文件列表放置在 head 插槽 -->
    <template #head>
      <McFileList 
        v-if="dragFileList.length > 0"
        :file-items="dragFileList" 
        context="input"
        style="margin-top: 12px;"
        @remove="(file) => dragFileList = dragFileList.filter(f => f.uid !== file.uid)"
      />
    </template>
    <!-- 2. 附件上传器放置在 extra 插槽 -->
    <template #extra>
      <div class="input-foot-left">
        <McAttachment 
          v-model="dragFileList" 
          :upload-options="uploadOptions"
          accept="image/*"
          :max-size="0.5"
          multiple
        >
        </McAttachment>
      </div>
    </template>
  </McInput>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { FileItem, UploadOptions, McInput } from '@matechat/core/Attachment';

const dragFileList = ref<FileItem[]>([]);
const uploadOptions = ref<UploadOptions>({
  uri: 'https://run.mocky.io/v3/132b3ea3-23ea-436b-aed4-c43ef9d116f0',
});
</script>

```
:::

### 自定义上传前校验

除了使用组件内置的 `accept` 和 `size` 校验，你还可以通过 `before-upload` 钩子添加额外的自定义校验逻辑。

:::demo

```vue
<template>
  <McInput v-model="inputValue" placeholder="点击左侧图标上传附件...">
    <!-- 1. 文件列表放置在 head 插槽 -->
    <template #head>
      <McFileList 
        v-if="validatedList.length > 0"
        :file-items="validatedList" 
        context="input"
        style="margin-top: 12px;"
        @remove="(file) => validatedList = validatedList.filter(f => f.uid !== file.uid)"
      />
    </template>
    <!-- 2. 附件上传器放置在 extra 插槽 -->
    <template #extra>
      <div class="input-foot-left">
        <McAttachment 
          v-model="validatedList"
          :draggable="false"
          :upload-options="uploadOptions"
          :before-upload="handleBeforeUpload"
          accept="image/*"
          :max-size="0.5"
          multiple
        >
        </McAttachment>
      </div>
    </template>
  </McInput>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { FileItem, UploadOptions, McInput } from '@matechat/core/Attachment';

const validatedList = ref<FileItem[]>([]);
const uploadOptions = ref<UploadOptions>({
  uri: 'https://run.mocky.io/v3/132b3ea3-23ea-436b-aed4-c43ef9d116f0',
});

const handleBeforeUpload = (file: File) => {
  // 除了组件内置的 accept 和 size 校验，你还可以添加自定义的校验逻辑
  if (file.name.includes('test')) {
    return false;
  }
  return true;
};
</script>
```
:::