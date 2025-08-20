import type { Token } from 'markdown-it';
import { VNode, h, isVNode } from 'vue';

export interface ASTNode {
    nodeType: string;
    openNode: Token | null;
    closeNode: Token | null;
    children: (ASTNode | Token)[];
    vNodeKey: string;
}


// 判断是否是结束标签
const isClosingTag = (openToken: Token, closeToken: Token): boolean => {
    const openContent = openToken?.content || '';
    const closeContent = closeToken?.content || '';

    const openTagMatch = openContent.match(/<(\w+)/);
    const closeTagMatch = closeContent.match(/<\/(\w+)/);

    if (openTagMatch && closeTagMatch) {
        return openTagMatch[1] === closeTagMatch[1];
    }

    return false;
}

// 判断是否自闭合标签
const isSelfClosingTag = (token: Token): boolean => {
    // 判断token.content里面是否包含完整的HTML结构（所有开始标签都有对应的结束标签）
    const content = token.content || '';

    // 检查是否是自闭合标签（如 <img />, <br /> 等）
    if (content.match(/<(\w+)[^>]*\/>/)) {
        return true;
    }

    // 检查是否包含完整的HTML结构
    const tagStack: string[] = [];
    const openTagRegex = /<(\w+)[^>]*>/g;
    const closeTagRegex = /<\/(\w+)>/g;

    let openMatch;
    let closeMatch;

    // 重置正则表达式的lastIndex
    openTagRegex.lastIndex = 0;
    closeTagRegex.lastIndex = 0;

    // 按顺序处理所有标签
    const allMatches: Array<{ type: 'open' | 'close', tagName: string, index: number }> = [];

    // 收集所有开始标签
    while ((openMatch = openTagRegex.exec(content)) !== null) {
        allMatches.push({
            type: 'open',
            tagName: openMatch[1],
            index: openMatch.index
        });
    }

    // 收集所有结束标签
    while ((closeMatch = closeTagRegex.exec(content)) !== null) {
        allMatches.push({
            type: 'close',
            tagName: closeMatch[1],
            index: closeMatch.index
        });
    }

    // 按位置排序
    allMatches.sort((a, b) => a.index - b.index);

    // 检查标签是否完全匹配
    for (const match of allMatches) {
        if (match.type === 'open') {
            tagStack.push(match.tagName);
        } else {
            if (tagStack.length === 0) {
                return false; // 没有对应的开始标签
            }
            const lastOpenTag = tagStack[tagStack.length - 1];
            if (lastOpenTag !== match.tagName) {
                return false; // 标签不匹配
            }
            tagStack.pop();
        }
    }

    // 只有当所有标签都正确匹配时，才认为是自闭合的
    return tagStack.length === 0;
}

// 创建ast树节点
const genTreeNode = (node: Token | null): ASTNode => {
    return {
        nodeType: node ? node.type.replace('_open', '') : 'root',
        openNode: node,
        closeNode: null,
        children: [],
        vNodeKey: node?.vNodeKey || ''
    };
};

// 匹配成对html token
const matchHtmlToken = (token: Token, stack: Token[]) => {
    // 简单排除单独的闭合标签
    const isCloseTag = token.content.startsWith('</');
    if (!stack.length) {
        token.nesting = isCloseTag ? 0 : 1;
        stack.push(token);
        return;
    }
    // 判断当前token是否是上一个html token的闭合标签
    const prevToken = stack[stack.length - 1];
    const closing = isClosingTag(prevToken, token);
    if (closing) {
        token.nesting = -1;
        stack.pop();
    } else {
        if (isCloseTag) {
            token.nesting = 0;
        } else {
            token.nesting = 1;
            stack.push(token);
        }
    }
}

