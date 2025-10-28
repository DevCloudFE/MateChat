---
title: Attachment 附件
desc: 用于上传和管理文件附件的组件，支持拖拽、自定义上传行为等。
---

### 参数

| 参数名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `v-model` | `FileItem[]` | - | 双向绑定的文件列表。 |
| `upload-options` | `UploadOptions` | `{}` | **核心上传配置**，包含上传地址 `uri`、请求方法、请求头等。详见下文 `UploadOptions` 类型定义。 |
| `disabled` | `boolean` | `false` | 是否禁用上传功能。 |
| `accept` | `string` | `''` | 接受上传的文件类型，与原生 `input` 标签的 `accept` 属性相同。例如：`'image/*, .pdf'`。 |
| `maxCount` | `number` | `Infinity` | 允许上传的最大文件数量。 |
| `maxSize` | `number` | `Infinity` | 允许上传的单个文件最大尺寸，单位为 **MB**。 |
| `multiple` | `boolean` | `true` | 是否支持多选文件。 |
| `draggable` | `boolean` | `true` | 是否支持拖拽上传。 |
| `before-upload` | `(file: File) => boolean \| Promise<boolean>` | `null` | 上传文件之前的钩子，参数为上传的文件。若返回 `false` 或返回一个被 `reject` 的 `Promise`，则停止上传。 |

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `change` | 文件状态改变时触发，主要在文件被选择后。 | `(file: File, fileList: FileItem[]) => void` |
| `success` | 文件上传成功时触发。 | `(file: File, response: any, fileList: FileItem[]) => void` |
| `error` | 文件上传失败时触发。 | `(file: File, error: any, fileList: FileItem[]) => void` |
| `progress` | 文件上传时触发。 | `(file: File, fileList: FileItem[]) => void` |
| `drop` | 文件被拖拽到可拖拽区域时触发。 | `(files: File[]) => void` |

### 插槽
| 插槽名 | 说明 |
| --- | --- |
| `default` | 自定义上传附件按钮样式 |

### 类型定义

#### UploadOptions

`upload-options` 属性接收一个遵循 `UploadOptions` 接口的对象，用于配置组件内置的 `XMLHttpRequest` 上传行为。

```ts
export interface UploadOptions {
  uri: string | URL;
  method?: 'POST' | 'PUT' | 'PATCH';
  headers?: { [key: string]: string };
  authToken?: string;
  authTokenHeader?: string;
  additionalParameter?: { [key:string]: string | Blob };
  fileFieldName?: string;
  withCredentials?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
}
```

| 属性 | 类型 | 是否必需 | 说明 |
| --- | --- | --- | --- |
| `uri` | `string \| URL` | **是** | 上传接口的服务器地址。 |
| `method` | `'POST' \| 'PUT' \| 'PATCH'` | 否 | HTTP 请求方法，默认为 `'POST'`。 |
| `headers` | `object` | 否 | 自定义 HTTP 请求头。 |
| `authToken` | `string` | 否 | 用于身份验证的 Token。 |
| `authTokenHeader` | `string` | 否 | 承载 `authToken` 的请求头字段名，默认为 `'Authorization'`。 |
| `additionalParameter` | `object` | 否 | 随文件一同上传的额外参数，将被添加到 `FormData` 中。 |
| `fileFieldName` | `string` | 否 | 上传文件时，在 `FormData` 中使用的字段名，默认为 `'file'`。 |
| `withCredentials` | `boolean` | 否 | 是否在跨域请求中发送凭证（如 Cookies），默认为 `false`。 |
| `responseType` | `'arraybuffer' \| 'blob' \| 'json' \| 'text'` | 否 | 手动设置期望的服务器响应类型。 |

#### FileItem

`v-model` 绑定的数组中的每个对象都必须遵循 `FileItem` 接口。

```ts
export interface FileItem<T = unknown, E = unknown> {
  uid: number;
  name: string;
  size: number;
  type?: string;
  status?: FileStatus;
  percentage?: number;
  id?: string | number;
  response?: T;
  error?: E;
  thumbUrl?: string;
  url?: string;
}
```

