import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputModule } from '@matechat/ng';
import { DisplayType, InputVariant, SendBtnVariant } from '@matechat/common/Input/common/types';

@Component({
  selector: 'app-suffix-input',
  standalone: true,
  imports: [CommonModule, FormsModule, InputModule],
  templateUrl: './suffix-demo.component.html'
})
export class SuffixInputComponent {
  loading: boolean = false;
  inputValue: string = '';
  isExpanded: boolean = false;
  SendBtnVariant = SendBtnVariant;
  DisplayType = DisplayType;
  InputVariant = InputVariant;

  onSubmit(e) {
    this.loading = true;
    console.log('input submit---', e);
  };
}