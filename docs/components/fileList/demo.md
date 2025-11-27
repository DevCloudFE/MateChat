---
title: FileList 文件列表
desc: 用于展示和管理文件列表，支持预览、下载、删除等交互操作。
---

按需引入路径：

```ts
import { McFileList } from '@matechat/core';
```

### 基本用法

`McFileList` 组件的核心功能是接收一个文件对象数组，并将它们渲染为信息卡片。通过 `fileItems` 属性传入数据，并可使用 `context` 属性控制其在不同场景下的外观。

卡片信息展示示例：

:::demo

```vue
<template>
  <McFileList :fileItems="allTypesList" @remove="handleRemove" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const allTypesList = ref([
  { uid: 1, name: '年度报告.docx', size: 1024 * 24, type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'},
  { uid: 2, name: '设计规范.pdf', size: 1024 * 512, type: 'application/pdf'},
  { uid: 3, name: '财务报表.xlsx', size: 1024 * 128, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'},
  { uid: 4, name: '产品演示.pptx', size: 1024 * 1024 * 3, type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'},
  { uid: 5, name: '夏季海报.png', size: 1024 * 800, type: 'image/png'},
  { uid: 6, name: '宣传视频.mp4', size: 1024 * 1024 * 12, type: 'video/mp4' },
  { uid: 7, name: '项目源码.zip', size: 1024 * 1024 * 5, type: 'application/zip' },
  { uid: 8, name: '开发文档.md', size: 1024 * 15, type: 'text/markdown' },
  { uid: 9, name: '核心工具函数.js', size: 1024 * 5, type: 'application/javascript' },
  { uid: 10, name: '会议脑图.xmind', size: 1024 * 256, type: 'application/octet-stream' },
  { uid: 11, name: '邮件附件.eml', size: 1024 * 10, type: 'message/rfc822' }, // 邮件
  { uid: 12, name: '纯文本.txt', size: 1024 * 2, type: 'text/plain' }, // txt
  { uid: 13, name: '页面设计.page', size: 1024 * 20, type: 'application/octet-stream' }, // page
  { uid: 14, name: '未知文件.dat', size: 1024 * 100, type: 'application/octet-stream' }, // 未知类型
]);

const handleRemove = (file) => {
  // 实际项目中，这里会调用 API，成功后再从列表中移除
  allTypesList.value = allTypesList.value.filter(item => item.uid !== file.uid);
};
</script>
```
:::

### 不同上下文与状态

`McFileList` 提供了两种上下文模式和多种文件状态，以适应不同业务场景。

- `input`: 通常用于文件上传选择器下方，每个文件项右上角会显示删除按钮。
- `dialog`: 通常用于对话历史记录中展示已发送的文件，外观更简洁。

:::demo

```vue
<template>
  <h4 style="margin-bottom: 20px;">输入框上下文</h4>
  <McInput v-model="inputValue" placeholder="这是一个带有文件列表的输入框...">
    <template #head>
      <McFileList 
        :fileItems="inputList" 
        context="input" 
        @remove="handleRemove" 
        @retry-upload="handleRetryUpload" 
      />
    </template>
  </McInput>

  <h4 style="margin: 20px 0;">对话框上下文</h4>
  <McBubble :avatarConfig="userAvatar" :align="'right'">
    <div>上传的文件，包含了多种状态：</div>
    <McFileList :fileItems="dialogList" context="dialog" />
  </McBubble>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const inputValue = ref('');

const userAvatar = {
  imgSrc: '/png/demo/userAvatar.svg',
};

// 用于 Input 上下文的列表
const inputList = ref([
  { uid: 101, name: '用户手册.pdf', size: 1024 * 1024 * 2, type: 'application/pdf', status: 'success' },
  { uid: 102, name: '功能演示.mp4', size: 1024 * 1024 * 15, type: 'video/mp4', status: 'uploading', percentage: 66 },
  { uid: 103, name: '错误日志.log', size: 1024 * 5, type: 'text/plain', status: 'uploadError', error: '上传中断' },
]);

// 用于 Dialog 上下文的列表
const dialogList = ref([
  { uid: 201, name: '用户手册.pdf', size: 1024 * 1024 * 2, type: 'application/pdf', status: 'success' },
  { uid: 202, name: '界面设计稿.png', size: 1024 * 345, type: 'image/png', status: 'success' },
  { uid: 203, name: '项目依赖.zip', size: 1024 * 1024 * 8, type: 'application/zip', status: 'success' },
]);

const handleRemove = (file) => {
  inputList.value = inputList.value.filter(item => item.uid !== file.uid);
};

const handleRetryUpload = (file) => {
  const targetFile = inputList.value.find(item => item.uid === file.uid);
  if (targetFile) {
    targetFile.status = 'uploading';
    targetFile.percentage = 0;
  }
};

// 关键：在组件挂载后，直接修改传入的 props 数据来模拟状态
onMounted(() => {
  // 1. 模拟“下载中”状态
  const downloadingFile = dialogList.value.find(file => file.uid === 202);
  if (downloadingFile) {
    downloadingFile.status = 'downloading';
    downloadingFile.percentage = 45;
  }

  // 2. 模拟“下载失败”状态
  const failedFile = dialogList.value.find(file => file.uid === 203);
  if (failedFile) {
    failedFile.status = 'downloadError';
    failedFile.error = '下载链接已失效';
  }
});
</script>
```
:::


