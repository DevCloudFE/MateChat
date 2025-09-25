/**
 * 内部编辑器控制器：封装 ProseMirror 的创建、插件配置、
 * 文档同步与视图生命周期管理，供组合式函数薄包装使用。
 */
import { EditorState, Selection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Fragment, Schema } from 'prosemirror-model';
import type { Node as ProseMirrorNode, NodeSpec, MarkSpec } from 'prosemirror-model';
import type { ChatInputProps } from './chat-input-types';
import { createChatInputPlugins } from './plugins';
import { serializeNodeToMarkdown, parseMarkdownToNodes } from './utils';
import { codeBlockSpec, codeMarkSpec } from './plugins/code-block';

/**
 * 控制器初始化选项。
 * - props: ChatInput 组件的 props 快照（由外部传入，控制器只读取其值，不修改）。
 * - onSubmit: 当触发提交（由提交插件处理）时回调序列化后的 markdown 文本。
 * - onUpdateModelValue: 当编辑器内容发生变化时，回调最新的 markdown 文本。
 * - onKeydown: 可选键盘事件回调，用于外部监听原始按键事件。
 */
export interface EditorControllerOptions {
  props: ChatInputProps;
  onSubmit: (value: string) => void;
  onUpdateModelValue: (value: string) => void;
  onKeydown?: (event: KeyboardEvent) => void;
}

/**
 * ChatInputEditorController
 *
 * 负责：
 * - 构建 Schema（doc/paragraph/text/code_block + code 标记）
 * - 基于配置创建 ProseMirror 插件集合
 * - 管理 EditorView 的挂载、销毁与重配置
 * - 在内容变化时序列化为 markdown，并同步给外部
 */
export class ChatInputEditorController {
  private props: ChatInputProps;
  private onSubmit: (value: string) => void;
  private onUpdateModelValue: (value: string) => void;
  private onKeydown?: (event: KeyboardEvent) => void;

  private view: EditorView | null = null;
  private schema: Schema | null = null;

  constructor({ props, onSubmit, onUpdateModelValue, onKeydown }: EditorControllerOptions) {
    this.props = props;
    this.onSubmit = onSubmit;
    this.onUpdateModelValue = onUpdateModelValue;
    this.onKeydown = onKeydown;
  }

  /**
   * 构建编辑器 Schema。
   * 仅保留段落/文本/代码块节点与 code 行内标记，满足聊天输入的最小集合。
   */
  private createSchema(): Schema {
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
    } as Record<string, MarkSpec>;

    return new Schema({ nodes: nodesSpec, marks: marksSpec });
  }

  /**
   * 生成 ProseMirror 插件列表（占位符、提交键、代码块键位、粘贴处理、keydown、自带历史等）。
   */
  private createPlugins() {
    return createChatInputPlugins(
      this.props.submitKey,
      this.onSubmit,
      this.props.placeholder,
      this.schema ?? undefined,
      this.onKeydown,
    );
  }

  /**
   * 将文档内容序列化为 markdown（段落换行、代码块围栏）。
   */
  private collectMarkdown(doc: ProseMirrorNode): string {
    const contentParts: string[] = [];
    doc.forEach((node) => {
      contentParts.push(serializeNodeToMarkdown(node));
    });
    return contentParts.join('\n');
  }

  /**
   * 在指定元素上挂载 EditorView。
   * @param mountEl 容器元素（应为可见、尺寸稳定的 div）。
   */
  mount(mountEl: HTMLDivElement) {
    const schema = this.createSchema();
    this.schema = schema;

    const state = EditorState.create({ schema, plugins: this.createPlugins() });

    this.view = new EditorView(mountEl, {
      state,
      editable: () => !this.props.disabled,
      dispatchTransaction: (transaction) => {
        const view = this.view;
        if (!view) return;
        const newState = view.state.apply(transaction);
        view.updateState(newState);
        if (transaction.docChanged) {
          this.onUpdateModelValue(this.collectMarkdown(newState.doc));
        }
      },
    });
    this.updateEditable();
  }

  /**
   * 销毁 EditorView 并释放资源。
   */
  destroy() {
    if (this.view) {
      this.view.destroy();
      this.view = null;
    }
  }

  /**
   * 清空编辑器内容。
   */
  clearInput() {
    if (!this.view) return;
    const { state } = this.view;
    const { tr } = state;
    this.view.dispatch(tr.delete(0, state.doc.content.size));
  }

  /**
   * 让编辑器获取焦点。
   */
  focus() {
    if (this.view) this.view.focus();
  }

  /**
   * 根据 props.disabled 更新可编辑状态（禁用时同时移除焦点）。
   */
  updateEditable() {
    if (!this.view) return;
    this.view.setProps({ editable: () => !this.props.disabled });
    if (this.props.disabled) {
      this.view.dom.blur();
    }
  }

  /**
   * 重新创建并应用插件集合，保持选区与焦点稳定。
   * 常用于 submitKey、placeholder、disabled 等配置变更时。
   */
  reconfigurePlugins() {
    const view = this.view;
    if (!view) return;
    const previousState = view.state;
    const hadFocus = view.hasFocus();
    const { selection, storedMarks } = previousState;
    const selectionJSON = selection.toJSON();
    const reconfigured = previousState.reconfigure({ plugins: this.createPlugins() });

    const transaction = reconfigured.tr.setSelection(
      Selection.fromJSON(reconfigured.doc, selectionJSON),
    );
    if (storedMarks) transaction.setStoredMarks(storedMarks);
    const nextState = reconfigured.apply(transaction);
    view.updateState(nextState);
    if (hadFocus) view.focus();
  }

  /**
   * 将外部 v-model 文本（markdown）应用到编辑器。
   * 若与当前内容一致则跳过；传入空串时清空文档。
   */
  applyExternalModel(newValue: string) {
    const view = this.view;
    if (!view) return;

    const currentValue = this.collectMarkdown(view.state.doc);
    if (newValue === currentValue) return;

    if (newValue === '') {
      if (view.state.doc.content.size === 0) return;
      this.clearInput();
      return;
    }

    const { state } = view;
    const { tr, schema } = state;
    const hadFocus = view.hasFocus();

    const nodes = parseMarkdownToNodes(newValue, schema);
    const fragment = Fragment.from(nodes);
    view.dispatch(tr.replaceWith(0, state.doc.content.size, fragment));
    if (hadFocus) view.focus();
  }

  /**
   * 获取当前内容的 markdown 文本。
   */
  getContent(): string {
    if (this.view) {
      return this.collectMarkdown(this.view.state.doc);
    }
    return this.props.modelValue ?? '';
  }
}
