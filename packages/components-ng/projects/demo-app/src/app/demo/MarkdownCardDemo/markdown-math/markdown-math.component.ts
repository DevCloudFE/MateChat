import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownCardModule, BubbleModule } from '@matechat/ng';
//import { katex } from '@mdit/plugin-katex'; // 请首先安装@mdit/plugin-katex依赖

@Component({
  selector: 'markdown-math-demo',
  standalone: true,
  imports: [CommonModule, MarkdownCardModule, BubbleModule],
  templateUrl: './markdown-math.component.html',
  styleUrl: './markdown-math.component.scss',
})
export class MarkdownMathDemoComponent {
  themeService;
  theme = 'light';
  themeClass = 'light-background';
  content = `
$E = mc^2$
$\\sqrt{3x-1}+(1+x)^2$

`;
  mdPlugins = [
  //   {
  //  plugin: katex,
  //  opt: {}
  // }
]
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
