import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownCardModule, BubbleModule } from '@matechat/ng';

@Component({
  selector: 'markdown-mermaid-demo',
  standalone: true,
  imports: [CommonModule, MarkdownCardModule],
  templateUrl: './markdown-mermaid.component.html',
  styleUrl: './markdown-mermaid.component.scss',
})
export class MarkdownMermaidDemoComponent {
  themeService;
  theme = 'light';
  content = `
# Flow Chart
\`\`\`mermaid
flowchart LR
A[Hard] -->|Text| B(Round)
B --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2]
\`\`\`

# Class Diagram
\`\`\`mermaid
classDiagram
Class01 <|-- AveryLongClass : Cool
<<Interface>> Class01
Class09 --> C2 : Where am I?
Class09 --* C3
Class09 --|> Class07
Class07 : equals()
Class07 : Object[] elementData
Class01 : size()
Class01 : int chimp
Class01 : int gorilla
class Class10 {
  <<service>>
  int id
  size()
}
\`\`\`

# State Diagram
\`\`\`mermaid
stateDiagram-v2
[*] --> Still
Still --> [*]
Still --> Moving
Moving --> Still
Moving --> Crash
Crash --> [*]
\`\`\`
`;
themeClass
  handleAction = (codeBlockData) => {
    console.log(codeBlockData);
  };

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
