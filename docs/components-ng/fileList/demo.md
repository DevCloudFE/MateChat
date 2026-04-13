---
title: FileList 文件列表
desc: 用于展示和管理文件列表，支持预览、下载、删除等交互操作。
---

按需引入路径：

```ts
import { McFileListModule } from '@matechat/ng';
```

### 基本用法

`McFileList` 组件的核心功能是接收一个文件对象数组，并将它们渲染为信息卡片。通过 `fileItems` 属性传入数据，并可使用 `context` 属性控制其在不同场景下的外观。

卡片信息展示示例：

<mc-ng-filelist-basic></mc-ng-filelist-basic>

### 不同上下文与状态

`McFileList` 提供了两种上下文模式和多种文件状态，以适应不同业务场景。

- `input`: 通常用于文件上传选择器下方，每个文件项右上角会显示删除按钮。
- `dialog`: 通常用于对话历史记录中展示已发送的文件，外观更简洁。

<mc-ng-filelist-context></mc-ng-filelist-context>

### 事件处理与交互

`McFileList` 通过触发事件来响应用户交互，允许你轻松实现自定义逻辑。

-   **`@remove`**: 在 `context="input"` 模式下，点击删除按钮时触发。
-   **`@preview`**: 点击可预览文件时触发。
-   **`@download`**: 点击下载按钮时触发。
-   **`@retryUpload`**: 点击上传失败文件的“重试”按钮时触发。
-   **`@retryDownload`**: 点击下载失败文件的“重试”按钮时触发。

<mc-ng-filelist-interactive></mc-ng-filelist-interactive>