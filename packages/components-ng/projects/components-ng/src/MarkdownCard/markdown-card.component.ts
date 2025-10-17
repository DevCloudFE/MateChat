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
  ComponentFactoryResolver,
} from '@angular/core';
import markdownit from 'markdown-it';
import type { Token } from 'markdown-it';
import { MDCardService } from '../components-common/MarkdownCard/common/MDCardService';
import type { ASTNode } from '../components-common/MarkdownCard/common/mdCard.types';
import { CodeBlockComponent } from './code-block.component';
import {
  MarkdownCardProps,
  defaultTypingConfig,
} from '../components-common/MarkdownCard/common/mdCard.types';
import BaseComponent from '../Base/base.component';
import {
  MarkdownCardAdapter,
  MarkdownCardFoundation,
} from '../components-common/MarkdownCard/foundation';
import MdParserUtils from '../components-common/MarkdownCard/common/parser';
import { MarkdownNodeRenderer } from './markdown-node-renderer';

@Component({
  selector: 'mc-markdown-card',
  templateUrl: './markdown-card.component.html',
  styleUrls: ['./markdown-card.component.scss'],
})
export class MarkdownCardComponent
  extends BaseComponent
  implements OnInit, OnChanges
{
  @Input() content: string = '';
  @Input() typing: boolean = false;
  @Input() enableThink: boolean = false;
  @Input() typingOptions: MarkdownCardProps['typingOptions'] | any = {};
  @Input() thinkOptions: MarkdownCardProps['thinkOptions'] = {};
  @Input() mdOptions: MarkdownCardProps['mdOptions'] = {};
  @Input() mdPlugins: MarkdownCardProps['mdPlugins'] = [];
  @Input() customXssRules: MarkdownCardProps['customXssRules'] = [];
  @Input() theme: 'light' | 'dark' | any = 'light';
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
  private nodeRenderer: MarkdownNodeRenderer;

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
    this.foundation = new MarkdownCardFoundation(this.adapter);
    this.nodeRenderer = new MarkdownNodeRenderer(
      this.renderer,
      this.mdt,
      (node) => this.foundation.isToken(node)
    );
  }

  ngOnInit(): void {
    this.mdCardService.setMdPlugins(this.mdPlugins || [], this.mdt);
    this.parseContent();
    this.afterMdtInit.emit(this.mdt);
  }

  override get adapter(): MarkdownCardAdapter {
    return {
      ...super.adapter,
      locale: (key: string, params?: Record<string, string>) =>
        this.adapter.locale(key, params),
      typingEnd: () => this.typingEnd.emit(),
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content']) {
      if (!this.typing) {
        this.typingIndex = this.content?.length || 0;
        this.parseContent();
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
        this.markdownContainer.element.nativeElement.removeChild(
          this.markdownContainer.element.nativeElement.firstChild
        );
      }
    }

    // 解析 Markdown 内容
    const tokens: any = this.mdt.parse(content, {});
    const ast = this.parser.tokensToAst(tokens);
    const vnodes = this.astToVnodes(ast);
    this.renderContent(vnodes);
  }

  private renderContent(vnodes) {
    // 将vnodes节点添加到this.markdownContainer.element.nativeElement
    vnodes.forEach((node) => {
      // 判断是否是node节点且容器有效
      if (
        node &&
        this.markdownContainer &&
        this.markdownContainer.element &&
        this.markdownContainer.element.nativeElement
      ) {
        const container = this.markdownContainer.element.nativeElement;
        // 检查node是否为有效的DOM节点或可追加的节点类型
        if (
          node.nodeType ||
          typeof node === 'string' ||
          node instanceof HTMLElement
        ) {
          container.appendChild(node);
        }
      }
    });
  }

  private astToVnodes(nodes: ASTNode[]) {
    return nodes.map((node) => this.processASTNode(node));
  }

  private processASTNode(node: ASTNode | Token | any) {
    if (node.nodeType === 'html_inline' || node.nodeType === 'html_block') {
      return this.processHTMLNode(node);
    }

    if (node.nodeType === 'inline') {
      return this.processInlineToken(node);
    }
    if (this.foundation.isToken(node)) {
      return this.processToken(node);
    }

    return this.processASTNodeInternal(node);
  }

  private processHTMLNode(node: ASTNode): void {
    if (!node.openNode?.content) return;

    const container = this.renderer.createElement(
      node.nodeType === 'html_block' ? 'div' : 'span'
    );
    this.renderer.setProperty(container, 'innerHTML', node.openNode.content);

    // 处理子节点
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        this.processASTNode(child as any);
      });
    }
    return container;
  }

  private processInlineToken(node: ASTNode | any) {
    const div = this.renderer.createElement('div');
    const html = this.mdt.renderer.render(
      [node.openNode],
      this.mdt.options,
      {}
    );
    
    // 将HTML字符串转换为DOM节点
    this.renderer.setProperty(div, 'innerHTML', html);
    
    // 如果只有一个子节点，直接返回子节点而不是包含div
    if (div.firstChild && div.childNodes.length === 1) {
      return div.firstChild;
    }
    
    return div;
  }

  private processFenceNode(token: Token) {
    const language =
      token.info?.replace(/<span\b[^>]*>/i, '').replace('</span>', '') || '';
    const code = token.content || '';
    return this.createCodeBlock(language, code, (token as any).tokenIndex || 0);
  }

  private processASTNodeInternal(node: ASTNode | any) {
    let tagName = 'div';
    if (node.openNode?.tag && this.parser.isValidTagName(node.openNode?.tag)) {
      tagName = node.openNode?.tag;
    }
    const element = this.renderer.createElement(tagName);

    // 设置属性
    if (node.openNode.attrs) {
      node.openNode.attrs.forEach(([key, value]) => {
        this.renderer.setAttribute(element, key, value);
      });
    }

    // 特殊处理fence类型的token
    if (node.openNode.type === 'fence') {
      return this.processFenceNode(node.openNode as unknown as Token);
    }

    // 处理所有带tag的AST节点
    if (node.openNode?.tag) {
      let tagName = this.parser.isValidTagName(node.openNode?.tag)
        ? node.openNode?.tag
        : 'div';
      const element = this.renderer.createElement(tagName);

      // 递归处理所有子节点并添加到当前元素
      node.children.forEach((child) => {

        const childNode = this.processASTNode(child);
        if (childNode) {
          this.renderer.appendChild(element, childNode);
        }
      });
      return element;
    }

    node.children.forEach((child) => {
      const childNode = this.processASTNode(child);
      if (childNode) {
        this.renderer.appendChild(element, childNode);
      }
    });
    return element;
  }

  private processToken(token: Token) {
    if (token.type === 'text') {
      const textNode = this.renderer.createText(token.content || '');
      return textNode;
    }

    if (token.type === 'inline') {
      return this.processInlineToken(token);
    }

    if (token.type === 'fence') {
      return this.processFenceNode(token);
    }

    if (token.type === 'softbreak') {
      if (this.mdt.options.breaks) {
        const br = this.renderer.createElement('br');
        return br;
      } else {
        const textNode = this.renderer.createText('\n');
        return textNode;
      }
    }

    if (token.type === 'html_block' || token.type === 'html_inline') {
      const htmlContainer = this.renderer.createElement(
        token.type === 'html_block' ? 'div' : 'span'
      );
      this.renderer.setProperty(
        htmlContainer,
        'innerHTML',
        token.content || ''
      );
      return htmlContainer;
    }

    if (token.tag) {
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

      return element;
    }

    const textNode = this.renderer.createText(token.content || '');
    return textNode;
  }

  private createCodeBlock(language: string, code: string, blockIndex: number) {
    const factory = this.resolver.resolveComponentFactory(CodeBlockComponent);
    const componentRef = this.markdownContainer.createComponent(factory);

    componentRef.instance.language = language;
    componentRef.instance.code = code;
    componentRef.instance.blockIndex = blockIndex;
    componentRef.instance.theme = this.theme;
    componentRef.instance.enableMermaid = this.enableMermaid;
    componentRef.instance.mermaidConfig = this.mermaidConfig || {};

    componentRef.changeDetectorRef.detectChanges();
    return componentRef.hostView;
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
