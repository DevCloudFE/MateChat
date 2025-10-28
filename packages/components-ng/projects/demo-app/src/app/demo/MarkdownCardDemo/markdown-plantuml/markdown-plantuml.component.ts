import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownCardModule, BubbleModule } from '@matechat/ng';
import PlantUml from 'markdown-it-plantuml'; // 请首先安装markdown-it-plantuml依赖

@Component({
  selector: 'markdown-plantuml-demo',
  standalone: true,
  imports: [CommonModule, MarkdownCardModule, BubbleModule],
  templateUrl: './markdown-plantuml.component.html',
  styleUrl: './markdown-plantuml.component.scss',
})
export class MarkdownPlantumlDemoComponent {
  themeService;
  theme = 'light';
  themeClass = 'light-background';
  content = `
@startuml
Alice -> "Bob()" : Hello
"Bob()" -> "This is very long" as Long
' You can also declare:
' "Bob()" -> Long as "This is very long"
Long --> "Bob()" : ok
@enduml
`;
  mdPlugins = [
    {
      plugin: PlantUml,
      opts: {
        server: 'https://www.plantuml.com/plantuml',
      }, // 自定义server可参考plantuml官方文档进行搭建
    },
  ];
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
