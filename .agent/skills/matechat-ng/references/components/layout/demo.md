---
title: Layout 布局
desc: 用于对不同的模块进行排列布局
bannerSrc: '/layoutBanner.png'
iconSrc: '/layoutIcon.png'
---

按需引入路径：

```ts
import { LayoutAsideModule, LayoutContentModule, LayoutHeaderModule, LayoutModule, LayoutSenderModule } from '@matechat/ng';
```

### 基本用法
可使用 `McLayoutAside`, `McLayoutContent`, `McLayoutHeader`, `McLayout`, `McLayoutSender` 布局容器，进行语义化结构定义，各容器将持续演进其通用能力。

<mc-ng-layout-demo></mc-ng-layout-demo>

### 自动滚动
`McLayoutContent` 组件支持`autoScroll`属性，用于自动滚动到容器底部；以及`showScrollArrow`属性，控制显示滚动箭头。

<mc-ng-layout-content-demo></mc-ng-layout-content-demo>
