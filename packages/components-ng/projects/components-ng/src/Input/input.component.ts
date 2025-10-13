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
