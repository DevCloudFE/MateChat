---
title: ToolCall组件
desc: ToolCall组件文档
bannerSrc: '/textareaBanner.png'
iconSrc: '/textareaIcon.png'
---

### Toolbar 参数

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `name` | `string` | — | **必填**。工具名称（如 `"read"`, `"bash"`）。 |
| `description` | `string` | `''` | 工具的功能描述，显示在名称下方。 |
| `icon` | `string \| Component` | — | 自定义图标。可传入字符串（emoji / SVG）或 Vue 组件，未提供时根据 `name` 自动匹配内置图标。 |
| `status` | `'pending' \| 'running' \| 'success' \| 'error'` | `'pending'` | 执行状态，决定卡片的样式与动画。 |
| `collapsible` | `boolean` | `true` | 是否允许折叠内容区域。 |
| `defaultExpanded` | `boolean` | `false` | 初始是否展开内容区域。 |
| `blink` | `boolean` | `true` | 运行中（`status='running'`）是否显示呼吸灯/闪烁动画。 |
| `variant` | `'default' \| 'compact' \| 'bordered'` | `'default'` | 样式变体：`default`（浅色边框）、`bordered`（明显边框）、`compact`（紧凑尺寸）。 |
| `result` | `any` | — | 执行结果数据，会格式化展示在默认结果区。 |
| `params` | `any` | — | 参数数据，展示方式与 `result` 类似。 |
| `allowExpandWhenRunning` | `boolean` | `false` | 当 `status` 为 `'running'` 时是否允许展开内容（否则点击会显示“正在努力执行中...”提示）。 |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `expand-change` | `(expanded: boolean)` | 展开/收起状态改变时触发，参数为当前展开状态。 |
| `retry` | — | 当状态为 `'error'` 时，用户点击“重试”按钮触发。 |

## Slots

| 插槽名 | 作用域参数 | 说明 |
|--------|------------|------|
| `icon` | — | 自定义头部图标，替换整个图标区域。 |
| `name` | `{ name }` | 自定义名称展示区域，作用域包含当前工具名称。 |
| `description` | `{ description }` | 自定义描述展示区域，作用域包含描述文本。 |
| `header-action` | `{ status }` | 头部右侧操作区，位于折叠箭头左侧，常用于放置额外按钮。 |
| `params-content` | `{ params }` | 自定义参数渲染区域，作用域包含 `params` 数据。 |
| `result-content` | `{ result }` | 自定义结果渲染区域，作用域包含 `result` 数据。 |
| `default` | — | 默认插槽，内容会被放置在参数与结果区域之后。 |

### 类型定义
