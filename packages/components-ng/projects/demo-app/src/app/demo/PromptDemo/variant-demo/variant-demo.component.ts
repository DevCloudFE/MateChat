import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import type { Prompt } from '@matechat/common/Prompt/common/prompt-types';
import { ListDirection, ListVariant, PromptModule } from '@matechat/ng';

@Component({
  selector: 'app-variant-prompt',
  standalone: true,
  imports: [CommonModule, PromptModule],
  templateUrl: './variant-demo.component.html',
})
export class VariantPromptComponent {
  promptData: Prompt[] = [
    {
      value: 'quickSort',
      label: '帮我写一个快速排序',
      iconConfig: { name: 'icon-info-o', color: '#5e7ce0' },
      desc: '使用 js 实现一个快速排序',
    },
  ];
  horizontal: ListDirection = ListDirection.Horizontal;
  Variant = ListVariant;
}
