import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BubbleComponent, ToolbarAction, ToolbarComponent } from '@matechat/ng';

@Component({
  selector: 'app-toolbar-slot-demo',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, BubbleComponent, FormsModule],
  templateUrl: './toolbar-slot-demo.component.html',
})
export class ToolbarSlotDemoComponent {
  logoImgSrc = 'https://matechat.gitcode.com/logo.svg';
  content =
    '这里是Toolbar 工具栏组件的的基本用法演示，通过配置items参数快速搭建一个工具栏。';
  switchValue = false;
  basicItems = [
    {
      key: 'copy',
      icon: ToolbarAction.COPY,
      label: '复制',
      text: '复制内容 copy value',
    },
    {
      key: 'download',
      label: '下载',
      onClick: (actionData) => {
        console.log('download 点击事件', actionData);
      },
    },
    {
      key: 'switch',
    },
  ];

  get variantValue() {
    return this.switchValue ? 'bordered' : 'filled';
  }

  handleItemClick({ item, event }) {
    console.log(`点击了【${item.label}】`, item, event);
  }
}
