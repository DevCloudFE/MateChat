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
| `head` | `{ disabled: boolean, value: string }` | Slot for content above the input area. |
| `prefix` | `{ disabled: boolean, value: string }` | Slot for content to the left of the input area. |
| `suffix` | `{ disabled: boolean, value: string }` | Slot for content to the right of the input area. |
| `extra` | `{ disabled: boolean, value: string }` | Slot for content below the input area. |

### Methods

| Name | Parameters | Description |
| --- | --- | --- |
| `clearInput` | `()` | Clears the input content. |
| `focus` | `()` | Focuses the editor programmatically. |
