import { DiffDOM } from 'diff-dom';
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
  TemplateRef,
  EmbeddedViewRef,
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

@Component({
  selector: 'mc-markdown-card',
  templateUrl: './markdown-card.component.html',
  styleUrls: ['./markdown-card.component.scss'],
})
export class MarkdownCardComponent
  extends BaseComponent
  implements OnInit, OnChanges
{
  private diffDom: DiffDOM;
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

  constructor(
    private resolver: ComponentFactoryResolver,
    private renderer: Renderer2
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

    // 初始化 diffDom 实例
    this.diffDom = new DiffDOM({
      components: ['mc-code-block'],
    });
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
      typingStart: () => this.typingStart.emit(),
      typingEnd: () => this.typingEnd.emit(),
      typingEvent: () => this.typingEvent.emit(),
      parseContent: (content: string) => {
        // 解析 Markdown 内容
        const tokens: any = this.mdt.parse(content, {});
        const ast = this.parser.tokensToAst(tokens);
        const vnodes = this.astToVnodes(ast);
        this.renderContent(vnodes);
      },
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content']) {
      if (!this.typing) {
        this.typingIndex = this.content?.length || 0;
        this.parseContent();
        return;
      }
      if (this.content.indexOf(changes['content']?.previousValue) === -1) {
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

  private parseContent() {
    this.foundation.parseContent(this.content || '');
  }

  private renderContent(vnodes) {
    if (
      !this.markdownContainer ||
      !this.markdownContainer.element ||
      !this.markdownContainer.element.nativeElement
    ) {
      return;
    }

    const container = this.markdownContainer.element.nativeElement;

    // 创建新内容容器
    const newContent = document.createElement('div');
    vnodes.forEach((node) => {
      if (
        node &&
        (node.nodeType ||
          typeof node === 'string' ||
          node instanceof HTMLElement)
      ) {
        newContent.appendChild(node);
      }
    });

    // 不适用diff-dom，直接替换内容
    let noDIff = true;
    if (noDIff) {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      container.appendChild(newContent);
      return;
    }

    let oldNode = container;
    let newNode = newContent;
    const patches = this.diffDom.diff(oldNode, newNode);
    this.diffDom.apply(container, patches);
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
    let html = '';
    try {
      html = this.mdt.renderer.render([node.openNode], this.mdt.options, {});
    } catch (error) {
      console.error('Error rendering inline token:', node);
      return null;
    }

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
      return this.renderer.createText(token.content || '');
    }

    if (token.type === 'inline') {
      return this.processInlineToken(token);
    }

    if (token.type === 'fence') {
      return this.processFenceNode(token);
    }

    if (token.type === 'softbreak') {
      if (this.mdt.options.breaks) {
        return this.renderer.createElement('br');
      } else {
        return this.renderer.createText('\n');
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

    return this.renderer.createText(token.content || '');
  }

  private createCodeBlock(language: string, code: string, blockIndex: number) {
    const codeBlockContainer = this.renderer.createElement('div');
    const factory = this.resolver.resolveComponentFactory(CodeBlockComponent);
    // 创建组件实例，使用当前组件的注入器
    const componentRef = factory.create(
      this.markdownContainer.injector,
      [],
      codeBlockContainer // 直接将新容器作为组件的宿主元素
    );
    // 设置组件属性
    componentRef.instance.language = language;
    componentRef.instance.code = code;
    componentRef.instance.blockIndex = blockIndex;
    componentRef.instance.theme = this.theme;
    componentRef.instance.enableMermaid = this.enableMermaid;
    componentRef.instance.mermaidConfig = this.mermaidConfig || {};
    // 触发变更检测
    componentRef.changeDetectorRef.detectChanges();
    this.renderer.addClass(codeBlockContainer, 'code-block-wrapper');
    return codeBlockContainer;
  }

  private typewriterStart(): void {
    this.foundation.typewriterStart();
  }
}
