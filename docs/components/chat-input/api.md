---
title: ChatInput API
---

### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `modelValue` | `string` | `''` | Binding value for the input content. |
| `disabled` | `boolean` | `false` | Whether to disable the input. |
| `submitKey` | `'Enter'` \| `'Shift-Enter'` \| `'Mod-Enter'` | `'Enter'` | The shortcut key for submitting. |
| `placeholder` | `string` | `'请输入您的问题...'` | The placeholder text. |
| `autofocus` | `boolean` | `false` | Whether to automatically focus the editor on mount. |

### Events

| Name | Parameters | Description |
| --- | --- | --- |
| `update:modelValue` | `(value: string)` | Emitted when the input content changes. |
| `submit` | `(value: string)` | Emitted when the submit key is pressed. |
| `keydown` | `(event: KeyboardEvent)` | Emitted on every native keydown event. |

### Slots

| Name | Parameters | Description |
| --- | --- | --- |
| `head` | — | Slot for content above the input area. |
| `prefix` | — | Slot for content to the left of the input area. |
| `suffix` | — | Slot for content to the right of the input area. |
| `extra` | — | Slot for content below the input area. |

### Methods

| Name | Parameters | Description |
| --- | --- | --- |
| `clearInput` | `()` | Clears the input content. |
| `focus` | `()` | Focuses the editor programmatically. |
| `submit` | `(value?: string)` | Programmatically submits content. If omitted, submits current editor content. |
