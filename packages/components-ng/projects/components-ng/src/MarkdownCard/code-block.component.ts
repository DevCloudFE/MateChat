import { Component, Input, OnInit, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import hljs from 'highlight.js';
import { TemplateRef } from '@angular/core';
import { MDCardService } from '../components-common/MarkdownCard/common/MDCardService';
import { MermaidService } from '../components-common/MarkdownCard/common/MermaidService';
import type { MermaidConfig } from '../components-common/MarkdownCard/common/mdCard.types';

@Component({
  selector: 'mc-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss']
})
export class CodeBlockComponent implements OnInit, OnChanges {
  @Input() code: string = '';
  @Input() language: string = '';
  @Input() blockIndex: number = 0;
  @Input() theme: 'light' | 'dark' = 'light';
  @Input() enableMermaid: boolean = false;
  @Input() mermaidConfig: MermaidConfig = {};
  @Input() contentTemplate: TemplateRef<any> | null = null;
  @Input() headerTemplate: TemplateRef<any> | null = null;
  @Input() actionsTemplate: TemplateRef<any> | null = null;

  @ViewChild('rootRef') rootRef!: ElementRef;
  @ViewChild('mermaidContent') mermaidContentRef!: ElementRef;

  expanded: boolean = true;
  copied: boolean = false;
  mermaidContent: string = '';
  showMermaidDiagram: boolean = true;
  highlightedCode: string = '';
  isMermaid: boolean = false;
  
  private mermaidService: MermaidService | null = null;
  private copySubject = new Subject<void>();
  private mdCardService: MDCardService;
  constructor() {
    this.mdCardService = new MDCardService();
    this.copySubject.pipe(debounceTime(300)).subscribe(() => this.copyCodeInternal());
  }

  ngOnInit(): void {
    this.checkIsMermaid();
    this.updateHighlightedCode();
    if (this.isMermaid) {
      this.renderMermaid();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['code'] || changes['language']) {
      this.checkIsMermaid();
      this.updateHighlightedCode();
    }
    if (changes['enableMermaid'] || changes['theme'] || changes['code']) {
      this.checkIsMermaid();
      if (this.isMermaid) {
        this.renderMermaid();
      }
    }
    if (changes['showMermaidDiagram'] && this.isMermaid && this.showMermaidDiagram) {
      this.renderMermaid();
    }
  }

  private checkIsMermaid(): void {
    this.isMermaid = this.enableMermaid && this.language?.toLowerCase() === 'mermaid';
  }

  private updateHighlightedCode(): void {
    try {
      const typeIndex = this.code.indexOf(`<span class="mc-typewriter`);

      if (this.language && hljs.getLanguage(this.language)) {
        if (typeIndex !== -1) {
          this.highlightedCode = hljs.highlight(this.code.slice(0, typeIndex), { language: this.language }).value + this.code.slice(typeIndex);
        } else {
          this.highlightedCode = hljs.highlight(this.code, { language: this.language }).value;
        }
      } else {
        if (typeof hljs.highlightAuto !== 'undefined') {
          if (typeIndex !== -1) {
            this.highlightedCode = hljs.highlightAuto(this.code.slice(0, typeIndex)).value + this.code.slice(typeIndex);
          } else {
            this.highlightedCode = hljs.highlightAuto(this.code).value;
          }
        } else {
          this.highlightedCode = this.mdCardService.filterHtml(this.code);
        }
      }
    } catch (_) {
      this.highlightedCode = this.code;
    }
  }

  zoomIn(): void {
    const container = this.mermaidContentRef.nativeElement;
    if (container && this.mermaidService) {
      this.mermaidService.zoomIn(container);
    }
  }

  zoomOut(): void {
    const container = this.mermaidContentRef.nativeElement;
    if (container && this.mermaidService) {
      this.mermaidService.zoomOut(container);
    }
  }

  download(): void {
    const container = this.mermaidContentRef.nativeElement;
    if (container && this.mermaidService) {
      this.mermaidService.download(container);
    }
  }

  async renderMermaid(): Promise<void> {
    if (!this.isMermaid || !this.code || !this.mermaidContentRef) {
      return;
    }
    
    if (!this.mermaidService) {
      try {
        this.mermaidService = new MermaidService();
        const config: MermaidConfig = {
          theme: this.theme === 'dark' ? 'dark' : 'default',
          ...this.mermaidConfig
        };
        this.mermaidService.setConfig(config);
      } catch (error) {
        console.error('Failed to load MermaidService:', error);
        return;
      }
    }
    
    const container = this.mermaidContentRef.nativeElement;
    if (container) {
      // 移除打字效果相关的span标签
      const cleanCode = this.code.replace(/<span[^>]*\bclass\s*=\s*['"]mc-typewriter[^>]*>([\s\S]*?)<\/span>/g, `$1`);
      await this.mermaidService.renderToContainer(container, cleanCode, this.theme);
    }
  }

  toggleExpand(): void {
    this.expanded = !this.expanded;
  }

  copyCode(): void {
    this.copySubject.next();
  }

  private copyCodeInternal(): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.code).then(() => {
        this.handleCopySuccess();
      });
    } else {
      const textarea = document.createElement('textarea');
      textarea.style.position = 'fixed';
      textarea.style.top = '-9999px';
      textarea.style.left = '-9999px';
      textarea.style.zIndex = '-1';
      textarea.value = this.code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.handleCopySuccess();
    }
  }

  private handleCopySuccess(): void {
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 1500);
  }

  // 动画相关方法
  beforeEnter(el: HTMLElement): void {
    if (!el.dataset) {
      // el.dataset = {} as DOMStringMap;
    }
    if (el.style.height) {
      el.dataset["height"] = el.style.height;
    }
    el.style.maxHeight = '0px';
  }

  enter(el: HTMLElement): void {
    requestAnimationFrame(() => {
      el.dataset["oldOverflow"] = el.style.overflow;
      if (el.dataset["height"]) {
        el.style.maxHeight = el.dataset["height"];
      } else if (el.scrollHeight !== 0) {
        el.style.maxHeight = `${el.scrollHeight}px`;
      } else {
        el.style.maxHeight = '0px';
      }
      el.style.overflow = 'hidden';
    });
  }

  afterEnter(el: HTMLElement): void {
    el.style.maxHeight = '';
    el.style.overflow = el.dataset["oldOverflow"] || '';
  }

  beforeLeave(el: HTMLElement): void {
    if (!el.dataset) {
      // el.dataset = {} as DOMStringMap;
    }
    el.dataset["oldOverflow"] = el.style.overflow;
    el.style.maxHeight = `${el.scrollHeight}px`;
    el.style.overflow = 'hidden';
  }

  leave(el: HTMLElement): void {
    if (el.scrollHeight !== 0) {
      el.style.maxHeight = '0px';
    }
  }

  afterLeave(el: HTMLElement): void {
    el.style.maxHeight = '';
    el.style.overflow = el.dataset["oldOverflow"] || '';
  }
}