---
title: FileList 文件列表
desc: 用于展示和管理文件列表，支持下载、删除等交互操作。
---

## FileList Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `list` / `v-model:list` | 文件列表，支持 `v-model` 双向绑定 | `FileItem[]` | `[]` |
| `download-options` | 下载配置，可传入自定义的下载处理器 `handler` | `DownloadOptions` | `{}` |

## FileList Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `download` | 点击下载按钮时触发 | `(file: FileItem) => void` |
| `delete` | 点击删除按钮时触发 | `(file: FileItem) => void` |

## FileItem 接口

组件列表中的每个文件对象都遵循 `FileItem` 接口。

```typescript
interface FileItem {
  uid: number;
  name: string;
  size?: number;
  status?: 'uploading' | 'success' | 'error' | 'downloading';
  statusText?: string;
  percentage?: number;
  url?: string;
  raw?: File;
}
```

## DownloadOptions 接口

用于配置下载行为。

```typescript
type DownloadHandler = (file: FileItem, callbacks: DownloadCallbacks) => void;

interface DownloadOptions {
  handler: DownloadHandler;
}

interface DownloadCallbacks {
  onProgress: (e: { percent: number }) => void;
  onSuccess: () => void;
  onError: (err: Error) => void;
}
```
