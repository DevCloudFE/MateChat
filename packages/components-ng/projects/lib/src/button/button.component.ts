import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  TemplateRef,
  AfterViewInit,
  ViewEncapsulation,
  ViewChild,
  ViewContainerRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import Button from 'matechat-js/packages/Button/button.svelte';
export type IButtonType = 'button' | 'submit' | 'reset';
/**
 * 类型中text-dark参数废弃
 */
export type IButtonStyle =
  | 'border-blue'
  | 'border-black'
  | 'border-none'
  | 'border-gradient'
  | 'danger'
  | 'success'
  | 'warning';
export type IButtonPosition = 'left' | 'right' | 'default';
export type IButtonSize = 'lg' | 'md' | 'sm' | 'xs';

@Component({
  selector: 'd-button',
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  standalone: false,
  encapsulation: ViewEncapsulation.Emulated,
})
export class ButtonComponent
  implements AfterContentChecked, AfterViewInit, OnChanges
{
  @Input() type: IButtonType = 'button';
  @Input() styleType: IButtonStyle = 'border-gradient';
  @Input() shape: any;
  @Input() size: IButtonSize = 'md';
  @Input() label: string = '';
  /**
   * @deprecated
   * 原左右按钮用按钮组实现
   */
  @Input() icon: string = '';
  @Input() disabled = false;
  @Input() width?: string;
  @Input() suffixTemplate: TemplateRef<any> | null = null;
  @Output() btnClick = new EventEmitter<MouseEvent>();
  @ViewChild('buttonContent', { static: true }) buttonContent: ElementRef;
  @ViewChild('suffixContainer', { static: true }) suffixContainer: ElementRef;
  nativeButton: any;

  ngAfterViewInit() {
    // 获取插入的模板内容
    this.nativeButton = new Button({
      target: this.buttonContent.nativeElement,
      props: {
        shape: this.shape,
        icon: this.icon,
        disabled: this.disabled,
        label: this.label,
        styleType: this.styleType,
        size: this.size,
        width: this.width,
        slots: {
          suffix: this.suffixContainer
            ? this.suffixContainer.nativeElement
            : null,
        },
        onClick: (e: MouseEvent) => {
          this.btnClick.emit(e);
        },
      },
    });
  }

  @HostListener('click', ['$event'])
  handleDisabled($event: Event) {
    if (this.disabled) {
      $event.preventDefault();
      $event.stopImmediatePropagation();
    }
  }

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    // 检测到输入属性变化时更新 Svelte 组件的 props
    if (this.nativeButton) {
      this.nativeButton.$set({
        shape: this.shape,
        icon: this.icon,
        disabled: this.disabled,
        styleType: this.styleType,
        label: this.label,
        size: this.size,
        width: this.width,
        slots: {
          suffix: this.suffixContainer
            ? this.suffixContainer.nativeElement
            : null,
        },
      });
    }
  }

  ngAfterContentChecked(): void {
    this.cd.detectChanges();
  }
}
