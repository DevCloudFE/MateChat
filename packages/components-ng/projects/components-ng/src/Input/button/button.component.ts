import { Component, Input, EventEmitter, Output, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendIconComponent } from '../send-icon/send-icon.component';
import { SendBtnVariant } from '../../components-common/Input/common/types';
import BaseComponent from '../../Base/base.component';
import { LocaleService, TranslatePipe } from '../../components-common/Locale';
import { InputButtonAdapter, InputButtonFoundation } from '../../components-common/Input/button-foundation';

@Component({
  selector: 'mc-button',
  standalone: true,
  imports: [CommonModule, SendIconComponent, TranslatePipe],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})export class ButtonComponent extends BaseComponent {
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() inputValue: string = '';
  @Input() sendBtnVariant: SendBtnVariant = SendBtnVariant.Full;
  
  @Output() submit = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();
  @Output() change = new EventEmitter<string>();
  
  @ViewChild('button') buttonElement!: ElementRef<HTMLButtonElement>;
  
  isMouseDown: boolean = false;
  showWave: boolean = false;
  waveStyle: { top: string; left: string } = { top: '0px', left: '0px' };
  
  constructor(private localeService: LocaleService) { super(); }
  
  get buttonClasses(): string {
    return this.foundation.getButtonClasses();
  }
  
  ngOnInit() {
    this.foundation = new InputButtonFoundation(this.adapter as InputButtonAdapter);
    this.foundation.init();
  }
  
  @HostListener('mousedown')
  onMouseDown(): void {
    this.isMouseDown = true;
  }
  
  @HostListener('mouseup')
  onMouseUp(): void {
    this.isMouseDown = false;
  }
  
  showClickWave(event: MouseEvent): void {
    this.foundation.showClickWave(this.buttonElement.nativeElement, event);
  }
  
  onConfirm(event: MouseEvent): void {
    this.showClickWave(event);
    
    if (this.loading) {
      this.cancel.emit();
    } else {
      this.submit.emit(this.inputValue);
      this.inputValue = '';
      this.change.emit(this.inputValue);
    }
  }
  

}