import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BubbleComponent, ToolbarAction, ToolbarComponent } from '@matechat/ng';

@Component({
  selector: 'app-toolbar-basic-demo',
  standalone: true,
  imports: [CommonModule, ToolbarComponent, BubbleComponent],
  templateUrl: './basic-demo.component.html',
})
export class ToolbarBasicDemoComponent {
  logoImgSrc = 'https://matechat.gitcode.com/logo.svg';
  content =
    '这里是Toolbar 工具栏组件的的基本用法演示，通过配置items参数快速搭建一个工具栏。';
  basicItems = [
    {
      key: 'copy',
      icon: ToolbarAction.COPY,
      label: '复制',
      text: this.content,
    },
    {
      key: 'refresh',
      icon: ToolbarAction.REFRESH,
      label: '重新回答',
    },
    {
      key: 'like',
      icon: ToolbarAction.LIKE,
      label: '点赞',
      isActive: false,
      onClick: () => {
        console.log('like 的 onClick 方法');
      },
    },
    {
      key: 'dislike',
      icon: ToolbarAction.DISLIKE,
      label: '点踩',
      isActive: false,
    },
    {
      key: 'delete',
      icon: ToolbarAction.DELETE,
      label: '删除',
    },
    {
      key: 'share',
      icon: ToolbarAction.SHARE,
      label: '分享',
    },
  ];

  handleItemClick({ item, event }) {
    console.log(`点击了【${item.label}】`, item, event);
  }
}
