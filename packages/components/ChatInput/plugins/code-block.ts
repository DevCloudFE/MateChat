/**
 * 处理聊天输入框中代码块行为的 ProseMirror 插件与工具方法。
 * 提供将围栏转换为 `code_block` 节点的快捷键与命令，并补充光标导航逻辑。
 */
import {
  Fragment,
  type Schema,
  type Node as ProseMirrorNode,
  type NodeType,
} from 'prosemirror-model';
import {
  Plugin,
  TextSelection,
  type Command,
  type EditorState,
} from 'prosemirror-state';
import { keymap } from 'prosemirror-keymap';
import type { ChatInputProps } from '../chat-input-types';

/**
 * 触发代码块转换的模式：``` 或 ```lang （整段匹配）。
 */
const CODE_BLOCK_TRIGGER = /^```([a-zA-Z0-9_+-]*)?$/;

const ENTER_BINDINGS = ['Enter', 'Shift-Enter', 'Mod-Enter'] as const;

const matchFenceBeforeCursor = (
  node: ProseMirrorNode,
  cursorOffset: number,
): RegExpMatchArray | null => {
  const textBeforeCursor = node.textBetween(0, cursorOffset);
  return textBeforeCursor.match(CODE_BLOCK_TRIGGER);
};

/**
 * 代码块内 Backspace 的补充处理：
 * 1. 光标位于空代码块时删除该代码块并生成普通段落；
 * 2. 光标位于首行且代码块仍有内容时不做额外处理（交给默认行为）；
 * 3. 其余场景暂时交由默认 Backspace 行为，后续补充空行与非空行的细分逻辑。
 */
const handleCodeBlockBackspace: Command = (state, dispatch) => {
  const { selection, schema } = state;
  const { $head, $anchor, empty } = selection;

  if (!empty || !$head.sameParent($anchor)) {
    return false;
  }

  const parent = $head.parent;

  if (!parent.type.spec.code) {
    return false;
  }

  const paragraphType = schema.nodes.paragraph;

  if (!paragraphType) {
    return false;
  }

  const codeBlockStart = $head.before();

  if (parent.content.size === 0 || parent.textContent.length === 0) {
    if (!dispatch) {
      return true;
    }

    const tr = state.tr;

    tr.replaceWith(
      codeBlockStart,
      codeBlockStart + parent.nodeSize,
      paragraphType.create(),
    );

    const selectionPos = codeBlockStart + 1;
    tr.setSelection(TextSelection.near(tr.doc.resolve(selectionPos)));

    dispatch(tr.scrollIntoView());
    return true;
  }

  const offset = $head.parentOffset;
  const atBlockStart = offset === 0;

  if (atBlockStart && parent.textContent.length > 0) {
    return false;
  }

  const codeBlockText = parent.textContent;
  const previousLineBreakIndex = codeBlockText.lastIndexOf('\n', offset - 1);
  const nextLineBreakIndex = codeBlockText.indexOf('\n', offset);
  const lineStartIndex =
    previousLineBreakIndex === -1 ? 0 : previousLineBreakIndex + 1;
  const lineEndIndex =
    nextLineBreakIndex === -1 ? codeBlockText.length : nextLineBreakIndex;
  const currentLineText = codeBlockText.slice(lineStartIndex, lineEndIndex);

  if (currentLineText.length > 0) {
    // TODO: 支持在非空代码行内的回退逻辑。
    return false;
  }

  // TODO: 支持删除代码块内部的空行并根据需要退出代码块。
  return false;
};

/**
 * 工厂：创建代码块内按方向键（上/下）跳出的命令。
 * 逻辑归纳：
 * 1. 仅在光标位于 code_block 且为单点光标时生效。
 * 2. 上键：光标在块首 ⇒
 *    - 若代码块是文档第一节点：在其前插入段落并聚焦；
 *    - 否则直接将光标移动到代码块之前。
 * 3. 下键：光标在块尾 ⇒
 *    - 若代码块是文档最后节点：在其后插入段落并聚焦；
 *    - 否则直接将光标移动到代码块之后。
 */
const createExitCodeCommand = (direction: 'up' | 'down'): Command => {
  return (state: EditorState, dispatch): boolean => {
    const { $head, $anchor } = state.selection;

    // 仅处理同一父节点内的单点文本选区，且父节点为 code_block
    if (!$head.parent.type.spec.code || !$head.sameParent($anchor)) return false;

    const atBoundary = direction === 'up'
      ? $head.parentOffset === 0
      : $head.parentOffset === $head.parent.content.size;
    if (!atBoundary) return false;

    const paragraphType = state.schema.nodes.paragraph;
    if (!paragraphType) return false;

    if (direction === 'up') {
      const isFirstChild = $head.index(0) === 0;
      if (isFirstChild) {
        if (!dispatch) return true;
        const tr = state.tr.insert($head.before(), paragraphType.create());
        tr.setSelection(TextSelection.near(tr.doc.resolve($head.before())));
        dispatch(tr.scrollIntoView());
        return true;
      }
      if (!dispatch) return true;
      const tr = state.tr;
      tr.setSelection(TextSelection.near(tr.doc.resolve($head.before()), -1));
      dispatch(tr.scrollIntoView());
      return true;
    }

    // down
    const grandParent = state.doc.resolve($head.after()).parent;
    const isLastChild = $head.index(0) === grandParent.childCount - 1;
    if (isLastChild) {
      if (!dispatch) return true;
      const tr = state.tr.insert($head.after(), paragraphType.create());
      tr.setSelection(TextSelection.near(tr.doc.resolve($head.after())));
      dispatch(tr.scrollIntoView());
      return true;
    }
    if (!dispatch) return true;
    const tr = state.tr;
    tr.setSelection(TextSelection.near(tr.doc.resolve($head.after())));
    dispatch(tr.scrollIntoView());
    return true;
  };
};


const createCodeBlockNode = (
  codeBlockType: NodeType,
  language: string,
): ProseMirrorNode =>
  codeBlockType.createAndFill({ language }) ??
  codeBlockType.create({ language });

const createCodeBlockReplacement = (
  parent: ProseMirrorNode,
  paragraphType: NodeType,
  codeBlockNode: ProseMirrorNode,
  cursorOffset: number,
): Fragment => {
  const trailingFragment = parent.content.cut(
    cursorOffset,
    parent.content.size,
  );
  const replacementNodes = [codeBlockNode];

  if (trailingFragment.size > 0) {
    replacementNodes.push(
      paragraphType.create(parent.attrs, trailingFragment),
    );
  }

  return Fragment.fromArray(replacementNodes);
};

/**
 * 尝试在换行键按下时将当前段落转换为 code_block；
 */
export const createCodeBlockEnterCommand = (schema: Schema): Command => {
  const paragraphType = schema.nodes.paragraph;
  const codeBlockType = schema.nodes.code_block;

  if (!paragraphType || !codeBlockType) {
    return () => false;
  }

  return (state, dispatch) => {
    const { selection } = state;

    if (!(selection instanceof TextSelection) || !selection.empty) {
      return false;
    }

    const { $from } = selection;
    const parent = $from.parent;

    if (parent.type !== paragraphType) {
      return false;
    }

    const cursorOffset = $from.parentOffset;
    const fenceMatch = matchFenceBeforeCursor(parent, cursorOffset);

    if (!fenceMatch) {
      return false;
    }

    if (!dispatch) {
      return true;
    }

    const paragraphDepth = $from.depth;
    const paragraphStart = $from.before(paragraphDepth);
    const paragraphEnd = $from.after(paragraphDepth);
    const codeBlockNode = createCodeBlockNode(
      codeBlockType,
      fenceMatch[1] ?? '',
    );
    const replacement = createCodeBlockReplacement(
      parent,
      paragraphType,
      codeBlockNode,
      cursorOffset,
    );

    const tr = state.tr;
    tr.replaceWith(
      paragraphStart,
      paragraphEnd,
      replacement,
    );
    tr.setSelection(TextSelection.create(tr.doc, paragraphStart + 1));

    dispatch(tr.scrollIntoView());
    return true;
  };
};


/**
 * 创建代码块相关快捷键插件：
 * - ArrowUp：在代码块首行按上跳出到上方段落 / 在块前插入段落
 * - ArrowDown：在代码块末行按下跳出到下方段落 / 在块后插入段落
 * - Enter/Shift-Enter/Mod-Enter：在非提交键组合上执行统一的换行并检查代码块触发
 */
type SubmitKey = ChatInputProps['submitKey'];

export const createCodeBlockKeymapPlugin = (
  schema: Schema,
  submitKey: SubmitKey,
): Plugin => {
  const bindings: Record<string, Command> = {
    ArrowUp: createExitCodeCommand('up'),
    ArrowDown: createExitCodeCommand('down'),
    Backspace: handleCodeBlockBackspace,
  };

  const handleEnter = createCodeBlockEnterCommand(schema);

  for (const binding of ENTER_BINDINGS) {
    if (binding === submitKey) continue;

    bindings[binding] = handleEnter;
  }

  return keymap(bindings);
};
