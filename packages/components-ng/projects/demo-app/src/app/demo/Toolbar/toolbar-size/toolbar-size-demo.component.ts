import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BubbleComponent, ToolbarAction, ToolbarComponent } from '@matechat/ng';

@Component({
  selector: 'app-toolbar-size-demo',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, BubbleComponent],
  templateUrl: './toolbar-size-demo.component.html',
})
export class ToolbarSizeDemoComponent {
  logoImgSrc = 'https://matechat.gitcode.com/logo.svg';
  content =
    '这里是Toolbar 工具栏组件的的基本用法演示，通过配置items参数快速搭建一个工具栏。';
  basicItems = [
    {
      key: 'refresh',
      icon: ToolbarAction.REFRESH,
      label: '刷新',
    },
    {
      key: 'delete',
      icon: ToolbarAction.DELETE,
      label: '删除',
    },
  ];

  handleItemClick({ item, event }) {
    console.log(`点击了【${item.label}】`, item, event);
  }
}
