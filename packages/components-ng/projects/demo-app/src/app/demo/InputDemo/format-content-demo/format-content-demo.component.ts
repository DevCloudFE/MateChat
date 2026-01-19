import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputModule } from '@matechat/ng';

@Component({
  selector: 'app-format-content-input',
  standalone: true,
  imports: [CommonModule, FormsModule, InputModule],
  templateUrl: './format-content-demo.component.html',
  styleUrls: ['./format-content-demo.component.scss'],
})
export class FormatContentInputComponent {
  formatContentOptions: any = {
    formatContent: [],
  };
  setMixTags() {
    const mixTags = [
      {
        type: 'themeTag',
        themeTagKey: 'themeTag', // 主题标签的唯一标识
        themeTagText: '文章生成', // 主题标签的文本内容
        clearInput: true, // 关闭主题标签时是否清空对应输入框内容
        popoverContent: '点击关闭主题', // 主题标签的pop弹出提示内容
      },
      {
        key: '',
        type: 'text',
        content: '帮我写一篇面向',
        placeholder: '',
      },
      {
        key: 'input1',
        type: 'input',
        placeholder: '输入目标人群',
        content: '职场人士',
      },
      {
        key: '',
        type: 'text',
        content: '关于',
        placeholder: '',
      },
      {
        key: 'input2',
        type: 'input',
        placeholder: '输入产品',
        content: '',
      },
      {
        key: '',
        type: 'text',
        content: '的宣传文案，需要直击痛点，吸引用户点击。',
        placeholder: '',
      },
    ];
    this.formatContentOptions = {
      formatContent: mixTags,
    };
  }
  onSubmit($event: string) {
    console.log('input submit---', $event);
  }
  onInputChange($event: string) {
    console.log('input change---', $event);
  }
}
