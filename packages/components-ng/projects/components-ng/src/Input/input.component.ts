import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  ElementRef,
  ContentChild,
  TemplateRef,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import {
  DisplayType,
  InputVariant,
  SendBtnVariant,
  SubmitShortKey,
} from '../components-common/Input/common/types';

// TextareaAutoSize类型定义
export type TextareaAutoSize = { minRows?: number; maxRows?: number } | boolean;

// 默认的autosize配置
const DEFAULT_AUTOSIZE = {
  minRows: 1,
  maxRows: 5
};

import BaseComponent from '../Base/base.component';
import {
  InputAdapter,
  InputFoundation,
} from '../components-common/Input/foundation';
import { LocaleService } from '../Locale/locale.service';
import { TranslatePipe } from '../Locale/translate.pipe';

// 创建一个token用于组件间通信
export const inputContextToken = 'input-context';

@Component({
  selector: 'mc-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, TranslatePipe],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{ provide: inputContextToken, useExisting: InputComponent }],
})
export class InputComponent extends BaseComponent implements OnInit {
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() displayType: DisplayType = DisplayType.Full;
  @Input() variant: InputVariant = InputVariant.Bordered;
  @Input() sendBtnVariant: SendBtnVariant = SendBtnVariant.Full;
  @Input() loading: boolean = false;
  @Input() showCount: boolean = false;
  @Input() maxLength: number | null = null;
  @Input() submitShortKey: SubmitShortKey | null | string =
    SubmitShortKey.Enter;
  @Input() autofocus: boolean = false;
  @Input() autosize: TextareaAutoSize = false;
  
  // textarea样式
  textareaStyle: Record<string, string> = {};

  @Output() change = new EventEmitter<string>();
  @Output() submit = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();
  @Output() focus = new EventEmitter<FocusEvent>();
  @Output() blur = new EventEmitter<FocusEvent>();

  @ViewChild('textarea') textareaElement!: ElementRef<HTMLTextAreaElement>;

  @ContentChild('head') headTemplate: TemplateRef<any> | null = null;
  @ContentChild('prefix') prefixTemplate: TemplateRef<any> | null = null;
  @ContentChild('suffix') suffixTemplate: TemplateRef<any> | null = null;
  @ContentChild('button') buttonTemplate: TemplateRef<any> | null = null;
  @ContentChild('extra') extraTemplate: TemplateRef<any> | null = null;

  inputValue: string = '';
  lock: boolean = false;

  constructor(private localeService: LocaleService) {
    super();
  }

  ngOnInit() {
    this.foundation = new InputFoundation(this.adapter);
    this.foundation.init();
    this.inputValue = this.value;
  }

  override get adapter(): InputAdapter {
    return {
      ...super.adapter,
      locale: (key, params) => this.localeService.translate(key, params),
      emitChange: () => {
        this.change.emit(this.inputValue);
      },
      submit: (inputValue) => {
        this.submit.emit(inputValue);
      },
    };
  }

  onChange(e): void {
    e.stopPropagation();
    this.foundation.emitChange();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) {
      this.inputValue = changes['value']?.currentValue || '';
      // 值变化时更新textarea样式
      this.updateTextareaStyle();
    }
    
