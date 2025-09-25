import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';
import { undo, redo, history } from 'prosemirror-history';
import { Plugin } from 'prosemirror-state';
import type { Schema } from 'prosemirror-model';
import { createCodeBlockKeymapPlugin } from './code-block';
import { createSubmitKeyPlugin } from './submit-key';
import type { SubmitHandler } from './submit-key';
import type { ChatInputProps } from '../chat-input-types';
import { createPlainTextPastePlugin } from './plain-text-paste';
import { createKeydownPlugin } from './keydown';
import { createPlaceholderPlugin } from './placeholder';

type SubmitKey = ChatInputProps['submitKey'];

const historyPlugin = history();

/**
 * 生成聊天输入框的键位绑定集合。
 * - 将基础 keymap、撤销/重做与自定义的 Enter/提交逻辑合并。
 */
const createBaseKeymapPlugin = () =>
  keymap({
    ...baseKeymap,
    'Mod-z': undo,
    'Mod-y': redo,
    'Shift-Enter': baseKeymap.Enter,
    'Mod-Enter': baseKeymap.Enter,
  });

// Implementation details moved to dedicated files for clarity & reuse.

/**
 * 创建 ChatInput 使用的 ProseMirror 插件集合。
 * 包含：占位符、代码块快捷、纯文本粘贴、keydown 自定义、提交/换行键位、历史记录。
 */
export const createChatInputPlugins = (
  submitKey: SubmitKey,
  onSubmit: SubmitHandler,
  placeholder: string,
  schema?: Schema,
  onKeydown?: (event: KeyboardEvent) => void,
) => {
  const codeBlockKeymapPlugin = schema
    ? createCodeBlockKeymapPlugin(schema, submitKey)
    : null;

  const plugins: Plugin[] = [];

  // Placeholder should be first so other decorations (if any later) can overlay correctly.
  plugins.push(createPlaceholderPlugin(placeholder));
  // Submit key应该靠前以确保拦截提交快捷键
  plugins.push(createSubmitKeyPlugin(submitKey, onSubmit));

  if (codeBlockKeymapPlugin) {
    plugins.push(codeBlockKeymapPlugin);
  }
  plugins.push(createPlainTextPastePlugin());
  plugins.push(createKeydownPlugin(onKeydown));
  plugins.push(createBaseKeymapPlugin());

  plugins.push(historyPlugin);

  return plugins;
};