### 事件处理与交互

`McFileList` 通过触发事件来响应用户交互，允许你轻松实现自定义逻辑。

-   **`@remove`**: 在 `context="input"` 模式下，点击删除按钮时触发。
-   **`@preview`**: 点击可预览文件时触发。
-   **`@download`**: 点击下载按钮时触发。
-   **`@retry-upload`**: 点击上传失败文件的“重试”按钮时触发。
-   **`@retry-download`**: 点击下载失败文件的“重试”按钮时触发。

:::demo

```vue
<template>
  <p>点击下方文件卡片上的各种按钮，在控制台查看事件触发信息。</p>
  <McFileList 
    :fileItems="interactiveList" 
    context="input"
    @remove="handleRemove"
    @preview="handlePreview"
    @download="handleDownload"
    @retry-upload="handleRetryUpload"
    @retry-download="handleRetryDownload"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const interactiveList = ref([
  { uid: 301, name: '可预览和下载的图片.jpg', size: 1024 * 450, type: 'image/jpeg', status: 'success', url: '/example1.png' },
  { uid: 302, name: '上传失败的文件.pdf', size: 1024 * 1024, type: 'application/pdf', status: 'uploadError', error: '上传中断' },
  { uid: 303, name: '下载失败的文件.zip', size: 1024 * 1024 * 5, type: 'application/zip', status: 'downloadError', error: '下载链接已失效' },
]);

const downloadIntervals = new Map();

// 模拟下载逻辑
const simulateDownload = (file) => {
  if (downloadIntervals.has(file.uid)) return;

  file.status = 'downloading';
  file.percentage = 0;

  const intervalId = setInterval(() => {
    if (file.percentage < 100) {
      file.percentage += 20;
    } else {
      clearInterval(intervalId);
      downloadIntervals.delete(file.uid);
      file.status = 'success'; // 模拟下载成功
      // 可以在这里真正触发 a 标签下载
      if (file.url) {
        const link = document.createElement('a');
        link.href = file.url;
        link.download = file.name;
        link.click();
      }
    }
  }, 200);
  downloadIntervals.set(file.uid, intervalId);
};

const handleDownload = (file, event: Event) => {
  console.log(`[Event:download] 触发下载: ${file.name}`);
  // 父组件现在负责更新状态
  simulateDownload(file);
};

const handleRetryDownload = (file) => {
  console.log(`[Event:retry-download] 触发重试下载: ${file.name}`);
  // 父组件现在负责更新状态
  simulateDownload(file);
};

const handleRetryUpload = (file) => {
  console.log(`[Event:retry-upload] 触发重试上传: ${file.name}`);
  file.status = 'uploading';
  file.percentage = 0;
  // ... 此处应有真实上传逻辑
};

const handleRemove = (file) => {
  console.log(`[Event:remove] 触发删除: ${file.name}`);
  interactiveList.value = interactiveList.value.filter(item => item.uid !== file.uid);
};

const handlePreview = (file) => {
  console.log(`[Event:preview] 触发预览: ${file.name}`);
};
</script>
```