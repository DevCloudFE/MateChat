import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleModule, InputModule, AttachmentModule } from '@matechat/ng';
import {
  SendBtnVariant,
  DisplayType,
  InputVariant,
} from '../../../components-ng/src/components-common/Input/common/types';
import { MarkdownCardModule } from '../../../components-ng/src/MarkdownCard';
import { MarkdownThinkDemoComponent } from './demo/MarkdownCardDemo/markdown-think/markdown-think.component';
import { MarkdownMermaidDemoComponent } from './demo/MarkdownCardDemo/markdown-mermaid/markdown-mermaid.component';
import { MarkdownTypingDemoComponent } from './demo/MarkdownCardDemo/markdown-typing/markdown-typing.component';
import { MarkdownEmojeDemoComponent } from './demo/MarkdownCardDemo/markdown-emoje/markdown-emoje.component';
import { MarkdownCodeOperatorDemoComponent } from './demo/MarkdownCardDemo/markdown-code-operator/markdown-operator.component';
import { MarkdownThemeDemoComponent } from './demo/MarkdownCardDemo/markdown-theme/markdown-theme.component';
import { MarkdownMathDemoComponent } from './demo/MarkdownCardDemo/markdown-math/markdown-math.component';
import { MarkdownPlantumlDemoComponent } from './demo/MarkdownCardDemo/markdown-plantuml/markdown-plantuml.component';
import { MarkdownHeaderDemoComponent } from './demo/MarkdownCardDemo/markdown-header/markdown-header.component';
import { MarkdownContentDemoComponent } from './demo/MarkdownCardDemo/markdown-content/markdown-content.component';
import { MarkdownXssDemoComponent } from './demo/MarkdownCardDemo/markdown-xss/markdown-xss.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    BubbleModule,
    InputModule,
    AttachmentModule,
    MarkdownEmojeDemoComponent,
    MarkdownCardModule,
    MarkdownMermaidDemoComponent,
    MarkdownTypingDemoComponent,
    MarkdownThinkDemoComponent,
    MarkdownXssDemoComponent,
    MarkdownContentDemoComponent,
    MarkdownEmojeDemoComponent,
    MarkdownCodeOperatorDemoComponent,
    MarkdownThemeDemoComponent,
    MarkdownMathDemoComponent,
    MarkdownHeaderDemoComponent,
    MarkdownPlantumlDemoComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  @ViewChild('input') inputEl!: ElementRef<HTMLInputElement>;
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

  fileList = [];
  uploadOptions = {
    uri: 'https://run.mocky.io/v3/132b3ea3-23ea-436b-aed4-c43ef9d116f0',
  };
  loading = false;
  inputValue = '';
  SendBtnVariant = SendBtnVariant;
  DisplayType = DisplayType;
  InputVariant = InputVariant;
  dropContainer = () => document.body;
  handleBeforeUpload = (file: File) => {
    // 除了组件内置的 accept 和 size 校验，你还可以添加自定义的校验逻辑
    if (file.name.includes('test')) {
      return false;
    }
    return true;
  };

  onValidChange = (e) => {
    console.log('valid result', e);
  };
  ngAfterViewInit(): void {
    this.dropContainer = () => {
      return this.inputEl.nativeElement;
    };
  }
  handleSuccess = ({ file, response }) => {
    console.log(`文件 ${file.name} 上传成功，响应:`, response);
  };
  handleError = ({ file, error }) => {
    console.error(`文件 ${file.name} 上传失败，错误:`, error);
  };
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
**快速排序（Quick Sort）**：是一种高效的排序算法，它采用分治法（Divide and Conquer）的思想。它的基本思路是：
1. 选择一个基准值（pivot）
2. 将数组分成两部分：小于基准值的部分和大于等于基准值的部分
3. 递归地对这两部分进行排序

<img src="https://matechat.gitcode.com/logo.svg" />

# Class Diagram
\`\`\`mermaid
classDiagram
Class01 <|-- AveryLongClass : Cool
<<Interface>> Class01
Class09 --> C2 : Where am I?
Class09 --* C3
Class09 --|> Class07
Class07 : equals()
Class07 : Object[] elementData
Class01 : size()
Class01 : int chimp
Class01 : int gorilla
class Class10 {
  <<service>>
  int id
  size()
}
\`\`\`

\`\`\`ts
function quickSort(arr) {
  function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
}


\`\`\`


`;

  ngOnInit() {
    this.content = '';
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
  }
}
