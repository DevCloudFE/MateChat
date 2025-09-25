import { Plugin, PluginKey } from 'prosemirror-state';

export const plainTextPastePluginKey = new PluginKey('chat-input-plain-text-paste');

/**
 * 粘贴处理插件：始终将剪贴板内容按纯文本插入（去除富文本/HTML 格式）。
 *
 * 设计说明：
 * - 仅在获取到纯文本时处理，获取不到则回退给下一层处理。
 */
export const createPlainTextPastePlugin = () =>
  new Plugin({
    key: plainTextPastePluginKey,
    props: {
      handlePaste(view, event) {

        const clipboardData = event.clipboardData;
        const plainText =
          clipboardData?.getData('text/plain') ??
          clipboardData?.getData('text');
        if (plainText == null) {
          return false;
        }

        event.preventDefault();

        // Normalise Windows line endings so the editor receives consistent text.
        const text = plainText.replace(/\r\n?/g, '\n');
        const { state, dispatch } = view;
        const { selection } = state;

        dispatch(
          state.tr.insertText(text, selection.from, selection.to),
        );

        return true;
      },
    },
  });
