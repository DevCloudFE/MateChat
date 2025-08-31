---
title: FileList API
desc: FileList 组件的详细 API 文档。
---

## FileList Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `fileItems` | 文件列表的数据源，数组中的每个对象都应遵循 `FileItem` 接口。 | `FileItem[]` | `[]` |
| `context` | 组件的上下文，决定其外观和行为。<br/>- `input`: 用于输入框场景，会显示删除按钮。<br/>- `dialog`: 用于对话记录场景，外观更简洁。 | `'input' \| 'dialog'` | `'input'` |

## FileList Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `remove` | 当 `context` 为 `input` 时，点击文件项的删除按钮时触发。 | `(file: FileItem) => void` |
| `preview` | 点击文件图标或图片缩略图时触发。组件内置了常见文件类型的预览功能。 | `(file: FileItem) => void` |
| `download` | 点击“下载”按钮时触发，需要父组件监听此事件并实现下载逻辑。 | `(file: FileItem, event: Event) => void` |
| `retry-upload` | 当文件 `status` 为 `uploadError` 时，点击“重试”按钮时触发。 | `(file: FileItem) => void` |
| `retry-download` | 当文件 `status` 为 `downloadError` 时，点击“重试”按钮时触发。 | `(file: FileItem) => void` |

## FileItem 接口

`file-items` 数组中的每个对象都必须遵循 `FileItem` 接口。该对象的属性直接控制文件卡片的显示状态和行为。

```typescript
// 核心文件状态定义
export type FileStatus =
  | 'uploading'
  | 'downloading'
  | 'success'
  | 'uploadError'
  | 'downloadError';

// 文件对象接口定义
export interface FileItem<T = unknown, E = unknown> {
  // 必需属性
  uid: number;
  name: string;
  size: number;
  type: string;

  // 状态与进度
  status?: FileStatus;
  percentage?: number;
  error?: E;

  // URL 相关
  url?: string;
  thumbUrl?: string;

  // 服务端相关
  id?: string | number;
  response?: T;
}
```

### FileItem 属性详解

| 属性 | 说明 | 类型 | 是否必需 |
| --- | --- | --- | --- |
| `uid` | 文件的唯一标识符，在列表中必须是唯一的。 | `number` | **是** |
| `name` | 文件名，将显示在卡片上。 | `string` | **是** |
| `size` | 文件大小，单位为字节 (bytes)。组件会自动格式化为 KB, MB 等。 | `number` | **是** |
| `type` | 文件的 [MIME 类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)，用于决定文件图标和预览行为。 | `string` | **是** |
| `status` | **核心状态**，控制卡片的 UI 显示。<br/>- `uploading`: 显示上传进度环。<br/>- `downloading`: 显示下载进度环。<br/>- `success`: 成功状态，显示文件类型和大小。<br/>- `uploadError`: 显示上传失败状态和重试按钮。<br/>- `downloadError`: 显示下载失败状态和重试按钮。 | `FileStatus` | 否 |
| `percentage` | 当 `status` 为 `uploading` 或 `downloading` 时，表示当前的进度百分比 (0-100)。 | `number` | 否 |
| `error` | 当 `status` 为 `uploadError` 或 `downloadError` 时，存放具体的错误信息。 | `any` | 否 |
| `url` | 文件的完整可访问 URL。用于文件预览和下载。 | `string` | 否 |
| `thumbUrl` | 缩略图的 URL。如果提供了此项且文件为图片，将优先使用此 URL 在列表中展示缩略图。 | `string` | 否 |
| `id` | 文件在服务器端的唯一 ID。 | `string \| number` | 否 |
| `response` | 上传成功后，从服务器接收到的响应体。 | `any` | 否 |