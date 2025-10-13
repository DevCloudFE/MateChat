import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from '@matechat/ng';
import {
  SendBtnVariant,
  DisplayType,
  InputVariant,
} from '../../../components-ng/src/components-common/Input/common/types';

@Component({
  selector: 'input-demo',
  standalone: true,
  imports: [CommonModule, InputModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputDemoComponent {
  loading = false;
  inputValue = '';
  SendBtnVariant = SendBtnVariant;
  DisplayType = DisplayType;
  InputVariant = InputVariant;
  onInputChange = (e) => {
    this.inputValue = e;
    console.log('input change---', e);
  };
  onSubmit = (e) => {
    this.loading = true;
    this.inputValue = '';
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    console.log('input submit---', e);
  };
  onCancel = () => {
    this.loading = false;
    console.log('input cancel');
  };

  onConfirm = (e) => {
    if (this.loading) {
      this.onCancel();
    } else {
      this.onSubmit(e);
    }
  };
}
