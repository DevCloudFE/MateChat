import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputModule } from '@matechat/ng';

@Component({
  selector: 'app-button-input',
  standalone: true,
  imports: [CommonModule, FormsModule, InputModule],
  templateUrl: './button-demo.component.html',
  styleUrls: ['./button-demo.component.scss']
})
export class ButtonInputComponent {
  inputValue: string = '';
  loading: boolean = false;

  onInputChange(e) {
    this.inputValue = e;
    console.log('input change---', e);
  }
  
  onSubmit(e) {
    this.loading = true;
    console.log('input submit---', e);
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  };
  
  onCancel() {
    this.loading = false;
    console.log('input cancel');
  }
  
  onConfirm() {
    if (this.loading) {
      this.onCancel();
    } else {
      this.onSubmit(this.inputValue);
      this.inputValue = '';
    }
  }
}