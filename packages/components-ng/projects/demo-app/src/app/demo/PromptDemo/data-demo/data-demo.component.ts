import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import type { Prompt } from '@matechat/common/Prompt/common/prompt-types';
import { ListDirection, PromptModule } from '@matechat/ng';

@Component({
  selector: 'app-data-prompt',
  standalone: true,
  imports: [CommonModule, PromptModule],
  templateUrl: './data-demo.component.html',
  styleUrls: ['./data-demo.component.scss'],
})
export class DataPromptComponent {
  promptData1: Prompt[] = [
    {
      value: 'quickSort',
      label: '帮我写一个快速排序',
      iconConfig: { name: 'icon-info-o', color: '#5e7ce0' },
      desc: '使用 js 实现一个快速排序',
    },
  ];
  promptData2: Prompt[] = [
    {
      value: 'quickSort',
      label: '帮我写一个快速排序',
      iconConfig: { name: 'icon-info-o', color: '#5e7ce0' },
    },
  ];
  promptData3: Prompt[] = [
    {
      value: 'quickSort',
      label: '',
      iconConfig: { name: 'icon-info-o', color: '#5e7ce0' },
    },
  ];
  horizontal: ListDirection = ListDirection.Horizontal;
}
