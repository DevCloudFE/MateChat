---
title: List 列表
desc: 用于展示一组内容或选项
bannerSrc: '/listBanner.png'
iconSrc: '/listIcon.png'
---

### 参数

| 参数名         | 类型                            | 默认值        | 说明                                                     |
| -------------- | ------------------------------- | ------------- | -------------------------------------------------------- |
| data           | [ListItemData[]](#listitemdata) | []            | 需要显示的数据                                           |
| direction      | [ListDirection](#listdirection) | 'vertical'    | 选项排列方式，垂直或者水平                               |
| autoWrap       | `boolean`                       | true          | 是否自动换行，仅在水平排列时生效                         |
| variant        | [ListVariant](#listvariant)     | 'transparent' | 选项的形态，默认无背景色，悬浮和选中高亮                 |
| selectable     | `boolean`                       | true          | 是否可选中，可选中时，点击后选项高亮                     |
| enableLazyLoad | `boolean`                       | false         | 是否支持懒加载                                           |
| enableShortKey | `boolean`                       | false         | 是否支持快捷键选择                                       |
| inputEl        | `object`                        | --            | 当支持快捷键选择时，监听键盘事件的元素，默认为`document` |

### 事件

| 事件名   | 类型                        | 说明                                                       |
| -------- | --------------------------- | ---------------------------------------------------------- |
| select   | `(e: ListItemData) => void` | 点击选项时触发的事件，参数为用户传入的选项数据             |
| loadMore | `(e: Event) => void`        | 滚动到底时触发的事件，仅在启用懒加载且排列方式为垂直时触发 |

### 插槽

| 插槽名 | 返回值                   | 说明           |
| ------ | ------------------------ | -------------- |
| item   | `{ item: ListItemData }` | 自定义选项内容 |

### 类型定义

#### ListItemData

```ts
interface ListItemData {
  label: string; // 显示的内容
  value: string | number; // 对应的值
  disabled?: boolean; // 是否禁用
  active?: boolean; // 是否选中
  [key: string]: any; // 其他自定义字段
}
```

#### ListDirection

```ts
enum ListDirection {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}
```

#### ListVariant

```ts
enum ListVariant {
  Transparent = 'transparent', // 无背景色，悬浮和选中高亮
  Filled = 'filled', // 带背景色
  Bordered = 'bordered', // 带边框
  None = 'none', //无任何样式，完全由用户自定义
}
```