// 将token转换为ast树
export const tokensToAst = (tokens: Token[]): ASTNode[] => {

    // 递归处理 inline 类型的 token
    const processInlineToken = (token: Token): ASTNode => {
        const node = genTreeNode(token);

        // 如果 token 有 children，递归处理它们
        if (token.children && token.children.length > 0) {
            node.children = tokensToAst(token.children);
        }

        return node;
    };

    // 创建根节点
    const rootNode = genTreeNode(null);
    let curr: ASTNode = rootNode;
    const stack: ASTNode[] = [];
    const htmlInlineTokenStack: Token[] = [];
    const htmlBlockTokenStack: Token[] = [];
    // 处理html token nesting值
    tokens.forEach((tok: Token, idx: number) => {

        tok.vNodeKey = `mc-markdown-content-key-${idx}`;
        tok.tokenIndex = idx;

        if (tok.type.includes('html_')) {

            if (isSelfClosingTag(tok)) {
                tok.nesting = 0;
                return;
            }

            const stack = tok.type === 'html_block' ? htmlBlockTokenStack : htmlInlineTokenStack;

            matchHtmlToken(tok, stack);
        }
    })

    tokens.forEach((tok: Token, idx: number) => {
        let tmp: ASTNode;
        if (tok.nesting === 1) {
            // 开始标签
            tmp = genTreeNode(tok);
            curr.children.push(tmp);
            stack.push(curr);
            curr = tmp;
        } else if (tok.nesting === -1) {
            // 结束标签
            curr.closeNode = tok;
            if (!stack.length) {
                throw new Error('AST stack underflow.');
            }
            tmp = stack.pop()!;
            curr = tmp;
        } else if (tok.nesting === 0) {
            // 自闭合标签或 inline 内容
            if (tok.type === 'inline' && tok.children && tok.children.length > 0) {
                // 对于 inline 类型，递归处理其 children
                const inlineNode = processInlineToken(tok);
                curr.children.push(inlineNode);
            } else {
                // 普通 token，直接添加
                curr.children.push(tok);
            }
        } else {
            throw new Error(`Invalid nesting level found in token index ${idx}.`);
        }
    });

    if (stack.length !== 0) {
        // throw new Error('Unbalanced block open/close tokens.');
    }
    return rootNode.children as ASTNode[];
}

// 将html字符串转换为vnode
export const htmlToVNode = (htmlString: string): (VNode | string)[] => {
    if (!htmlString || !htmlString.trim()) return []

    if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
        return [htmlString];
    }

    const parser = new DOMParser()
    const doc = parser.parseFromString(`<body>${htmlString}</body>`, 'text/html')
    const vnodes: (VNode | string)[] = []

    doc.body.childNodes.forEach((node, index) => {
        const vnode = nodeToVNode(node);

        if (isVNode(vnode) || typeof vnode === 'string') {
            if (typeof vnode === 'object') (vnode as any).key = index
            vnodes.push(vnode)
        }
    })

    return vnodes
}

// 将dom节点转换为vnode
const nodeToVNode = (node: Node): VNode | string | null => {
    if (node.nodeType === Node.TEXT_NODE) return node.textContent
    if (node.nodeType !== Node.ELEMENT_NODE) return node.textContent || '';

    const elementNode = node as Element
    const props: Record<string, any> = {}

    if (elementNode.hasAttributes() && elementNode.attributes) {
        for (const attr of Array.from(elementNode.attributes)) {
            props[attr.name] = attr.value
        }
    }

    const children: (VNode | string)[] = []

    if (elementNode.childNodes.length > 0) {
        elementNode.childNodes.forEach(child => {
            const childVNode = nodeToVNode(child)
            if (isVNode(childVNode) || typeof childVNode === 'string') {
                children.push(childVNode)
            }
        })
    }

    if (!isValidTagName(elementNode.tagName)) {
        return node?.textContent || '';
    }

    return h(elementNode.tagName.toLowerCase(), props, children)
}

export const isValidTagName = (tagName: string | undefined): boolean => {
    if (!tagName) return false
    try {
        document.createElement(tagName)
        return true
    } catch (error) {
        return false
    }
}