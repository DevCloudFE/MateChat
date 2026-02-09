import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import type { Prompt } from '@matechat/common/Prompt/common/prompt-types';
import { PromptModule } from '@matechat/ng';

@Component({
  selector: 'app-basic-prompt',
  standalone: true,
  imports: [CommonModule, PromptModule],
  templateUrl: './basic-demo.component.html',
})
export class BasicPromptComponent {
  promptData: Prompt[] = [
    {
      value: 'quickSort',
      label: '帮我写一个快速排序',
      iconConfig: { name: 'icon-info-o', color: '#5e7ce0' },
      desc: '使用 js 实现一个快速排序',
    },
    {
      value: 'helpMd',
      label: '你可以帮我做些什么？',
      iconConfig: { name: 'icon-star', color: 'rgb(255, 215, 0)' },
      desc: '了解当前大模型可以帮你做的事',
    },
  ];
}
