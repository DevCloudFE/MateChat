import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { SearchChangeEvent, Trigger } from '../components-common/Mention/common/mention-types';
import { MentionFoundation } from '../components-common/Mention/foundation';
import BaseComponent from '../Base/base.component';

@Component({
  selector: 'mc-mention',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mention.component.html',
  styleUrls: ['./mention.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0.8, transform: 'scaleY(0.8) translateY(4px)' }),
        animate('0.2s cubic-bezier(0.16, 0.75, 0.5, 1)', style({ opacity: 1, transform: 'scaleY(0.9999) translateY(0)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'scaleY(0.9999) translateY(0)' }),
        animate('0.2s cubic-bezier(0.5, 0, 0.84, 0.25)', style({ opacity: 0.8, transform: 'scaleY(0.8) translateY(4px)' }))
      ])
    ])
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MentionComponent),
      multi: true
    }
  ]
})
export class MentionComponent extends BaseComponent<MentionFoundation> implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
  @Input() prefix: Array<string | Trigger> = ['@'];
  @Input() fitHostWidth: boolean = true;
  @Input() menuClass?: string;
  // 选项数量，用于键盘导航
  private _optionsCount: number = 0;
  
  @Input()
  set optionsCount(val: number) {
    this._optionsCount = val;
    // 当optionsCount变化时，更新foundation的配置
    if (this.foundation) {
      this.foundation.updateOptions({ optionsCount: val });
    }
  }
  
  get optionsCount(): number {
    return this._optionsCount;
  }

  @Output() updateModelValue = new EventEmitter<boolean>();
  @Output() searchChange = new EventEmitter<SearchChangeEvent>();
  @Output() toggleChange = new EventEmitter<boolean>();
  // 当前选中索引变化事件
  @Output() activeIndexChange = new EventEmitter<number>();

  // 当前选中的索引
  activeIndex: number = -1;

  @ViewChild('popperTrigger') popperTriggerEl!: ElementRef;
  @ViewChild('origin') originEl!: ElementRef;
  @ViewChild('overlayEl') overlayEl!: ElementRef;

  overlayStyle: { top: string; left: string; width: string } = { top: '0px', left: '0px', width: '' };
  private inputEl: HTMLInputElement | HTMLTextAreaElement | null = null;
  
  constructor() { 
    super(); 
  }

  ngOnInit() {
    this.foundation = new MentionFoundation(this.adapter);
  }

  override get adapter(): any {
    return {
      ...super.adapter,
      updateModelValue: (val: boolean) => {
        // 调用modelValue的setter方法，确保位置更新逻辑被执行
        this.modelValue = val;
      },
      searchChange: (event: SearchChangeEvent) => this.searchChange.emit(event),
      activeIndexChange: (index: number) => {
        this.activeIndex = index;
        this.activeIndexChange.emit(index);
      },
      toggleChange: (val: boolean) => this.toggleChange.emit(val)
    };
  }

  ngAfterViewInit() {
    // 添加安全检查 - 仅检查必要元素，overlayEl有*ngIf条件可能不会立即渲染
    if (!this.popperTriggerEl || !this.originEl) {
      console.error('ViewChild elements not found');
      return;
    }

    const hostElement = this.popperTriggerEl.nativeElement;
    let foundInputEl: HTMLInputElement | HTMLTextAreaElement | null = null;

    // 检查hostElement本身是否是输入元素
    if (hostElement.tagName === 'TEXTAREA' || hostElement.tagName === 'INPUT') {
      foundInputEl = hostElement;
    } else {
      // 先查找mc-input组件
      const mcInputComponent = hostElement.querySelector('mc-input');
      if (mcInputComponent) {
        // 如果找到mc-input组件，查找其内部的textarea元素
        foundInputEl = mcInputComponent.querySelector('textarea');
      } else {
        // 否则在hostElement内部查找原生输入元素
        foundInputEl = hostElement.querySelector('textarea') || hostElement.querySelector('input');
      }
    }

    if (!foundInputEl) {
      console.error('Input/Textarea element not found in Mention component');
      return;
    }

    // 初始化foundation的元素
    this.inputEl = foundInputEl;
    this.foundation.setInputEl(this.inputEl);
    this.foundation.setOriginEl(this.originEl.nativeElement);
    // 仅在overlayEl存在时设置，否则Foundation会在需要时处理
    if (this.overlayEl) {
      this.foundation.setOverlayEl(this.overlayEl.nativeElement);
    }
    // 初始化事件
    this.foundation.initEvents();
  }

  override ngOnDestroy() {    // 清理文档点击事件
    this.cleanupDocumentClick();
    // 清理Foundation资源
    this.foundation.destroy();
    super.ngOnDestroy();
  }

  // 监听modelValue变化，更新overlay位置
  @Input()
  set modelValue(val: boolean) {
    if (this._modelValue !== val) {
      this._modelValue = val;
      // 当显示Mention面板时，确保overlay元素已传递给foundation并更新位置
      if (val && this.foundation) {
        // 使用setTimeout确保overlayEl已经渲染完成
        setTimeout(() => {
          // 检查overlayEl是否可用，如果可用则传递给foundation
          if (this.overlayEl) {
            this.foundation.setOverlayEl(this.overlayEl.nativeElement);
            // 获取位置信息并更新组件样式
            const positionInfo = this.foundation.updateOverlayPosition();
            if (positionInfo instanceof Promise) {
              positionInfo.then(pos => {
                if (pos) {
                  this.overlayStyle = pos;
                }
              });
            } else if (positionInfo) {
              this.overlayStyle = positionInfo;
            }
          }
        }, 0);
      }
      // 调用onChange回调，支持ngModel双向绑定
      this.onChange(val);
      // 仍然触发updateModelValue事件，保持向后兼容
      this.updateModelValue.emit(val);
    }
  }

  get modelValue(): boolean {
    return this._modelValue;
  }

  // 私有属性存储实际的modelValue
  private _modelValue: boolean = false;

  // ControlValueAccessor 接口实现
  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: boolean): void {
    this.modelValue = value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // 如果需要禁用功能，可以在这里实现
  }

  // 初始化文档点击事件（已在ngAfterViewInit中处理，无需重复）
  ngAfterContentInit() {
  }

  // 清理文档点击事件
  private cleanupDocumentClick() {
    document.removeEventListener('click', this.onDocumentClick);
  }

  // 处理文档点击事件，点击外部关闭Mention面板
  private onDocumentClick = (e: Event) => {
    if (this.originEl && this.originEl.nativeElement && this.modelValue) {
      if (!this.originEl.nativeElement.contains(e.target as HTMLElement)) {
        this.foundation.resetMention();
      }
    }
  };
}