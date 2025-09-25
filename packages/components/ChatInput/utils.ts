import type { Node as ProseMirrorNode, Schema } from 'prosemirror-model';

export const serializeNodeToMarkdown = (node: ProseMirrorNode): string => {
  switch (node.type.name) {
    case 'code_block': {
      const language = node.attrs.language || '';
      return `\`\`\`${language}\n${node.textContent}\n\`\`\``;
    }
    default:
      return node.textContent;
  }
};

/**
 * 将 Markdown 文本解析为 ProseMirror 节点数组。
 *
 * 功能：
 * - 解析代码块（```language\ncode\n``` 格式）
 * - 将普通文本行转换为段落节点
 * - 支持代码块语言标识
 */
export const parseMarkdownToNodes = (
  markdown: string,
  schema: Schema,
): ProseMirrorNode[] => {
  const { paragraph, code_block } = schema.nodes;
  const nodes: ProseMirrorNode[] = [];

  const parts = markdown.split(/(```(?:[a-zA-Z0-9_+-]*)?\n[\s\S]*?\n```)/m);

  for (const part of parts) {
    if (!part) {
      continue;
    }

    const codeBlockMatch = part.match(
      /^```([a-zA-Z0-9_+-]*)?\n([\s\S]*?)\n```$/m,
    );

    if (codeBlockMatch) {
      const [, lang, content] = codeBlockMatch;
      nodes.push(
        code_block.create(
          { language: lang || '' },
          content ? schema.text(content) : null,
        ),
      );
      continue;
    }

    const lines = part.split('\n');
    lines.forEach((line, index) => {
      if (index === lines.length - 1 && line === '') return;
      const textNode = line ? schema.text(line) : null;
      nodes.push(paragraph.create(null, textNode));
    });
  }

  return nodes;
};
