import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownCardModule, BubbleModule } from '@matechat/ng';

@Component({
  selector: 'markdown-typing-demo',
  standalone: true,
  imports: [CommonModule, MarkdownCardModule, BubbleModule],
  templateUrl: './markdown-typing.component.html',
  styleUrl: './markdown-typing.component.scss',
})
export class MarkdownTypingDemoComponent {
  MOCK_CONTENT = `**我了解到了你的需求**，*会进行<span style="color:red">打字机效果输出</span>，如果你需要重新执行打字机动效*，可点击重新执行按钮。`;
  themeService;
  content = this.MOCK_CONTENT;
  theme = 'light';

  typingOptions1 = {
    step: [1, 5],
    interval: 200,
    style: 'cursor',
  };

  typingOptions2 = {
    interval: 200,
    style: 'gradient',
  };

  typingOptions3 = {
    interval: 200,
    style: 'color',
  };

  typingOptions4 = {
    interval: 200,
    step: 1,
  };

  content1 = '';
  interval;
  stramEnd = false;

  streamContent = () => {
    clearInterval(this.interval);
    let currentIndex = 0;
    this.interval = setInterval(() => {
      currentIndex += Math.ceil(Math.random() * 10);
      this.content1 = this.MOCK_CONTENT.slice(0, currentIndex);
      if (currentIndex > this.MOCK_CONTENT.length) {
        this.stramEnd = true;
        clearInterval(this.interval);
      }
    }, 100);
  };

  generateAnswer = () => {
    this.content = '';
    this.content1 = '';
    setTimeout(() => {
      this.content = this.MOCK_CONTENT;
      this.streamContent();
    });
  };

  typingEnd() {
    if (this.stramEnd) {
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
  }

  ngOnInit() {
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
