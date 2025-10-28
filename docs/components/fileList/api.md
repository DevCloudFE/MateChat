---
title: FileList 文件列表
desc: 用于展示和管理文件列表，支持预览、下载、删除等交互操作。
---

### 参数

| 参数名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `file-items` | `FileItem[]` | `[]` | 文件列表的数据源，数组中的每个对象都应遵循 `FileItem` 接口。 |
| `context` | `'input' \| 'dialog'` | `''` | 组件的上下文，决定其外观和行为。<br/>- `input`: 用于输入框场景，会显示删除按钮。<br/>- `dialog`: 用于对话记录场景，外观更简洁。 |

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `remove` | 当 `context` 为 `input` 时，点击文件项的删除按钮时触发。 | `(file: FileItem) => void` |
| `preview` | 点击文件图标或图片缩略图时触发。组件内置了常见文件类型的预览功能。 | `(file: FileItem) => void` |
| `download` | 点击“下载”按钮时触发，需要父组件监听此事件并实现下载逻辑。 | `(file: FileItem, event: Event) => void` |
| `retry-upload` | 当文件 `status` 为 `uploadError` 时，点击“重试”按钮时触发。 | `(file: FileItem) => void` |
| `retry-download` | 当文件 `status` 为 `downloadError` 时，点击“重试”按钮时触发。 | `(file: FileItem) => void` |

### 类型定义

#### FileStatus

```ts
export type FileStatus =
  | 'uploading'
  | 'downloading'
  | 'success'
  | 'uploadError'
  | 'downloadError';
```

#### FileItem

`file-items` 数组中的每个对象都必须遵循 `FileItem` 接口。该对象的属性直接控制文件卡片的显示状态和行为。

```ts
export interface FileItem<T = unknown, E = unknown> {
  // 必需属性
  uid: number;
  name: string;
  size: number;
  // 可选属性，若不提供，组件会尝试根据文件名后缀推断类型
  type?: string;

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

| 属性 | 类型 | 是否必需 | 说明 |
| --- | --- | --- | --- |
| `uid` | `number` | **是** | 文件的唯一标识符，在列表中必须是唯一的。 |
| `name` | `string` | **是** | 文件名，将显示在卡片上。 |
| `size` | `number` | **是** | 文件大小，单位为字节 (bytes)。组件会自动格式化为 KB, MB 等。 |
| `type` | `string` | 否 | 文件的 [MIME 类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)，用于决定文件图标和预览行为。 |
| `status` | `FileStatus` | 否 | **核心状态**，控制卡片的 UI 显示。<br/>- `uploading`: 显示上传进度环。<br/>- `downloading`: 显示下载进度环。<br/>- `success`: 成功状态，显示文件类型和大小。<br/>- `uploadError`: 显示上传失败状态和重试按钮。<br/>- `downloadError`: 显示下载失败状态和重试按钮。 |
| `percentage` | `number` | 否 | 当 `status` 为 `uploading` 或 `downloading` 时，表示当前的进度百分比 (0-100)。 |
| `error` | `any` | 否 | 当 `status` 为 `uploadError` 或 `downloadError` 时，存放具体的错误信息。 |
| `url` | `string` | 否 | 文件的完整可访问 URL。用于文件预览和下载。 |
| `thumbUrl` | `string` | 否 | 缩略图的 URL。如果提供了此项且文件为图片，将优先使用此 URL 在列表中展示缩略图。 |
| `id` | `string \| number` | 否 | 文件在服务器端的唯一 ID。 |
| `response` | `any` | 否 | 上传成功后，从服务器接收到的响应体