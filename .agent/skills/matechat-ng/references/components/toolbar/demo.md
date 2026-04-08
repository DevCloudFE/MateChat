---
title: Toolbar 工具栏
desc: 快速配置点赞等操作按钮/功能
bannerSrc: "/textareaBanner.png"
iconSrc: "/textareaIcon.png"
---

按需引入路径：

```ts
import { McToolbar } from '@matechat/ng';
```

### 基本用法

通过配置 `items` 参数实现工具栏的快速搭建。

<mc-ng-toolbar-basic></mc-ng-toolbar-basic>


### 按钮大小和间隔

可以通过 `iconSize` 和 `gap` 定义图标大小和图标间隔。

<mc-ng-toolbar-size></mc-ng-toolbar-size>

### 自定义图标或操作项

通过设置插槽实现自定义图标区域和或操作项区域

<mc-ng-toolbar-slot></mc-ng-toolbar-slot>

### 直接使用内置图标组件

复制等操作项可直接作为组件使用，可通过设置style的color样式改变图标颜色。单独使用图标组件情况下，点赞点踩没有联动效果，需要手动控制。

<mc-ng-toolbar-use-icon></mc-ng-toolbar-use-icon>