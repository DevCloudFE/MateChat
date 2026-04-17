---
title: Layout 布局
desc: 用于对不同的模块进行排列布局
bannerSrc: '/layoutBanner.png'
iconSrc: '/layoutIcon.png'
---

### Layout

顶层组件，用于包裹`Header`、`Content`等子组件。

### Header

用于在头部放置内容。

### Content

用于在中间内容区域放置内容。
### 参数

| 参数名           | 类型       | 默认值  | 说明                      |
| --------------- | ---------- | ------ | ------------------------- |
| autoScroll      | `boolean`  | true   | 是否自动滚动到容器底部      |
| showScrollArrow | `boolean`  | true   | 是否显示滚动箭头            |

### 事件

| 事件名 | 类型                      | 说明                                             |
| ------ | ------------------------- | ------------------------------------------------ |
| onScrollerScroll | `(e: Event) => void`     | 滚动事件，返回值为滚动事件对象 |
| onScrollerWheel  | `(e: WheelEvent) => void`     | 鼠标滚轮事件，返回值为滚轮事件对象 |

### 方法

| 方法名     | 类型           | 说明             |
| ---------- | -------------- | ---------------- |
| scrollToPosition | `(top: number) => void`   | 滚动到容器的指定位置 |
| updateScroll | `(force?: boolean) => void`   | 滚动位置到容器底部，受`autoScroll`参数影响 |
| scrollToBottom | `() => void`   | 滚动到容器底部，不受`autoScroll`参数影响 |
| scrollToTop | `() => void`   | 滚动到容器顶部 |

### Sender

用于在底部区域放置内容。

### Aside

用于在侧边放置内容。
