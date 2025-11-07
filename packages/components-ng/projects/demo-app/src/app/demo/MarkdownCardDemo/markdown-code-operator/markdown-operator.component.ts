import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownCardModule, BubbleModule } from '@matechat/ng';
@Component({
  selector: 'markdown-operator-demo',
  standalone: true,
  imports: [CommonModule, MarkdownCardModule],
  templateUrl: './markdown-operator.component.html',
  styleUrl: './markdown-operator.component.scss',
})
export class MarkdownCodeOperatorDemoComponent {
  themeService;
  theme = 'light';
  themeClass = 'light-background';

  content = `以下是快速排序的实现方法：

\`\`\`ts
function quickSort(arr) {
  // 快速排序
}
\`\`\`
`;

  handleAction(codeBlockData) {
    console.log(codeBlockData);
  }

    changeTheme = () => {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.themeClass =
      this.themeClass === 'light-background'
        ? 'dark-background'
        : 'light-background';
  };

  themeChange = () => {
    if (this.themeService) {
      this.theme =
        this.themeService.currentTheme.id === 'infinity-theme'
          ? 'light'
          : 'dark';
          this.themeClass =
      this.themeClass === 'light-background'
        ? 'dark-background'
        : 'light-background';
    }
  };

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.themeService = window['devuiThemeService'];
    }
    this.themeChange();
    if (this.themeService && this.themeService.eventBus) {
      this.themeService.eventBus.add('themeChanged', this.themeChange);
    }
  }
}
