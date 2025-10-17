import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Renderer2,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';
import markdownit from 'markdown-it';
import type { Token } from 'markdown-it';
import { MDCardService } from '../components-common/MarkdownCard/common/MDCardService';
import type { ASTNode } from '../components-common/MarkdownCard/common/mdCard.types';
import { CodeBlockComponent } from './code-block.component';
import { MarkdownCardProps, defaultTypingConfig } from '../components-common/MarkdownCard/common/mdCard.types';
import BaseComponent from '../Base/base.component';
import { MarkdownCardAdapter, MarkdownCardFoundation } from '../components-common/MarkdownCard/foundation';
import MdParserUtils from '../components-common/MarkdownCard/common/parser';

@Component({
  selector: 'mc-markdown-card',
  templateUrl: './markdown-card.component.html',
  styleUrls: ['./markdown-card.component.scss'],
})
export class MarkdownCardComponent extends BaseComponent implements OnInit, OnChanges {
  @Input() content: string = '';
  @Input() typing: boolean = false;
  @Input() enableThink: boolean = false;
  @Input() typingOptions: MarkdownCardProps['typingOptions'] = {};
  @Input() thinkOptions: MarkdownCardProps['thinkOptions'] = {};
  @Input() mdOptions: MarkdownCardProps['mdOptions'] = {};
  @Input() mdPlugins: MarkdownCardProps['mdPlugins'] = [];
  @Input() customXssRules: MarkdownCardProps['customXssRules'] = [];
  @Input() theme: 'light' | 'dark' = 'light';
  @Input() enableMermaid: boolean = false;
  @Input() mermaidConfig: MarkdownCardProps['mermaidConfig'] = {};

  @Output() afterMdtInit = new EventEmitter<markdownit>();
  @Output() typingStart = new EventEmitter<void>();
  @Output() typingEvent = new EventEmitter<void>();
  @Output() typingEnd = new EventEmitter<void>();

  @ViewChild('markdownContainer', { read: ViewContainerRef, static: true })
  markdownContainer!: ViewContainerRef;

  private mdt: markdownit;
  private typingIndex: number = 0;
  private isTyping: boolean = false;
  private timer: number | null = null;
  private parser = MdParserUtils;
  mdCardService;

  constructor(
    private resolver: ComponentFactoryResolver,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    super();
    this.mdt = markdownit({
      breaks: true,
      linkify: true,
      html: true,
      highlight: (str, lang) => {
        // 与Vue组件保持一致的高亮处理
        return '';
      },
      ...this.mdOptions,
    });
    this.mdCardService = new MDCardService();
  }

  ngOnInit(): void {
    this.foundation = new MarkdownCardFoundation(this.adapter);
    this.mdCardService.setMdPlugins(this.mdPlugins || [], this.mdt);
    this.parseContent();
    this.afterMdtInit.emit(this.mdt);
  }

  override get adapter(): MarkdownCardAdapter {
    return {
      ...super.adapter,
      locale: (key: string, params?: Record<string, string>) => this.adapter.locale(key, params),
      typingEnd: () => this.typingEnd.emit(),
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content']) {
      if (!this.typing) {
        this.typingIndex = this.content?.length || 0;
        setTimeout(() => this.parseContent(), 100);
        return;
      }

      if (
        this.content &&
        changes['content']?.previousValue &&
        this.content.indexOf(changes['content']?.previousValue) === -1
      ) {
        this.typingIndex = 0;
      }

      // 使用setTimeout模拟Vue的nextTick行为
      setTimeout(() => this.typewriterStart());
    }

    if (changes['enableThink'] || changes['thinkOptions'] || changes['theme']) {
      this.parseContent();
    }

    if (changes['customXssRules']) {
      this.mdCardService.setCustomXssRules(this.customXssRules || []);
      this.parseContent();
    }

    if (changes['mdPlugins']) {
      this.mdCardService.setMdPlugins(this.mdPlugins || [], this.mdt);
      this.parseContent();
    }
  }

