---
title: Input 输入
desc: 用于对话的输入框组件
bannerSrc: '/inputBanner.png'
iconSrc: '/inputIcon.png'
---

### 参数

| 参数名         | 类型                                        | 默认值     | 说明                                           |
| -------------- | ------------------------------------------- | ---------- | ---------------------------------------------- |
| value          | `string`                                    | ''         | 输入框的值                                     |
| placeholder    | `string`                                    | --         | 输入框占位文字                                 |
| disabled       | `boolean`                                   | false      | 是否禁用输入框                                 |
| displayType    | [DisplayType](#displaytype)                 | 'full'     | 输入框的形态                                   |
| loading        | `boolean`                                   | false      | 是否发送中，为 true 时，点击发送按钮可暂停回答 |
| showCount      | `boolean`                                   | false      | 是否显示字数统计                               |
| maxLength      | `number`                                    | --         | 输入框的最大字数                               |
| submitShortKey | [SubmitShortKey](#submitshortkey) `\| null` | 'enter'    | 发送快捷键，null 表示不使用快捷键发送          |
| variant        | [InputVariant](#inputvariant)               | 'bordered' | 输入框的形态                                   |
| sendBtnVariant | [SendBtnVariant](#sendbtnvariant)           | 'full'     | 发送按钮的形态                                 |
| autofocus      | `boolean`                                   | false      | 是否自动聚焦输入框                             |
| autosize       | [TextareaAutoSize](#textareaautosize)       | false      | 是否自动调整文本域高度                         |
| autoClear      | `boolean`                                   | true       | 提交时是否自动清空输入框                             |

### 事件

| 事件名 | 类型                      | 说明                                             |
| ------ | ------------------------- | ------------------------------------------------ |
| change | `(e: string) => void`     | 输入内容变化时触发的事件，返回值为当前输入的内容 |
| submit | `(e: string) => void`     | 发送时触发的事件，返回值为当前输入的内容         |
| cancel | `() => void`              | 当状态为发送中，点击暂停回答按钮时触发的事件     |
| focus  | `(e: FocusEvent) => void` | 聚焦输入框时触发的事件                           |
| blur   | `(e: FocusEvent) => void` | 输入框失焦时触发的事件                           |

### 插槽

| 插槽名 | 返回值 | 说明                                                     |
| ------ | ------ | -------------------------------------------------------- |
| head   | --     | 自定义输入框顶部的内容                                   |
| prefix | --     | 自定义输入框左侧的内容                                   |
| suffix | --     | 自定义输入框右侧的内容                                   |
| extra  | --     | 自定义发送按钮左侧的内容，仅在`displayType='full'`时生效 |
| button | --     | 自定义输入框的发送按钮                                   |

### 方法

| 方法名     | 类型           | 说明             |
| ---------- | -------------- | ---------------- |
| clearInput | `() => void`   | 清空输入框的内容 |
| getInput   | `() => string` | 获取输入框的内容 |

### 类型定义

#### DisplayType

```ts
enum DisplayType {
  Simple = 'simple', // prefix插槽、输入框和发送按钮在同一行，不支持extra插槽
  Full = 'full', // prefix插槽和输入框在同一行，extra插槽和发送按钮在下方
}
```

#### InputVariant

```ts
enum InputVariant {
  Bordered = 'bordered',
  BorderLess = 'borderless',
}
```

#### SendBtnVariant

```ts
enum SendBtnVariant {
  Simple = 'simple', // 圆形按钮，仅显示图标，不显示文字
  Full = 'full', // 圆角按钮，同时显示图标和文字
}
```

#### SubmitShortKey

发送内容的快捷键，当发送快捷键为`enter`时，换行快捷键为`shift+enter`；当发送快捷键为`shift+enter`时，换行快捷键为`enter`。

```ts
enum SubmitShortKey {
  Enter = 'enter',
  ShiftEnter = 'shiftEnter',
}
```

#### TextareaAutoSize

文本域自动调整高度的配置类型。

```ts
type TextareaAutoSize = { minRows?: number; maxRows?: number } | boolean
```

- `boolean`：设置为 `true` 时使用默认配置（最小1行，最大5行）
- `object`：可自定义最小和最大行数
  - `minRows?: number`：最小行数，默认为1
  - `maxRows?: number`：最大行数，默认为5
