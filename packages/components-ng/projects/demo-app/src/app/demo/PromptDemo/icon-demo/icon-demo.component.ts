import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import type { Prompt } from '@matechat/common/Prompt/common/prompt-types';
import { PromptModule } from '@matechat/ng';
import { CustomIconComponent } from './custom-icon/custom-icon.component';

@Component({
  selector: 'app-icon-prompt',
  standalone: true,
  imports: [CommonModule, PromptModule],
  templateUrl: './icon-demo.component.html',
  styleUrls: ['./icon-demo.component.scss'],
})
export class IconPromptComponent {
  promptData1: Prompt[] = [
    {
      value: 'quickSort',
      label: '帮我写一个快速排序',
      iconConfig: { name: 'icon-info-o' },
      desc: '使用 js 实现一个快速排序',
    },
  ];

  promptData2: Prompt[] = [
    {
      value: 'quickSort',
      label: '帮我写一个快速排序',
      iconConfig: { name: 'icon-info-o', color: '#5e7ce0' },
      desc: '使用 js 实现一个快速排序',
    },
  ];

  promptData3: Prompt[] = [
    {
      value: 'quickSort',
      label: '帮我写一个快速排序',
      iconConfig: {
        name: 'icon-info-o',
        color: 'rgb(255, 215, 0)',
        size: '18px',
      },
      desc: '使用 js 实现一个快速排序',
    },
  ];

  promptData4: Prompt[] = [
    {
      value: 'quickSort',
      label: '帮我写一个快速排序',
      iconConfig: { name: '', component: CustomIconComponent },
      desc: '使用 js 实现一个快速排序',
    },
  ];
}
