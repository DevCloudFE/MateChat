import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownCardModule } from '@matechat/ng';
@Component({
  selector: 'markdown-header-demo',
  standalone: true,
  imports: [CommonModule, MarkdownCardModule],
  templateUrl: './markdown-header.component.html',
  styleUrl: './markdown-header.component.scss',
})
export class MarkdownHeaderDemoComponent {
  theme = 'light';

 content = `以下是快速排序的实现方法：

\`\`\`ts
function quickSort(arr) {
  // 快速排序
}
\`\`\`
`;
  themeService;
  themeClass = 'light-background';
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