  private parseContent(): void {
    let content = this.content || '';
    if (this.typing && this.isTyping) {
      content = this.foundation.parseTypingContent(content);
    }

    if (this.enableThink) {
      content = this.foundation.getThinkContent(content, this.thinkOptions);
    }

    // 清空容器
    this.markdownContainer?.clear();
    // 同时清空nativeElement的子节点，确保所有内容都被清除
    if (this.markdownContainer?.element?.nativeElement) {
      while (this.markdownContainer.element.nativeElement.firstChild) {
        this.markdownContainer.element.nativeElement.removeChild(this.markdownContainer.element.nativeElement.firstChild);
      }
    }

    // 解析 Markdown 内容
    const tokens: any = this.mdt.parse(content, {});
    const ast = this.parser.tokensToAst(tokens);
    this.astToVnodes(ast);
  }

  private astToVnodes(nodes: ASTNode[]): void {
    nodes.forEach((node) => this.processASTNode(node));
  }

  private processASTNode(node: ASTNode | Token): void {
    if ('nodeType' in node) {
      // 处理ASTNode类型
      if (node.nodeType === 'html_inline' || node.nodeType === 'html_block') {
        this.processHTMLNode(node as ASTNode);
      } else if (node.nodeType === 'inline') {
        this.processInlineNode(node as ASTNode);
      } else if (node.openNode?.tag) {
        this.processTagNode(node as ASTNode);
      }
    } else if (this.foundation.isToken(node)) {
      // 处理Token类型
      this.processToken(node);
    }
  }

