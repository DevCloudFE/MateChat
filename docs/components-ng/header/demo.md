---
title: Header 头部
desc: 用于在头部展示logo、标题等内容的组件
bannerSrc: '/headerBanner.png'
iconSrc: '/headerIcon.png'
---

按需引入路径：

```ts
import { McHeader } from '@matechat/ng';
```

### 基本用法
用于呈现头部 `logo` 与 `title` 信息。

<mc-ng-header-basic></mc-ng-header-basic>

### Logo 区域可点击
设置 `Logo` 可进行点击，对点击事件进行监听。

<mc-ng-header-logo-click></mc-ng-header-logo-click>

### 自定义右侧操作区域
通过 `slot` 进行右侧操作区域自定义，可用于定义头部工具栏等。

<mc-ng-header-custom-operation></mc-ng-header-custom-operation>
