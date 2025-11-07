import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputModule } from '@matechat/ng';

@Component({
  selector: 'app-auto-size-input',
  standalone: true,
  imports: [CommonModule, FormsModule, InputModule],
  templateUrl: './auto-size-demo.component.html',
  styleUrls: ['./auto-size-demo.component.scss']
})
export class AutoSizeInputComponent {
  inputValue1: string = '';
  inputValue2: string = '';
  inputValue3: string = '';
  loading: boolean = false;

  
  onChange1(e) {
    this.inputValue1 = e;
  }
  
  onChange2(e) {
    this.inputValue2 = e;
  }
  
  onChange3(e) {
    this.inputValue3 = e;
  }
}