---
title: Attachment 附件
desc: 用于上传和管理文件附件的组件，支持拖拽、自定义上传行为等。
---

按需引入路径：

```ts
import { AttachmentModule } from "@matechat/ng";
```

`McAttachment` 组件专注于提供文件上传功能。它最核心的用法是与 `McInput` 和 `McFileList` 组合，构建一个功能完备的对话输入框。

### 基本用法

通过 `upload-options` 配置上传地址，并通过 `accept` 和 `size` 属性来启用组件内置的文件类型和大小校验。

<mc-ng-attachment-basic></mc-ng-attachment-basic>

### 拖拽上传

`draggable` 属性（默认为 `true`）支持拖拽上传。下面的示例同样配置了图片和大小的限制。

<mc-ng-attachment-drag></mc-ng-attachment-drag>

### 自定义上传前校验

除了使用组件内置的 `accept` 和 `size` 校验，你还可以通过 `before-upload` 钩子添加额外的自定义校验逻辑。

<mc-ng-attachment-valid></mc-ng-attachment-valid>
