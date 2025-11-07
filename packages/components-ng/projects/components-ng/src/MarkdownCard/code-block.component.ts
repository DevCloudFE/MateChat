import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import hljs from 'highlight.js';
import { TemplateRef } from '@angular/core';
import type { MermaidConfig } from '../components-common/MarkdownCard/common/mdCard.types';
import BaseComponent from '../Base/base.component';
import { DiffDOM } from 'diff-dom';
import {
  CodeBlockAdapter,
  CodeBlockFoundation,
} from '../components-common/MarkdownCard/codeblock-foundation';
@Component({
  selector: 'mc-code-block',
  templateUrl: './code-block.component.html',
  standalone: false,
  styleUrls: ['./code-block.component.scss'],
})
export class CodeBlockComponent
  extends BaseComponent<CodeBlockFoundation>
  implements OnInit, OnChanges
{
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
  @ViewChild('mermaidContent') mermaidContentRef: ElementRef;
  @ViewChild('codeElement', { static: false }) codeElementRef: ElementRef;
  @ViewChildren('codeElementTemplate')
  codeElementTemplates: QueryList<ElementRef>;

  expanded: boolean = true;
  copied: boolean = false;
  mermaidContent: string = '';
  private diffDom: DiffDOM;
  private _showMermaidDiagram: boolean = true;
  get showMermaidDiagram(): boolean {
    return this._showMermaidDiagram;
  }
  set showMermaidDiagram(value: boolean) {
    if (this._showMermaidDiagram !== value) {
      this._showMermaidDiagram = value;
      // 当切换为显示图表且当前是mermaid类型时，渲染图表
      if (value && this.isMermaid) {
        // 在视图更新后渲染mermaid
        setTimeout(() => {
          this.renderMermaid();
        });
      }
    }
  }
  highlightedCode: string = '';
  isMermaid: boolean = false;

  private copySubject = new Subject<void>();
  constructor(private cdr: ChangeDetectorRef) {
    super();
    this.copySubject
      .pipe(debounceTime(300))
      .subscribe(() => this.copyCodeInternal());
    this.foundation = new CodeBlockFoundation(this.adapter);
    this.diffDom = new DiffDOM();
  }

  override get adapter(): CodeBlockAdapter {
    return {
      ...super.adapter,
      getContainer: () => {
        return this.mermaidContentRef.nativeElement;
      },
      highlightCodeChange: (highlightedCode: string, language: string) => {
        this.highlightedCode = highlightedCode;
        if (this.codeElementRef?.nativeElement) {
          const newElement = document.createElement('code');
          newElement.className = `hljs language-${language}`;
          newElement.innerHTML = highlightedCode;
          const diff = this.diffDom.diff(
            this.codeElementRef.nativeElement,
            newElement
          );
          this.diffDom.apply(this.codeElementRef.nativeElement, diff);
        }
      },
    };
  }

  switchShowMermaid(show: boolean): void {
    this.showMermaidDiagram = show;
    if (!this.showMermaidDiagram) {
      this.codeElementTemplates.changes.subscribe(() => {
        if (this.codeElementRef?.nativeElement && !this.showMermaidDiagram) {
          this.codeElementRef.nativeElement.innerHTML = this.highlightedCode;
        }
      });
    }

    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.checkIsMermaid();
    this.updateHighlightedCode();
    if (this.isMermaid) {
      this.renderMermaid();
    }
  }

  ngAfterViewInit(): void {
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
    if (
      changes['showMermaidDiagram'] &&
      this.isMermaid &&
      this.showMermaidDiagram
    ) {
      this.renderMermaid();
    }
  }

  private checkIsMermaid(): void {
    this.isMermaid = this.foundation.checkIsMermaid();
  }

  private updateHighlightedCode(): void {
    this.foundation.updateHighlightedCode();
  }

  zoomIn(): void {
    this.foundation.zoomIn();
    this.cdr.detectChanges();
  }

  zoomOut(): void {
    this.foundation.zoomOut();
    this.cdr.detectChanges();
  }

  download(): void {
    this.foundation.download();
  }

  async renderMermaid(): Promise<void> {
    await this.foundation.renderMermaid();
  }

  toggleExpand(): void {
    this.foundation.toggleExpand();
    this.cdr.detectChanges();
  }

  copyCode(): void {
    this.copySubject.next();
  }

  copyCodeInternal(): void {
    this.foundation.copyCodeInternal();
    this.cdr.detectChanges();
  }
}
