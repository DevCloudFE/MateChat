---
title: FileList 文件列表
desc: 用于展示和管理文件列表，支持下载、删除等交互操作。
---

按需引入路径：

```ts
import { McFileList } from '@matechat/core';
```

## 基础用法

`McFileList` 组件用于优雅地展示文件列表。通过 `files` 属性传入文件数组即可。

:::demo

```vue
<template>
  <McFileList :files="simpleList" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { McFileList } from '@matechat/core';
import type { FileItem } from '@matechat/core/Attachment';

const simpleList = ref<FileItem[]>([
  { uid: 1, name: 'project-plan.docx', size: 1024 * 24, status: 'success' },
  { uid: 2, name: 'design-draft.png', size: 1024 * 128, status: 'success' },
  { uid: 3, name: 'quarterly-report.pdf', size: 1024 * 512, status: 'success' },
]);
</script>
```
:::

## 交互式列表

通过监听 `@download` 和 `@delete` 事件，可以实现文件的下载和删除逻辑。
`download-options` 属性可以配置自定义的下载处理器，这里我们使用一个模拟函数来演示下载过程。

:::demo

```vue
<template>
  <McFileList
    v-model:list="interactiveList"
    :download-options="downloadOptions"
    @delete="handleDelete"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { McFileList } from '@matechat/core';
import type { FileItem, DownloadOptions, DownloadHandler } from '@matechat/core/FileList';

const interactiveList = ref<FileItem[]>([
  { uid: 1, name: 'user-guide.pdf', size: 1024 * 1024 * 2, status: 'success' },
  { uid: 2, name: 'feature-demo.mp4', size: 1024 * 1024 * 15, status: 'success' },
  { uid: 3, name: 'source-code.zip', size: 1024 * 1024 * 5, status: 'success' },
  { uid: 4, name: 'logo.svg', size: 1024 * 45, status: 'success' },
  { uid: 5, name: 'test-failed.log', size: 1024 * 5, status: 'error', statusText: '上传失败' },
]);

// 模拟下载处理器
const mockDownloadHandler: DownloadHandler = (file, callbacks) => {
  const { onProgress, onSuccess, onError } = callbacks;
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 25;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      onProgress({ percent: progress });
      // 模拟下载成功后创建并点击一个a标签
      const link = document.createElement('a');
      link.href = URL.createObjectURL(new Blob([`模拟文件内容: ${file.name}`]));
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
      onSuccess();
    } else {
      onProgress({ percent: progress });
    }
  }, 500);
};

const downloadOptions: DownloadOptions = {
  handler: mockDownloadHandler
};

const handleDelete = (file: FileItem) => {
  console.log('Delete:', file.name);
  // 这里可以调用API删除文件
  // 成功后从列表中移除
  interactiveList.value = interactiveList.value.filter(item => item.uid !== file.uid);
};
</script>
```
:::
