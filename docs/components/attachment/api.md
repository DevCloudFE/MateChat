---
title: Attachment 附件
desc: 用于上传和管理文件附件的组件，支持拖拽、自定义上传行为等。
---

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `v-model` | `FileItem[]` | `[]` | **必须**。绑定的文件列表。 |
| `uploadOptions` | `UploadOptions` | `{}` | **必须**。上传配置，至少包含 `uri`。 |
| `disabled` | `boolean` | `false` | 是否禁用组件。 |
| `accept` | `string` | `'*/*'` | 允许上传的文件类型。 |
| `limit` | `number` | `Infinity` | 允许上传的最大文件数量。 |
| `size` | `number` | `Infinity` | 限制单个文件的最大尺寸（单位：MB）。 |
| `multiple` | `boolean` | `true` | 是否允许同时选择多个文件。 |
| `draggable` | `boolean` | `true` | 是否开启拖拽上传功能。 |
| `placeholder` | `string` | `'请选择文件'` | 组件区域的提示文字。 |
| `beforeUpload` | `(file: File) => boolean \| Promise<boolean>` | `null` | 上传前的钩子函数，返回 `false` 可中止上传。 |

### Events

| 事件名 | 参数 | 说明 |
| :--- | :--- | :--- |
| `change` | `(file: File, fileList: FileItem[])` | 文件状态改变时触发（添加文件后）。 |
| `success` | `(file: File, response: any, fileList: FileItem[])` | 文件上传成功时触发。 |
| `error` | `(file: File, error: any, fileList: FileItem[])` | 文件上传失败时触发。 |
| `progress` | `(file: File, fileList: FileItem[])` | 文件上传中（进度更新）时触发。 |
| `drop` | `(files: File[])` | 文件被拖拽到放置区域时触发。 |

### Slots

| 名称 | 说明 |
| :--- | :--- |
| `default` | 自定义触发上传的区域内容。 |

### `UploadOptions` 接口

```typescript
interface UploadOptions {
  uri: string | URL; // 上传接口地址
  method?: 'POST' | 'PUT' | 'PATCH'; // 请求方法
  headers?: { [key: string]: string }; // 自定义请求头
  authToken?: string; // 认证 token
  authTokenHeader?: string; // 认证 token 的 Header 字段名
  additionalParameter?: { [key: string]: string | Blob }; // 额外参数
  fileFieldName?: string; // 文件字段名，默认 'file'
  withCredentials?: boolean; // 是否携带 cookies
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text'; // 响应类型
}
```
