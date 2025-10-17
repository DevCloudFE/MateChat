import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleModule, InputModule } from '@matechat/ng';
import {
  SendBtnVariant,
  DisplayType,
  InputVariant,
} from '../../../components-ng/src/components-common/Input/common/types';
import { InputDemoComponent } from '../Input/input.component';
import { MarkdownCardModule } from '../../../components-ng/src/MarkdownCard';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BubbleModule, InputModule, InputDemoComponent, MarkdownCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'demo-app';

  avatarConfig = {
    imgSrc: 'https://matechat.gitcode.com/logo.svg',
  };
  modelAvatar = {
    imgSrc: 'https://matechat.gitcode.com/logo.svg',
  };
  userAvatar = {
    imgSrc: 'https://matechat.gitcode.com/png/demo/userAvatar.svg',
  };
  modelAvatarTop = {
    ...this.modelAvatar,
    displayName: 'MateChat',
  };
  userAvatarTop = {
    ...this.userAvatar,
    displayName: 'User',
  };

  loading = false;
  inputValue = '';
  SendBtnVariant = SendBtnVariant;
  DisplayType = DisplayType;
  InputVariant = InputVariant;
  onInputChange = (e) => {
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

  content = '';
  private fullContent = `
# 快速排序（Quick Sort）

### 介绍
**快速排序（Quick Sort）**：是一种高效的排序算法，它采用分治法（Divide and Conquer）的思想。它的基本思路是：

1. 选择一个基准值（pivot）
2. 将数组分成两部分：小于基准值的部分和大于等于基准值的部分
3. 递归地对这两部分进行排序

<img src="https://matechat.gitcode.com/logo.svg" />

### 代码实现

1. 以下是快速排序的实现方法
\`\`\`ts
function quickSort(arr) {
  function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

// 使用示例
const arr = [3, 6, 8, 10, 1, 2, 1];
console.log(quickSort(arr)); // 输出排序后的数组
}
\`\`\`
`;

ngOnInit() {
  this.simulateStreaming();
}

private simulateStreaming() {
  let index = 0;
  const charDelay = 10; // 每个字符的延迟时间（毫秒）
  
  const streamInterval = setInterval(() => {
    if (index < this.fullContent.length) {
      this.content += this.fullContent[index];
      index++;
    } else {
      clearInterval(streamInterval);
    }
  }, charDelay);
}}
