import { Component, Input, EventEmitter, Output, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import BaseComponent from '../../Base/base.component';
import { LocaleService } from '../../Locale';

import { handlePaste } from '../../components-common/Input/common/util';
import { InputTagFoundation } from '../../components-common/Input/input-tag-foundation';


@Component({
  selector: 'mc-input-tag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-tag.component.html',
  styleUrls: ['./input-tag.component.scss'],
})export class InputTagComponent extends BaseComponent<InputTagFoundation> {
  @Input() disabled: boolean = false;
  @Input() content: string = '';
  @Input() placeholder: string = '';
  @Output() change = new EventEmitter<string>();
  @ViewChild('editableSpanRef') editableSpanRef!: ElementRef<HTMLSpanElement>;
  
  isEditable: boolean = false;
  localValue: string = this.content;

  constructor(private localeService: LocaleService) { super(); }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['content']) {
      this.localValue = changes['content'].currentValue;
    }
  }

  handleFocus() {
    this.isEditable = !this.disabled;
  }

  handleBlur() {
    this.isEditable = false;
  }

  handleInput(e: any) {
    const prompt = this.editableSpanRef?.nativeElement.textContent || '';
    this.localValue = prompt;
    this.change.emit(prompt);
  }

  handleInputPaste(e: any) {
    handlePaste(e);
    this.handleInput(e);
  }
}