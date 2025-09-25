/**
 * @description
 * 该文件导出一个 Vue 组合式函数 `useChatInputEditor`，为富文本聊天输入框编辑器提供核心逻辑。
 * 它基于 ProseMirror 构建，并负责处理编辑器的设置、Schema、插件和状态管理。
 *
 * 编辑器支持以下功能：
 * - 基本文本输入。
 * - 带有语言检测的代码块。
 * - 占位符文本 (Placeholder)。
 * - 可自定义的提交快捷键。
 * - 禁用编辑器。
 * - 通过程序控制编辑器的聚焦和清空。
 *
 * 该组合式函数接收 props 和事件处理函数作为参数，并返回可在 Vue 组件中使用的响应式引用 (refs) 和方法。
 */
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { EditorState, Selection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Fragment, Schema } from 'prosemirror-model';
import type { Node as ProseMirrorNode, NodeSpec } from 'prosemirror-model';
import type { ChatInputProps } from './chat-input-types';
import { createChatInputPlugins } from './plugins';
import { serializeNodeToMarkdown, parseMarkdownToNodes } from './utils';
import { codeBlockSpec, codeMarkSpec } from './plugins/code-block';

interface UseChatInputEditorOptions {
  props: ChatInputProps;
  onSubmit: (value: string) => void;
  onUpdateModelValue: (value: string) => void;
  onKeydown?: (event: KeyboardEvent) => void;
}

const createSchema = () => {
  const docSpec: NodeSpec = { content: 'block+' };
  const paragraphSpec: NodeSpec = {
    content: 'inline*',
    group: 'block',
    parseDOM: [{ tag: 'p' }],
    toDOM() {
      return ['p', 0];
    },
  };
  const textSpec: NodeSpec = { group: 'inline' };

  const nodesSpec = {
    doc: docSpec,
    paragraph: paragraphSpec,
    code_block: codeBlockSpec,
    text: textSpec,
  };

  const marksSpec = {
    code: codeMarkSpec,
  };

  return new Schema({ nodes: nodesSpec, marks: marksSpec});
};


export const useChatInputEditor = ({
  props,
  onSubmit,
  onUpdateModelValue,
  onKeydown,
}: UseChatInputEditorOptions) => {
  const editorRef = ref<HTMLDivElement | null>(null);
  let view: EditorView | null = null;

  let activeSchema: Schema | null = null;

  const collectMarkdown = (doc: ProseMirrorNode) => {
    const contentParts: string[] = [];
    doc.forEach((node) => {
      contentParts.push(serializeNodeToMarkdown(node));
    });
    return contentParts.join('\n');
  };

  const createPlugins = () => {
    return createChatInputPlugins(
      props.submitKey,
      onSubmit,
      props.placeholder,
      activeSchema ?? undefined,
      onKeydown,
    );
  };

  const clearInput = () => {
    if (!view) {
      return;
    }
    const { state } = view;
    const { tr } = state;
    view.dispatch(tr.delete(0, state.doc.content.size));
  };

  const focus = () => {
    if (view) {
      view.focus();
    }
  };

  const reconfigurePlugins = () => {
    if (!view) {
      return;
    }
    const previousState = view.state;
    const hadFocus = view.hasFocus();
    const { selection, storedMarks } = previousState;
    const selectionJSON = selection.toJSON();
    const reconfigured = previousState.reconfigure({
      plugins: createPlugins(),
    });

    const transaction = reconfigured.tr.setSelection(
      Selection.fromJSON(reconfigured.doc, selectionJSON),
    );
    if (storedMarks) {
      transaction.setStoredMarks(storedMarks);
    }
    const nextState = reconfigured.apply(transaction);
    view.updateState(nextState);

    if (hadFocus) {
      view.focus();
    }
  };

  const updateEditable = () => {
    if (!view) {
      return;
    }
    view.setProps({ editable: () => !props.disabled });
    if (props.disabled) {
      view.dom.blur();
    }
  };

  onMounted(() => {
    if (!editorRef.value) {
      return;
    }

    const schema = createSchema();
    activeSchema = schema;

    const state = EditorState.create({
      schema,
      plugins: createPlugins(),
    });

    view = new EditorView(editorRef.value, {
      state,
      editable: () => !props.disabled,
      dispatchTransaction(transaction) {
        if (!view) {
          return;
        }
        const newState = view.state.apply(transaction);
        view.updateState(newState);
        if (transaction.docChanged) {
          onUpdateModelValue(collectMarkdown(newState.doc));
        }
      },
    });

    updateEditable();

    if (props.autofocus) {
      focus();
    }
  });

  onBeforeUnmount(() => {
    if (view) {
      view.destroy();
      view = null;
    }
  });

  watch(
    () => props.modelValue,
    (newValue) => {
      if (!view) {
        return;
      }

      const currentValue = collectMarkdown(view.state.doc);
      if (newValue === currentValue) {
        return;
      }

      if (newValue === '') {
        if (view.state.doc.content.size === 0) {
          return;
        }
        clearInput();
        return;
      }

      const { state } = view;
      const { tr, schema } = state;
      const hadFocus = view.hasFocus();

      const nodes = parseMarkdownToNodes(newValue, schema);
      const fragment = Fragment.from(nodes);

      view.dispatch(tr.replaceWith(0, state.doc.content.size, fragment));

      if (hadFocus) {
        view.focus();
      }
    },
  );

  watch(
    () => props.submitKey,
    () => {
      reconfigurePlugins();
    },
  );

  watch(
    () => props.disabled,
    () => {
      updateEditable();
      reconfigurePlugins();
    },
  );

  watch(
    () => props.placeholder,
    () => {
      reconfigurePlugins();
    },
  );

  return {
    editorRef,
    clearInput,
    focus,
    getContent: () => {
      if (view) {
        return collectMarkdown(view.state.doc);
      }
      return props.modelValue ?? '';
    },
  };
};
