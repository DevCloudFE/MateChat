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
    // 判断token.content里面是否包含成对的标签，或者是否自闭合标签
    const content = token.content || '';
    const openTagMatch = content.match(/<(\w+)/);
    const closeTagMatch = content.match(/<\/(\w+)/);
    if (openTagMatch && closeTagMatch) {
      return openTagMatch[1] === closeTagMatch[1];
    }
    return false;
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
    const htmlBlockStack: Token[] = [];
    const htmlBlockTokenStack: Token[] = [];

    tokens.forEach((tok: Token, idx: number) => {
      let tmp: ASTNode;

      if (tok.type === 'html_block') {
        // 如果当前的htmlBlockStack为空，则将当前的htmlBlockToken压入栈中
        if (htmlBlockTokenStack.length === 0) {
          htmlBlockStack.push(tok);
          if (!this.isSelfClosingTag(tok)) {
            htmlBlockTokenStack.push(tok);
          }
        } else {
          // 如果当前栈不为空，判断当前tok是否是当前栈的结束标签，如果是，则将当前栈的htmlBlockToken压入栈中，然后将创建一个新的treeNode，将当前栈作为treeNode的children，清空栈
          
          if (this.isSelfClosingTag(tok)) {
            htmlBlockStack.push(tok);
          }

          const firstToken = htmlBlockStack[0];
          const prevToken = htmlBlockTokenStack[htmlBlockTokenStack.length - 1];
          // 是否成对的开闭标签
          const matchTag = this.isClosingTag(prevToken, tok);

          if (!this.isSelfClosingTag(tok)) {
            htmlBlockStack.push(tok);
          }

          if (matchTag) {
            htmlBlockTokenStack.pop();
          } else {
            htmlBlockTokenStack.push(tok);
          }

          if (!htmlBlockTokenStack.length) {
            const htmlBlockNode = processHtmlBlockToken(firstToken);
            htmlBlockNode.children = htmlBlockStack.map(token => token);
            curr.children.push(htmlBlockNode);
            htmlBlockStack.length = 0; // 清空栈
          }
        }
        return; // 跳过后续处理
      } else if (tok.type !== 'html_block' && htmlBlockStack.length > 0) {
        // 如果当前的htmlBlockStack不为空，则将当前的htmlBlockToken压入栈中，跳过本次循环
        htmlBlockStack.push(tok);
        return; // 跳过本次循环
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
    if (htmlBlockStack.length > 0) {
      const htmlBlockNode = processHtmlBlockToken(htmlBlockStack[0]);
      htmlBlockNode.children = htmlBlockStack.map(token => token);
      rootNode.children.push(htmlBlockNode);
    }

    return rootNode.children;
  }
}