import { Component, Input, OnInit, ElementRef, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
// 引入 highlight.js
import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
// import html from 'highlight.js/lib/languages/html';

hljs.registerLanguage('css', css);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);
// hljs.registerLanguage('html', html);

@Component({
  selector: 'mc-code-highlight',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './code-highlight.component.html',
  styleUrls: ['./code-highlight.component.scss']
})
export class CodeHighlightComponent implements AfterViewInit {
  @Input() code: string = '';
  @Input() language: string = 'plaintext';
  
  @ViewChild('codeElement') codeElement!: ElementRef<HTMLElement>;

  constructor() { }

  ngAfterViewInit(): void {
    this.applyHighlight();
  }

  // 应用代码高亮
  applyHighlight(): void {
    if (!this.codeElement) return;
    
    const codeEl = this.codeElement.nativeElement;
    hljs.highlightElement(codeEl);
  }

  // 当输入属性变化时，可以手动触发重新高亮
  public updateHighlight(code: string, language: string): void {
    this.code = code;
    this.language = language;
    // 确保在Angular变更检测周期后调用，以确保视图已更新
    setTimeout(() => {
      this.applyHighlight();
    }, 0);
  }
}