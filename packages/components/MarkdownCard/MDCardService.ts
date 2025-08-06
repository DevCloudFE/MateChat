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
    function genTreeNode(node: Token | null): ASTNode {
        return {
            nodeType: node ? node.type.replace('_open', '') : '',
            openNode: node,
            closeNode: null,
            children: []
        };
    }

    function processInlineTokens(inlineTokens: Token[]): (ASTNode | Token)[] {
        const result: (ASTNode | Token)[] = [];
        let i = 0;
        
        while (i < inlineTokens.length) {
            const token = inlineTokens[i];
            
            if (token.nesting === 1) {
                // 开始标签
                const astNode = genTreeNode(token);
                result.push(astNode);
                
                // 找到对应的结束标签
                let j = i + 1;
                while (j < inlineTokens.length && 
                       (inlineTokens[j].type !== token.type.replace('_open', '_close') || 
                        inlineTokens[j].nesting !== -1)) {
                    j++;
                }
                
                if (j < inlineTokens.length) {
                    // 处理标签内的内容
                    const innerTokens = inlineTokens.slice(i + 1, j);
                    astNode.children = processInlineTokens(innerTokens);
                    astNode.closeNode = inlineTokens[j];
                    i = j + 1; // 跳过结束标签
                } else {
                    i++;
                }
            } else if (token.nesting === 0) {
                // 普通token，html_inline保持为token
                result.push(token);
                i++;
            } else {
                // 结束标签，跳过
                i++;
            }
        }
        
        return result;
    }

    // dummy root node
    var rootNode = genTreeNode(null);
    var curr = rootNode;
    var stack: ASTNode[] = [];
    tokens.forEach(function(tok, idx) {
        var tmp: ASTNode;
        if (tok.nesting == 1) {
            tmp = genTreeNode(tok);
            curr.children.push(tmp);
            stack.push(curr);
            curr = tmp;
        } else if (tok.nesting == -1) {
            curr.closeNode = tok;
            if(!stack.length) throw new Error('AST stack underflow.');
            tmp = stack.pop()!;
            curr = tmp;
        } else if (tok.nesting == 0) {
            if (tok.type === 'inline') {
                // 特殊处理inline token，递归解析其children
                curr.children.push(...processInlineTokens(tok.children || []));
            } else {
                curr.children.push(tok);
            }
        } else {
            throw new Error('Invalid nesting level found in token index ' + idx + '.');
        }
    });

    if (stack.length != 0)
        throw new Error('Unbalanced block open/close tokens.');

    return rootNode.children as ASTNode[];
  }
}