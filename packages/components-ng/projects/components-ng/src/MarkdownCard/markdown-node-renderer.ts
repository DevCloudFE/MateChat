import { Renderer2, ViewContainerRef } from '@angular/core';
import type { Token } from 'markdown-it';
import markdownit from 'markdown-it';
import type { ASTNode } from '../components-common/MarkdownCard/common/mdCard.types';
import MdParserUtils from '../components-common/MarkdownCard/common/parser';

/**
 * Markdown节点渲染器，负责创建各种DOM节点
 */
export class MarkdownNodeRenderer {
  constructor(
    private renderer: Renderer2,
    private markdownContainer: ViewContainerRef,
    private mdt: markdownit,
    private isToken: (node: any) => boolean
  ) {}

  /**
   * 创建节点元素
   */
  createNodeElement(node: ASTNode | Token): Node | null {
    if (!node) return null;

    if ('nodeType' in node) {
      switch (node.nodeType) {
        case 'html_inline':
        case 'html_block':
          return this.createHTMLNode(node);
        case 'inline':
          return this.createInlineElement(node);
        case 'text':
          return this.createTextNodeElement((node as any).content || '');
        default:
          if (node.openNode?.tag) {
            return this.createTagElement(node);
          }
          break;
      }
    } else if (this.isToken(node)) {
      if (node.type === 'text') {
        return this.renderer.createText(node.content || '');
      } else if (node.type === 'inline') {
        return this.createInlineTokenElement(node);
      } else if (node.tag) {
        return this.createTokenTagElement(node);
      }
    }

    return null;
  }

  /**
   * 创建HTML节点
   */
  createHTMLNode(node: ASTNode): Node | null {
    if (!node.openNode?.content || !this.markdownContainer?.element?.nativeElement) return null;
    
    const htmlContainer = this.renderer.createElement(node.nodeType === 'html_block' ? 'div' : 'span');
    this.renderer.setProperty(htmlContainer, 'innerHTML', node.openNode.content);
    return htmlContainer.firstChild;
  }

  /**
   * 创建内联元素
   */
  createInlineElement(node: ASTNode): Node | null {
    if (!node.openNode || !this.markdownContainer?.element?.nativeElement) return null;
    
    const inlineContainer = this.renderer.createElement('div');
    const html = this.mdt.renderer.render([node.openNode as Token], this.mdt.options, {});
    this.renderer.setProperty(inlineContainer, 'innerHTML', html);
    return inlineContainer.firstChild;
  }

  /**
   * 创建文本节点元素
   */
  createTextNodeElement(content: string): Node {
    return this.renderer.createText(content);
  }

  /**
   * 创建标签元素
   */
  createTagElement(node: ASTNode): HTMLElement | null {
    if (!node.openNode?.tag) return null;

    const tagName = MdParserUtils.isValidTagName(node.openNode.tag)
      ? node.openNode.tag
      : 'div';
    const element = this.renderer.createElement(tagName);

    // 设置属性
    if (node.openNode.attrs) {
      node.openNode.attrs.forEach(([key, value]) => {
        if (key && value) {
          this.renderer.setAttribute(element, key, value);
        }
      });
    }

    // 添加内容
    if (node.openNode.content) {
      const textNode = this.renderer.createText(node.openNode.content);
      this.renderer.appendChild(element, textNode);
    }

    // 处理子节点
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        const childElement = this.createNodeElement(child as ASTNode | Token);
        if (childElement) {
          this.renderer.appendChild(element, childElement);
        }
      });
    }

    return element;
  }

  /**
   * 创建内联Token元素
   */
  createInlineTokenElement(node: Token): Node | null {
    if (!this.markdownContainer?.element?.nativeElement) return null;
    
    const div = this.renderer.createElement('div');
    this.renderer.setProperty(
      div,
      'innerHTML',
      this.mdt.renderer.render([node], this.mdt.options, {})
    );
    return div.firstChild;
  }

  /**
   * 创建Token标签元素
   */
  createTokenTagElement(node: Token): HTMLElement | null {
    if (!node.tag) return null;

    const tagName = MdParserUtils.isValidTagName(node.tag) ? node.tag : 'div';
    const element = this.renderer.createElement(tagName);

    // 设置属性
    if (node.attrs) {
      node.attrs.forEach(([key, value]) => {
        if (key && value) {
          this.renderer.setAttribute(element, key, value);
        }
      });
    }

    // 设置内容
    if (node.content) {
      const textNode = this.renderer.createText(node.content);
      this.renderer.appendChild(element, textNode);
    }

    return element;
  }
}