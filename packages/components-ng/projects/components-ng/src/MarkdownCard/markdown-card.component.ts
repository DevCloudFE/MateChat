import { DiffDOM } from 'diff-dom';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  ChangeDetectorRef,
  SimpleChanges,
  ViewChild,
  Output,
  EventEmitter,
  Renderer2,
  ViewContainerRef,
  TemplateRef,
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
  extends BaseComponent<MarkdownCardFoundation>
  implements OnInit, OnChanges, OnDestroy
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
  @Input() actionsTemplate: TemplateRef<any> | null = null;
  @Input() headerTemplate: TemplateRef<any> | null = null;
  @Input() contentTemplate: TemplateRef<any> | null = null;

  // 组件缓存映射表，用于存储已创建的CodeBlockComponent实例
  private codeBlockComponentsCache: Map<
    string,
    { componentRef: any; container: HTMLElement }
  > = new Map();

  @Output() afterMdtInit = new EventEmitter<markdownit>();
  @Output() typingStart = new EventEmitter<void>();
  @Output() typingEvent = new EventEmitter<void>();
  @Output() typingEnd = new EventEmitter<void>();

  @ViewChild('markdownContainer', { read: ViewContainerRef, static: true })
  markdownContainer!: ViewContainerRef;

  private mdt: markdownit;
  typingIndex: number = 0;
  isTyping: boolean = false;
  timer: number | null = null;
  parser = MdParserUtils;
  mdCardService;
  noDiff: boolean = false;

  constructor(private renderer: Renderer2, public cdr: ChangeDetectorRef) {
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
      // 配置filterOuterDiff钩子，识别code-block-wrapper元素并直接替换
      filterOuterDiff: (t1, t2, diffs) => {
        // 检查是否是class为code-block-wrapper的div元素
        const isTargetElement =
          t2.nodeName === 'DIV' &&
          t2.attributes &&
          t2.attributes.class &&
          t2.attributes.class.includes('code-block-wrapper');

        if (isTargetElement) {
          t1.innerDone = true;
          t2.innerDone = true;
        }
      },
    });
  }
  renderVisited: string[] = [];
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
    this.foundation.parseContent();
  }

  private renderContent(vnodes) {
    if (
      !this.markdownContainer ||
      !this.markdownContainer.element ||
      !this.markdownContainer.element.nativeElement
    ) {
      return;
    }

    if (this.noDiff) {
      this.renderContentNoDiff(vnodes);
      return;
    }

    const container = this.markdownContainer.element.nativeElement;
    const newContentFragement = this.renderer.createElement('div');
    // 从vNodes中找到所有class为code-block-wrapper的div元素
    const codeBlockWrappers = vnodes.filter((node) => {
      return (
        node.nodeName === 'DIV' &&
        node.className?.includes('code-block-wrapper')
      );
    });

    vnodes.forEach((node) => {
      if (
        node &&
        (node.nodeType ||
          typeof node === 'string' ||
          node instanceof HTMLElement)
      ) {
        if (codeBlockWrappers.includes(node)) {
          const codeNode = document.createElement('div');
          codeNode.className = 'code-block-wrapper';
          codeNode.setAttribute('key', node.attributes.key.value);
          newContentFragement.appendChild(codeNode);
        } else {
          newContentFragement.appendChild(node);
        }
      }
    });
    let newContent = newContentFragement;

    let oldNode = container;
    const patches = this.diffDom.diff(oldNode, newContent as any);
    this.diffDom.apply(container, patches);
    // 将codeBlockWrappers中的每个div元素替换container中的对应key属性的元素
    codeBlockWrappers.forEach((newCodeBlock) => {
      if (
        newCodeBlock &&
        newCodeBlock.attributes &&
        newCodeBlock.attributes.key
      ) {
        const key = newCodeBlock.attributes.key.value;
        const existingElement = container.querySelector(`[key="${key}"]`);
        if (existingElement && newCodeBlock instanceof HTMLElement) {
          if (newCodeBlock !== existingElement) {
            existingElement.replaceWith(newCodeBlock);
            this.renderVisited.push(key);
          }
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

  private processHTMLNode(node: ASTNode) {
    if (!node.openNode?.content) return;

    const parser = new DOMParser();
    const tagName = node.nodeType === 'html_block' ? 'div' : 'span';
    const container = parser.parseFromString(
      `<${tagName}>${node.openNode.content}</${tagName}>`,
      'text/html'
    );
    // 处理子节点
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        const childVnode = this.processASTNode(child as any);
        if (childVnode) {
          (container.body.firstChild || container.body).appendChild(childVnode);
        }
      });
    }
    return container.body;
  }

  private renderContentNoDiff(vnodes) {
    const container = this.markdownContainer.element.nativeElement;
    const newContentFragement = this.renderer.createElement('div');
    vnodes.forEach((node) => {
      if (
        node &&
        (node.nodeType ||
          typeof node === 'string' ||
          node instanceof HTMLElement)
      ) {
        newContentFragement.appendChild(node);
      }
    });
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(newContentFragement);
  }

  private processInlineToken(node: ASTNode | any) {
    let html = '';
    try {
      if (!node.openNode) {
        return null;
      }
      html = this.mdt.renderer.render([node.openNode], this.mdt.options, {});
    } catch (error) {
      console.error('Error rendering inline token:', node);
      return null;
    }

    // 将HTML字符串转换为DOM节点
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
    // 如果只有一个子节点，直接返回子节点而不是包含div
    if (doc.body && doc.body.childNodes.length === 1) {
      return doc.body.firstChild;
    }
    return doc.body;
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
          element.appendChild(childNode);
        }
      });
      return element;
    }

    node.children.forEach((child) => {
      const childNode = this.processASTNode(child);
      if (childNode) {
        element.appendChild(childNode);
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
      const parser = new DOMParser();
      const tagName = token.type === 'html_block' ? 'div' : 'span';
      const doc = parser.parseFromString(
        `<${tagName}>${token.content}</${tagName}>`,
        'text/html'
      );
      // 如果只有一个子节点，直接返回子节点而不是包含div
      if (doc.body.firstChild && doc.body.childNodes.length === 1) {
        return doc.body.firstChild;
      }
      return doc.body;
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
        element.appendChild(textNode);
      }
      return element;
    }

    return this.renderer.createText(token.content || '');
  }

  private createCodeBlock(language: string, code: string, blockIndex: number) {
    const key = `code-block-${blockIndex}`;

    // 检查缓存中是否已存在相同blockIndex的组件
    if (this.codeBlockComponentsCache.has(key)) {
      const cachedItem = this.codeBlockComponentsCache.get(key);
      if (cachedItem) {
        // 更新现有组件的属性
        const componentRef = cachedItem.componentRef;
        componentRef.setInput('language', language);
        componentRef.setInput('code', code);
        componentRef.setInput('theme', this.theme);

        // 触发变更检测
        componentRef.changeDetectorRef.detectChanges();
        // 返回缓存的容器，无需重新创建
        return cachedItem.container;
      }
    }

    // 缓存中不存在，创建新组件
    const codeBlockContainer = this.renderer.createElement('div');
    this.renderer.setAttribute(codeBlockContainer, 'key', key);

    const componentRef = this.markdownContainer.createComponent(
      CodeBlockComponent,
      {
        projectableNodes: [],
        injector: this.markdownContainer.injector,
      }
    );

    // 设置组件属性
    componentRef.instance.language = language;
    componentRef.instance.code = code;
    componentRef.instance.blockIndex = blockIndex;
    componentRef.instance.theme = this.theme;
    componentRef.instance.enableMermaid = this.enableMermaid;
    componentRef.instance.mermaidConfig = this.mermaidConfig || {};
    componentRef.instance.actionsTemplate = this.actionsTemplate;
    componentRef.instance.headerTemplate = this.headerTemplate;
    componentRef.instance.contentTemplate = this.contentTemplate;

    // 触发变更检测
    componentRef.changeDetectorRef.detectChanges();

    // 将组件的DOM元素附加到容器中
    this.renderer.appendChild(
      codeBlockContainer,
      componentRef.location.nativeElement
    );

    // 添加样式类
    this.renderer.addClass(codeBlockContainer, 'code-block-wrapper');

    // 缓存组件实例和容器
    this.codeBlockComponentsCache.set(key, {
      componentRef: componentRef,
      container: codeBlockContainer,
    });

    // 返回创建的DOM容器
    return codeBlockContainer;
  }

  private typewriterStart(): void {
    this.foundation.typewriterStart();
  }

  // 在组件销毁时清理缓存，避免内存泄漏
  override ngOnDestroy(): void {
    // 销毁所有缓存的组件实例
    this.codeBlockComponentsCache.forEach((cachedItem) => {
      cachedItem.componentRef.destroy();
    });
    this.codeBlockComponentsCache.clear();
  }
}
