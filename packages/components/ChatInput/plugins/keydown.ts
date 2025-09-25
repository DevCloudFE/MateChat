import { Plugin, PluginKey } from 'prosemirror-state';

export const keydownPluginKey = new PluginKey('chat-input-keydown');

/**
 * 插件：向外层暴露原生键盘事件回调。
 */
export const createKeydownPlugin = (
  onKeydown?: (event: KeyboardEvent) => void,
) =>
  new Plugin({
    key: keydownPluginKey,
    props: {
      handleKeyDown(_view, event) {
        onKeydown?.(event);
        return false;
      },
    },
  });