    if (changes['autosize']) {
      // autosize配置变化时更新textarea样式
      this.updateTextareaStyle();
    }
  }

  get inputClasses(): string {
    return this.foundation.getInputClasses();
  }

  get maxlengthValue() {
    return this.maxLength !== undefined ? this.maxLength : null;
  }

  onInput(): void {
    if (!this.lock) {
      this.foundation.emitChange();
      // 输入时更新textarea样式
      this.updateTextareaStyle();
    }
  }

  onCompositionStart(): void {
    this.lock = true;
  }

  onCompositionEnd(): void {
    this.lock = false;
    this.foundation.emitChange();
  }

  onKeydown(event: KeyboardEvent): void {
    this.foundation.onKeydown(event);
  }

  clearInput(): void {
    this.foundation.clearInput();
  }

  getInput(): string {
    return this.inputValue;
  }

  // 处理button组件的事件
  onButtonSubmit(value: string): void {
    this.submit.emit(value);
  }

  onButtonCancel(): void {
    this.cancel.emit();
  }

  onButtonChange(value: string): void {
    this.inputValue = value;
    this.foundation.emitChange();
  }

  ngAfterViewInit() {
    if (this.autofocus && this.textareaElement && !this.disabled) {
      // 在下一个变更检测周期中聚焦，以确保视图已经完全初始化
      setTimeout(() => {
        this.textareaElement.nativeElement.focus();
      });
    }
    
    // 初始化时更新textarea样式
    this.updateTextareaStyle();
  }
  
  // 更新textarea样式
  updateTextareaStyle() {
    if (!this.textareaElement || this.autosize === false) {
      this.textareaStyle = {};
      return;
    }
    
    const config = this.getAutosizeConfig();
    const result = this.computeTextareaHeight(
      this.textareaElement.nativeElement,
      config.minRows,
      config.maxRows
    );
    
    this.textareaStyle = {
      ...result,
      resize: 'none'
    };
  }
  
  // 获取autosize配置
  private getAutosizeConfig() {
    return typeof this.autosize === 'boolean'
      ? DEFAULT_AUTOSIZE
      : this.autosize;
  }
  
  // 计算textarea高度
  private computeTextareaHeight(
    targetElement: HTMLTextAreaElement,
    minRows = 1,
    maxRows?: number
  ): Record<string, string> {
    const style = window.getComputedStyle(targetElement);
    const boxSizing = style.getPropertyValue('box-sizing');
    
    const paddingSize = 
      Number.parseFloat(style.getPropertyValue('padding-top')) +
      Number.parseFloat(style.getPropertyValue('padding-bottom'));
    
    const borderSize = 
      Number.parseFloat(style.getPropertyValue('border-top-width')) +
      Number.parseFloat(style.getPropertyValue('border-bottom-width'));
    
    // 创建临时textarea元素
    const tempTextarea = document.createElement('textarea');
    const sizingStyle = [
      'letter-spacing', 'line-height', 'padding-top', 'padding-bottom',
      'font-family', 'font-weight', 'font-size', 'font-variant',
      'text-rendering', 'text-transform', 'width', 'text-indent',
      'padding-left', 'padding-right', 'border-width', 'box-sizing',
      'word-break', 'white-space'
    ];
    
    const contextStyle = sizingStyle
      .map(name => `${name}:${style.getPropertyValue(name)}`)
      .join(';');
    
    const hiddenStyle = `
      min-height:0 !important;
      max-height:none !important;
      height:0 !important;
      visibility:hidden !important;
      overflow:hidden !important;
      position:absolute !important;
      z-index:-1000 !important;
      top:0 !important;
      right:0 !important;
      pointer-events:none !important;
    `;
    
    tempTextarea.setAttribute('style', `${contextStyle};${hiddenStyle}`);
    tempTextarea.value = targetElement.value || targetElement.placeholder || '';
    
    document.body.appendChild(tempTextarea);
    
    let height = tempTextarea.scrollHeight;
    const result: Record<string, string> = {
      height: `${height}px`
    };
    
    if (minRows !== undefined || maxRows !== undefined) {
      tempTextarea.value = ' ';
      const singleRowHeight = tempTextarea.scrollHeight - paddingSize;
      
      if (minRows !== undefined) {
        let minHeight = singleRowHeight * minRows;
        if (boxSizing === 'border-box') {
          minHeight = minHeight + paddingSize + borderSize;
        }
        height = Math.max(minHeight, height);
        result['minHeight'] = `${minHeight}px`;
      }
      
      if (maxRows !== undefined) {
        let maxHeight = singleRowHeight * maxRows;
        if (boxSizing === 'border-box') {
          maxHeight = maxHeight + paddingSize + borderSize;
        }
        if (height > maxHeight) {
          height = maxHeight;
          result['overflowY'] = 'auto';
        }
      }
    }
    
    document.body.removeChild(tempTextarea);
    
    result['height'] = `${height}px`;
    return result;
  }

  get placeholderText(): string {
    return this.foundation.getPlaceholderText();
  }

  onFocus(event: FocusEvent) {
    this.focus.emit(event);
  }

  onBlur(event: FocusEvent) {
    this.blur.emit(event);
  }
}
