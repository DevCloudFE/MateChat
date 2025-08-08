import { filterXSS, getDefaultCSSWhiteList, getDefaultWhiteList, type IWhiteList } from 'xss';
import type { CustomXssRule, MdPlugin } from './mdCard.types';
import type { Token } from 'markdown-it';
import type { VNode } from 'vue';

// AST节点类型定义
export interface ASTNode {
  nodeType: string;
  openNode: Token | null;
  closeNode: Token | null;
  children: (ASTNode | Token)[];
}

export class MDCardService {
  private xssWhiteList = getDefaultWhiteList();
  private cssWhiteList = getDefaultCSSWhiteList();

  constructor() {
    this.setDefaultXss();
  }

  private setDefaultXss() {
    this.xssWhiteList['input'] = ['type', 'checked', 'disabled', 'class'];
    this.xssWhiteList['label'] = ['for'];
    this.xssWhiteList['ul'] = ['class'];
    this.xssWhiteList['div'] = ['class'];
    this.xssWhiteList['a'] = ['href', 'class', 'target', 'name'];
    this.xssWhiteList['ol'] = ['start'];

    this.xssWhiteList['p'] = ['class'];
    this.xssWhiteList['span'] = ['style', 'class', 'title', 'id'];
    this.xssWhiteList['svg'] = ['style', 'class', 'width', 'height', 'viewbox', 'preserveaspectratio', 'id', 'fill', 'stroke'];
    this.xssWhiteList['path'] = ['style', 'class', 'd', 'id', 'fill', 'stroke'];
    this.xssWhiteList['th'] = ['style'];
    this.xssWhiteList['td'] = ['style'];
  }

  private onIgnoreTagAttr(tag: string, name: string, value: string, isWhiteAttr: boolean) {
    if (!isWhiteAttr && (name === 'id' || (tag === 'span' && name === 'style'))) {
      return name + '=' + value;
    }
  }

  getXssWhiteList() {
    return this.xssWhiteList;
  }

  setXssWhiteList(list: IWhiteList) {
    this.xssWhiteList = list;
  }

  setCustomXssRules(rules: CustomXssRule[]) {
    if (rules) {
      rules.forEach((rule) => {
        if (rule['value'] === null) {
          delete this.xssWhiteList[rule['key']];
        } else {
          this.xssWhiteList[rule['key']] = rule['value'];
        }
      });
    }
  }


  setMdPlugins(plugins: MdPlugin[], mdt: any) {
    if (plugins && plugins.length) {
      plugins.forEach(item => {
        const { plugin, opts } = item;
        mdt.use(plugin, opts);
      })
    }
  }

  // 判断是否是结束标签
  private isClosingTag(openToken: Token, closeToken: Token): boolean {
    // 简单的标签匹配逻辑，可以根据需要扩展
    const openContent = openToken?.content || '';
    const closeContent = closeToken?.content || '';
    
    // 提取标签名
    const openTagMatch = openContent.match(/<(\w+)/);
    const closeTagMatch = closeContent.match(/<\/(\w+)/);
    
    if (openTagMatch && closeTagMatch) {
      return openTagMatch[1] === closeTagMatch[1];
    }
    
    return false;
  }

  private isSelfClosingTag(token: Token): boolean {
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
    const allMatches: Array<{type: 'open' | 'close', tagName: string, index: number}> = [];
    
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

  filterHtml(html: string) {
    return filterXSS(html, {
      whiteList: this.xssWhiteList,
      onIgnoreTagAttr: this.onIgnoreTagAttr,
      css: {
        whiteList: Object.assign({}, this.cssWhiteList, {
          top: true,
          left: true,
          bottom: true,
          right: true,
        }),
      },
    });
  }

  tokensToAst(tokens: Token[]): ASTNode[] {
    const genTreeNode = (node: Token | null): ASTNode => {
      return {
        nodeType: node ? node.type.replace('_open', '') : 'root',
        openNode: node,
        closeNode: null,
        children: []
      };
    };

    // 递归处理 inline 类型的 token
    const processInlineToken = (token: Token): ASTNode => {
      const node = genTreeNode(token);
      
      // 如果 token 有 children，递归处理它们
      if (token.children && token.children.length > 0) {
        node.children = this.tokensToAst(token.children);
      }
      
      return node;
    };

    const processHtmlBlockToken = (token: Token): ASTNode => {
      const node = genTreeNode(token);
      node.nodeType = 'html_block';
      return node;
    };

    // 创建根节点
    const rootNode = genTreeNode(null);
    let curr: ASTNode = rootNode;
    const stack: ASTNode[] = [];
    const htmlBlockTokenStack: Token[] = [];
    const htmlBlockASTNodeStack: ASTNode[] = [];

    tokens.forEach((tok: Token, idx: number) => {
      let tmp: ASTNode;

      if ((tok.type === 'html_block') && !this.isSelfClosingTag(tok)) {

        // 判断当前token是否上个html_block token的闭合标签
        const prevToken = htmlBlockTokenStack[htmlBlockTokenStack.length - 1];
        const isClosingTag = this.isClosingTag(prevToken, tok);

        if (isClosingTag) {
          // 是闭合标签，弹出tokenStack对应的token
          htmlBlockTokenStack.pop();
          
          // 如果tokenStack空了，将最外层的astnode添加到当前节点
          if (htmlBlockTokenStack.length === 0) {
            const htmlBlockNode = htmlBlockASTNodeStack.shift()!;
            curr.children.push(htmlBlockNode);
          }
        } else {
          // 不是闭合标签，创建一个新的astnode压入对应栈
          const htmlBlockNode = processHtmlBlockToken(tok);
          htmlBlockASTNodeStack.push(htmlBlockNode);
          htmlBlockTokenStack.push(tok);
        }
        return; // 跳过后续处理
      } else {
        if (htmlBlockASTNodeStack.length > 0) {
          const topASTNode = htmlBlockASTNodeStack[htmlBlockASTNodeStack.length - 1];
          topASTNode.children.push(tok);
          return; // 跳过后续处理
        }
      }

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
      throw new Error('Unbalanced block open/close tokens.');
    }

    // 处理剩余的 HTML 块栈
    if (htmlBlockASTNodeStack.length > 0) {
      // 将剩余的AST节点添加到根节点
      rootNode.children.push(...htmlBlockASTNodeStack);
    }

    return rootNode.children as ASTNode[];
  }
}