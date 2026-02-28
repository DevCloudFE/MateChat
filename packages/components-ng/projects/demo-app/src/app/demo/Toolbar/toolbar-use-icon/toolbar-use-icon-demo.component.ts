import { CommonModule } from '@angular/common';
import { type AfterViewInit, Component } from '@angular/core';
import {
  BubbleComponent,
  CopyIconComponent,
  DislikeIconComponent,
  LikeIconComponent,
  MarkdownCardModule,
  ShareIconComponent,
  ToolbarAction,
  ToolbarComponent,
} from '@matechat/ng';

@Component({
  selector: 'app-toolbar-use-icon-demo',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarComponent,
    CopyIconComponent,
    LikeIconComponent,
    DislikeIconComponent,
    ShareIconComponent,
    MarkdownCardModule,
    BubbleComponent,
  ],
  templateUrl: './toolbar-use-icon-demo.component.html',
  styleUrl: './toolbar-use-icon-demo.component.scss',
})
export class ToolbarUseIconDemoComponent implements AfterViewInit {
  logoImgSrc = 'https://matechat.gitcode.com/logo.svg';
  userImgSrc = 'https://matechat.gitcode.com/png/demo/userAvatar.svg';

  MOCK_CONTENT = `与其他组件结合使用，在打字机结束后显示操作栏，如果你需要重新执行打字机动效，可点击操作栏刷新按钮。`;
  themeService: any;
  content = this.MOCK_CONTENT;
  size = 16;
  theme = 'light';
  typingOptions4 = {
    interval: 200,
    step: 2,
  };
  likeActive = true;
  dislikeActive = false;
  content1 = '';
  interval: any;
  contentEnd = false;
  streamEnd = false;
  basicItems = [
    {
      key: 'copy',
      icon: ToolbarAction.COPY,
      label: '复制',
      text: this.MOCK_CONTENT,
    },
    {
      key: 'refresh',
      icon: ToolbarAction.REFRESH,
      label: '刷新',
      onClick: () => {
        console.log('refresh click');
        this.content1 = '';
        this.contentEnd = false;
        this.streamEnd = false;
        setTimeout(() => {
          this.content = this.MOCK_CONTENT;
          this.streamContent();
        });
      },
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
      key: 'share',
      icon: ToolbarAction.SHARE,
      label: '分享',
    },
    {
      key: 'delete',
      icon: ToolbarAction.DELETE,
      label: '删除',
    },
  ];

  streamContent() {
    clearInterval(this.interval);
    let currentIndex = 0;
    this.interval = setInterval(() => {
      currentIndex += Math.ceil(Math.random() * 10);
      this.content1 = this.MOCK_CONTENT.slice(0, currentIndex);
      if (currentIndex > this.MOCK_CONTENT.length) {
        this.contentEnd = true;
        clearInterval(this.interval);
      }
    }, 100);
  }

  generateAnswer() {
    this.content = '';
    this.content1 = '';
    setTimeout(() => {
      this.content = this.MOCK_CONTENT;
      this.streamContent();
    });
  }

  likeClick(e) {
    console.log('like点击事件', e);
  }

  activeChange(isActive) {
    console.log('activeChange', isActive);
    this.likeActive = isActive;
    this.dislikeActive = false;
  }

  dislikeActiveChange(isActive) {
    console.log('dislikeActiveChange', isActive);
    this.dislikeActive = isActive;
    this.likeActive = false;
  }

  typingEnd() {
    if (this.contentEnd) {
      this.streamEnd = true;
      console.log('流式与打字机效果完成');
    }
  }

  themeChange = () => {
    if (this.themeService) {
      this.theme =
        this.themeService.currentTheme.id === 'infinity-theme'
          ? 'light'
          : 'dark';
    }
  };

  ngAfterViewInit() {
    this.streamContent();
    if (typeof window !== 'undefined') {
      this.themeService = window['devuiThemeService'];
    }
    this.themeChange();
    if (this.themeService && this.themeService.eventBus) {
      this.themeService.eventBus.add('themeChanged', this.themeChange);
    }
  }
}
