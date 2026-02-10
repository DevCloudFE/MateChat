import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputModule } from '@matechat/ng';

@Component({
  selector: 'app-format-input',
  standalone: true,
  imports: [CommonModule, FormsModule, InputModule],
  templateUrl: './format-input-demo.component.html',
  styleUrls: ['./format-input-demo.component.scss'],
})
export class FormatInputComponent {
  formatContentOptions: any = {
    formatContent: [],
  };

  setInput() {
    this.formatContentOptions = {
      formatContent: [
        {
          key: '',
          type: 'text',
          content: '我是',
          placeholder: '',
        },
        {
          key: 'input1',
          type: 'input',
          placeholder: '请输入专业',
          content: '计算机科学',
        },
        {
          key: '',
          type: 'text',
          content: '专业的本科生，帮我写一篇关于',
          placeholder: '',
        },
        {
          key: 'input2',
          type: 'input',
          placeholder: '请输入主题',
          content: '',
        },
        {
          key: '',
          type: 'text',
          content: '的论文。',
          placeholder: '',
        },
      ],
    };
  }

  onSubmit($event: string) {
    console.log('input submit---', $event);
  }
  onInputChange($event: string) {
    console.log('input change---', $event);
  }
}