  private processHTMLNode(node: ASTNode): void {
    if (!this.markdownContainer?.element?.nativeElement || !node.openNode?.content) return;
    
    const container = this.renderer.createElement(node.nodeType === 'html_block' ? 'div' : 'span');
    this.renderer.setProperty(container, 'innerHTML', node.openNode.content);

    // 处理子节点
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        this.processASTNode(child as any);
      });
    }

    this.markdownContainer.element.nativeElement.appendChild(container);
  }

  private processInlineNode(node: ASTNode): void {
    if (!this.markdownContainer?.element?.nativeElement || !node.openNode) return;
    
    // 处理inline节点
    const div = this.renderer.createElement('div');
    const html = this.mdt.renderer.render([node.openNode as Token], this.mdt.options, {});
    this.renderer.setProperty(div, 'innerHTML', html);
    
    // 将div的内容转移到容器中，而不是直接添加div
    while (div.firstChild) {
      this.markdownContainer.element.nativeElement.appendChild(div.firstChild);
    }
  }

  private processFenceNode(token: Token): void {
    const language =
      token.info?.replace(/<span\b[^>]*>/i, '').replace('</span>', '') || '';
    const code = token.content || '';
    this.createCodeBlock(language, code, (token as any).tokenIndex || 0);
  }

  private processTagNode(node: ASTNode): void {
    if (!this.markdownContainer?.element?.nativeElement || !node.openNode?.tag) return;

    // 特殊处理fence类型的token
    if (node.openNode.type === 'fence') {
      this.processFenceNode(node.openNode as unknown as Token);
      return;
    }

    const tagName = this.parser.isValidTagName(node.openNode.tag)
      ? node.openNode.tag
      : 'div';
    const element = this.renderer.createElement(tagName);

    // 设置属性
    if (node.openNode.attrs) {
      node.openNode.attrs.forEach(([key, value]) => {
        this.renderer.setAttribute(element, key, value);
      });
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
    console.log('element', element);
    this.markdownContainer.element.nativeElement.appendChild(element);
  }

  private processToken(token: Token): void {
    if (!this.markdownContainer?.element?.nativeElement) return;
    
    const container = this.markdownContainer.element.nativeElement;
    
    if (token.type === 'text') {
      const textNode = this.renderer.createText(token.content || '');
      container.appendChild(textNode);
    } else if (token.type === 'inline') {
      // 处理inline类型的token
      const div = this.renderer.createElement('div');
      // 使用renderer.render而不是mdt.render来保持与Vue组件一致
      const html = this.mdt.renderer.render([token], this.mdt.options, {});
      this.renderer.setProperty(div, 'innerHTML', html);
      // 将div的内容转移到容器中，而不是直接添加div
      while (div.firstChild) {
        container.appendChild(div.firstChild);
      }
    } else if (token.type === 'fence') {
      this.processFenceNode(token);
    } else if (token.type === 'softbreak') {
      // 与Vue组件保持一致，根据breaks选项决定是否添加br
      if (this.mdt.options.breaks) {
        const br = this.renderer.createElement('br');
        container.appendChild(br);
      } else {
        // 添加换行文本节点
        const textNode = this.renderer.createText('\n');
        container.appendChild(textNode);
      }
    } else if (token.type === 'html_block' || token.type === 'html_inline') {
      const htmlContainer = this.renderer.createElement(
        token.type === 'html_block' ? 'div' : 'span'
      );
      this.renderer.setProperty(htmlContainer, 'innerHTML', token.content || '');
      container.appendChild(htmlContainer);
    } else if (token.tag) {
      const tagName = this.parser.isValidTagName(token.tag) ? token.tag : 'div';
      const element = this.renderer.createElement(tagName);

      // 设置属性
      if (token.attrs) {
        token.attrs.forEach(([key, value]) => {
          this.renderer.setAttribute(element, key, value);
        });
      }

      // 设置内容
      if (token.content) {
        const textNode = this.renderer.createText(token.content);
        this.renderer.appendChild(element, textNode);
      }

      container.appendChild(element);
    }
  }

  private createNodeElement(node: ASTNode | Token): Node | null {
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
            return this.createTagElement(node as ASTNode);
          }
          break;
      }
    } else if (this.foundation.isToken(node)) {
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

  private createHTMLNode(node: ASTNode): Node | null {
    if (!node.openNode?.content || !this.markdownContainer?.element?.nativeElement) return null;
    
    const htmlContainer = this.renderer.createElement(node.nodeType === 'html_block' ? 'div' : 'span');
    this.renderer.setProperty(htmlContainer, 'innerHTML', node.openNode.content);
    return htmlContainer.firstChild;
  }

  private createInlineElement(node: ASTNode): Node | null {
    if (!node.openNode || !this.markdownContainer?.element?.nativeElement) return null;
    
    const inlineContainer = this.renderer.createElement('div');
    const html = this.mdt.renderer.render([node.openNode as Token], this.mdt.options, {});
    this.renderer.setProperty(inlineContainer, 'innerHTML', html);
    return inlineContainer.firstChild;
  }

  private createTextNodeElement(content: string): Node {
    return this.renderer.createText(content);
  }

  private createTagElement(node: ASTNode): HTMLElement | null {
    if (!node.openNode?.tag) return null;

    const tagName = this.parser.isValidTagName(node.openNode.tag)
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

  private createInlineTokenElement(node: Token): Node | null {
    if (!this.markdownContainer?.element?.nativeElement) return null;
    
    const div = this.renderer.createElement('div');
    this.renderer.setProperty(
      div,
      'innerHTML',
      this.mdt.renderer.render([node], this.mdt.options, {})
    );
    return div.firstChild;
  }

  private createTokenTagElement(node: Token): HTMLElement | null {
    if (!node.tag) return null;

    const tagName = this.parser.isValidTagName(node.tag) ? node.tag : 'div';
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

  private createCodeBlock(
    language: string,
    code: string,
    blockIndex: number
  ): void {
    if (!this.markdownContainer) return;
    
    const factory = this.resolver.resolveComponentFactory(CodeBlockComponent);
    const componentRef = this.markdownContainer.createComponent(factory);

    componentRef.instance.language = language;
    componentRef.instance.code = code;
    componentRef.instance.blockIndex = blockIndex;
    componentRef.instance.theme = this.theme;
    componentRef.instance.enableMermaid = this.enableMermaid;
    componentRef.instance.mermaidConfig = this.mermaidConfig || {};

    componentRef.changeDetectorRef.detectChanges();
  }

  private typewriterStart(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.isTyping = true;
    this.typingStart.emit();
    
    const options = { ...defaultTypingConfig, ...this.typingOptions };

    const typingStep = () => {
      let step = options.step || 2;
      if (Array.isArray(options.step)) {
        step =
          options.step[0] +
          Math.floor(Math.random() * (options.step[1] - options.step[0]));
      }
      this.typingIndex += step;
      this.parseContent();
      this.typingEvent.emit();

      if (this.typingIndex >= this.content!.length) {
        this.typewriterEnd();
        this.parseContent();
        return;
      }

      this.timer = window.setTimeout(
        typingStep,
        typeof options.interval === 'number' ? options.interval : 50
      );
    };

    this.timer = window.setTimeout(typingStep);
  }

  private typewriterEnd(): void {
    this.foundation.typewriterEnd();
  }
}
