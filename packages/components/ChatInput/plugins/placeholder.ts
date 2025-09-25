/**
 * Chat Input 占位符插件：在 ProseMirror 编辑器内容为空时渲染提示文本，并处理尺寸同步与事件清理。
 */
import { Plugin } from 'prosemirror-state';
import type { EditorState } from 'prosemirror-state';
import type { EditorView } from 'prosemirror-view';

/**
 * 判断文档是否为空。
 * 空文档定义：只有一个子节点、该节点为段落类型、且内容为空。
 */
const isEmptyDocument = (state: EditorState) => {
  const { doc } = state;
  const firstChild = doc.firstChild;

  return (
    doc.childCount === 1 &&
    !!firstChild &&
    firstChild.isTextblock &&
    firstChild.content.size === 0 &&
    firstChild.type.name === 'paragraph'
  );
};

const createPlaceholderElement = (editorView: EditorView, placeholder: string) => {
  const placeholderEl = document.createElement('span');
  placeholderEl.classList.add('mc-chat-input__placeholder');
  placeholderEl.style.pointerEvents = 'none';
  placeholderEl.textContent = placeholder;

  const container = editorView.dom.parentElement ?? editorView.dom;
  const editorElement = editorView.dom as HTMLElement;

  const syncPlaceholderBox = () => {
    placeholderEl.style.top = `${editorElement.offsetTop}px`;
    placeholderEl.style.left = `${editorElement.offsetLeft}px`;
    placeholderEl.style.width = `${editorElement.clientWidth}px`;
    placeholderEl.style.height = `${editorElement.clientHeight}px`;
  };

  syncPlaceholderBox();
  container.appendChild(placeholderEl);

  return { placeholderEl, syncPlaceholderBox, editorElement };
};

const registerPlaceholderResizers = (
  editorElement: HTMLElement,
  syncPlaceholderBox: () => void,
) => {
  const resizeObserver = new ResizeObserver(() => {
    syncPlaceholderBox();
  });

  resizeObserver.observe(editorElement);

  const handleWindowResize = () => {
    syncPlaceholderBox();
  };

  window.addEventListener('resize', handleWindowResize);

  return () => {
    resizeObserver.disconnect();
    window.removeEventListener('resize', handleWindowResize);
  };
};

const updatePlaceholderVisibility = (
  state: EditorState,
  placeholderEl: HTMLElement,
  syncPlaceholderBox: () => void,
) => {
  syncPlaceholderBox();
  placeholderEl.style.display = isEmptyDocument(state) ? '' : 'none';
};

/**
 * 创建占位符插件：在编辑器内容为空时显示占位符文本。
 *
 * 功能：
 * - 创建一个覆盖在编辑器上的占位符元素
 * - 根据文档内容自动显示/隐藏占位符
 * - 监听编辑器尺寸变化，自动调整占位符位置和大小
 * - 响应窗口大小变化，保持占位符位置正确
 *
 * @param placeholder 占位符文本内容
 */
export const createPlaceholderPlugin = (placeholder: string) => {
  return new Plugin({
    view(editorView: EditorView) {
      const { placeholderEl, syncPlaceholderBox, editorElement } =
        createPlaceholderElement(editorView, placeholder);
      const disposeResizeHandlers = registerPlaceholderResizers(
        editorElement,
        syncPlaceholderBox,
      );

      const updateVisibility = (state: EditorState) => {
        updatePlaceholderVisibility(state, placeholderEl, syncPlaceholderBox);
      };

      updateVisibility(editorView.state);

      return {
        /**
         * 更新视图时重新计算占位符可见性。
         */
        update(view) {
          updateVisibility(view.state);
        },
        /**
         * 清理资源：断开监听器、移除事件监听器和占位符元素。
         */
        destroy() {
          disposeResizeHandlers();
          placeholderEl.remove();
        },
      };
    },
  });
};
