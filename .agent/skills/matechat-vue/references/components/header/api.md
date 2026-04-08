---
title: Header 头部
desc: 用于在头部展示logo、标题等内容的组件
bannerSrc: '/headerBanner.png'
iconSrc: '/headerIcon.png'
---

### 参数

| 参数名        | 类型      | 默认值 | 说明                      |
| ------------- | --------- | ------ | ------------------------- |
| logoImg       | `string`  | ''     | logo 图片地址             |
| title         | `string`  | ''     | header 标题               |
| logoClickable | `boolean` | false  | header 标题区域是否可点击 |

### 事件

| 事件名      | 类型         | 说明               |
| ----------- | ------------ | ------------------ |
| logoClicked | `() => void` | 点击 logo 时的事件 |

### 插槽

| 插槽名        | 返回值 | 说明           |
| ------------- | ------ | -------------- |
| operationArea | --     | 自定义操作区域 |
