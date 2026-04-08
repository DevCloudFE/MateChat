---
title: Mention 快捷操作
desc: 用于根据输入内容进行快捷提示的组件
bannerSrc: '/mentionBanner.png'
iconSrc: '/mentionIcon.png'
---

按需引入路径：

```ts
import { MentionModule } from '@matechat/ng';
```

### 基本用法

通过`ngModel`控制组件的展开收起。

通过`prefix`传入触发组件显示的前缀符。

监听`searchChange`事件，获取触发组件显示的前缀符、前缀符的位置、光标位置等数据。

<mc-ng-mention-basic></mc-ng-mention-basic>

### 自定义样式

组件宽度默认和宿主宽度保持一致，将`fitHostWidth`参数设置为`false`，组件根据`menu`插槽的内容自适应宽度；通过`menuClass`可自定义组件的样式。

<mc-ng-mention-custom-style></mc-ng-mention-custom-style>
