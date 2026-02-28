import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputModule } from '@matechat/ng';

@Component({
  selector: 'app-theme-tag',
  standalone: true,
  imports: [CommonModule, FormsModule, InputModule],
  templateUrl: './theme-tag-demo.component.html',
  styleUrls: ['./theme-tag-demo.component.scss'],
})
export class ThemeTagComponent {
  formatContentOptions: any = {
    formatContent: [],
  };

  openThemeTag() {
    this.formatContentOptions = {
      formatContent: [
        {
          type: 'themeTag',
          themeTagKey: 'themeTag', // 主题标签的唯一标识
          themeTagText: '动图生成', // 主题标签的文本内容
          clearInput: false, // 关闭主题标签时是否清空对应输入框内容
          popoverContent: '点击退出技能', // 主题标签的pop弹出提示内容
        },
      ],
    };
  }

  closeThemeTag() {
    this.formatContentOptions = {
      formatContent: [],
    };
  }

  onSubmit($event: string) {
    console.log('input submit---', $event);
  }
  onInputChange($event: string) {
    console.log('input change---', $event);
  }
}
