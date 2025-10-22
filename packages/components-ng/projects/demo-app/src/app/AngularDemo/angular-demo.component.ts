import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewChecked, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { throttle } from 'lodash-es';
import copy from 'clipboard-copy';
import { CommonModule } from '@angular/common';
// 导入代码高亮组件
import { CodeHighlightComponent } from '../CodeHighlight/code-highlight.component';

@Component({
  selector: 'mc-angular-demo',
  standalone: true,
  imports: [CommonModule, CodeHighlightComponent],
  templateUrl: './angular-demo.component.html',
  styleUrls: ['./angular-demo.component.scss']
})
export class AngularDemoComponent implements OnInit, AfterViewChecked, OnDestroy {
  @Input() customClass: string = '';
  @Input() sourceCode: { type: string, code: string }[] = [];
  @Input() lightCode: string = '';
  @Input() desc: string = '';
  @Input() targetFilePath: string = '';
  @Input() demoList?: any;


  hover: boolean = false;
  isExpanded: boolean = false;
  isShowTip: boolean = false;
  isUseVueFile: boolean = false;
  activeTab: string = 'html';
  fixedControl: boolean = false;
  
  @ViewChild('demoBlock') demoBlock!: ElementRef;
  @ViewChild('meta') meta!: ElementRef;
  @ViewChild('control') control!: ElementRef;
  @ViewChild('highlight') highlight?: ElementRef;


  // 模拟useRoute和useData的功能
  component: string = 'demo';
  locale: any = {
    'hide-text': '隐藏代码',
    'show-text': '显示代码',
    'copy-button-text': '复制代码片段',
    'copy-success-text': '复制成功',
  };
  
  private scrollHandler: () => void;

  constructor(private cdr: ChangeDetectorRef) {
    this.isUseVueFile = !!this.targetFilePath;
    // 创建节流的滚动处理函数
    this.scrollHandler = throttle(() => this._scrollHandler(), 200);
  }

  ngOnInit() {
    // 模拟获取路由信息
    this.component = this.getComponentName();
    // 初始化activeTab为第一个代码类型
    if (this.sourceCode && this.sourceCode.length > 0) {
      this.activeTab = this.sourceCode[0].type;
    }
  }

  ngAfterViewInit() {
    // 初始化时隐藏代码区域
    if (this.meta && this.meta.nativeElement) {
      this.meta.nativeElement.style.height = '0';
    }
  }
  
  ngAfterViewChecked() {
  }

  onClickControl() {
    this.isExpanded = !this.isExpanded;
    this.hover = this.isExpanded;
    
    // 更新代码区域的高度
    if (this.meta && this.meta.nativeElement) {
      this.meta.nativeElement.style.height = this.isExpanded ? `auto` : '0';
    }
    
    if (!this.isExpanded) {
      // 收起时重置固定状态
      this.fixedControl = false;
      if (this.control && this.control.nativeElement && this.demoBlock && this.demoBlock.nativeElement) {
        this.control.nativeElement.style.left = '0';
        this.control.nativeElement.style.width = `${this.demoBlock.nativeElement.offsetWidth - 2}px`;
      }
      this.removeScrollHandler();
      return;
    }
    
    // 展开后添加滚动监听
    setTimeout(() => {
      this._scrollHandler();
      window.addEventListener('scroll', this.scrollHandler);
      window.addEventListener('resize', this.scrollHandler);
    }, 300);
  }

  onCopy() {
    // 如果 sourceCode 是数组且不为空，取当前激活的tab的code属性
    let codeToCopy;
    if (this.sourceCode && this.sourceCode.length > 0) {
      const activeCodeItem = this.sourceCode.find(item => item.type === this.activeTab);
      codeToCopy = activeCodeItem ? activeCodeItem.code : this.sourceCode[0].code;
    } else {
      codeToCopy = this.sourceCode;
    }
    copy(codeToCopy);
    this.isShowTip = true;
    setTimeout(() => {
      this.isShowTip = false;
      this.cdr.detectChanges(); // 强制变更检测以更新UI
    }, 1300);
  }

  get blockClass(): string {
    return `demo-${this.component}`;
  }

  get copyText(): string {
    return this.isShowTip ? this.locale['copy-success-text'] : this.locale['copy-button-text'];
  }

  get controlText(): string {
    return this.isExpanded ? this.locale['hide-text'] : this.locale['show-text'];
  }

  getActiveTabCode(): string {
    if (this.sourceCode && this.sourceCode.length > 0) {
      const activeCodeItem = this.sourceCode.find(item => item.type === this.activeTab);
      return activeCodeItem ? activeCodeItem.code : this.sourceCode[0].code;
    }
    return '';
  }

  // 当 activeTab 改变时触发
  onTabChange(activeTab): void {
    this.activeTab = activeTab;
    this.getActiveTabCode();
    // 使用 setTimeout 确保 DOM 已更新
    setTimeout(() => {
      // 如果代码区域是展开的，重新计算并设置高度
      if (this.isExpanded && this.meta && this.meta.nativeElement) {
        // 强制重新计算高度
        setTimeout(() => {
          this.meta.nativeElement.style.height = `auto`;
        }, 0);
      }
    }, 100);
  }

  private getComponentName(): string {
    // 模拟从路径获取组件名称
    return 'demo';
  }

  private _scrollHandler() {
    if (!this.meta || !this.meta.nativeElement || !this.control || !this.control.nativeElement || !this.demoBlock || !this.demoBlock.nativeElement) {
      return;
    }
    
    const rect = this.meta.nativeElement.getBoundingClientRect();
    const innerHeight = window.innerHeight || document.body.clientHeight;
    
    // 检查是否需要固定控制按钮
    this.fixedControl = rect.bottom > innerHeight && rect.top + 44 <= innerHeight;
    
    // 更新控制按钮的位置和宽度
    if (this.control.nativeElement) {
      this.control.nativeElement.style.left = this.fixedControl ? `${rect.left}px` : '0';
      const dv = this.fixedControl ? 1 : 2;
      this.control.nativeElement.style.width = `${this.demoBlock.nativeElement.offsetWidth - dv}px`;
    }
    
    this.cdr.detectChanges();
  }

  private removeScrollHandler() {
    window.removeEventListener('scroll', this.scrollHandler);
    window.removeEventListener('resize', this.scrollHandler);
  }

  ngOnDestroy() {
    this.removeScrollHandler();
  }

}