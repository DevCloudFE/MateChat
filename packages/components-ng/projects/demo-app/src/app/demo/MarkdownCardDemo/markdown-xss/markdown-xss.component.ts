import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownCardModule } from '@matechat/ng';

@Component({
  selector: 'markdown-xss-demo',
  standalone: true,
  imports: [CommonModule, MarkdownCardModule],
  templateUrl: './markdown-xss.component.html',
  styleUrl: './markdown-xss.component.scss',
})
export class MarkdownXssDemoComponent {
  themeService;
  theme = 'light';
  // 配置自定义XSS规则
  customXssRules = [
    // 将其设置为null表示禁用该标签的所有属性
    { key: 'svg', value: null },
    { key: 'path', value: null },
    // 允许p标签保留custom-attr属性, 与默认允许的属性合并
    { key: 'p', value: ['custom-attr'] },
  ];
  
  // 测试XSS过滤的内容，包含各种XSS攻击尝试
  content = `
  
  <p custom-attr="123">这是一段标签属性custom-attr测试文本</p>
  <p custom-attr2="123">这是一段标签属性custom-attr2测试文本</p>
 
  <svg style="width: 100px; height: 100px;" viewBox="0 0 100 100">
    <path d="M50,10 L90,90 L10,90 Z" fill="red" />
  </svg>

  `;
  changeTheme = () => {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
  };

  themeChange = () => {
    if (this.themeService) {
      this.theme =
        this.themeService.currentTheme.id === 'infinity-theme' ? 'light' : 'dark';
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
