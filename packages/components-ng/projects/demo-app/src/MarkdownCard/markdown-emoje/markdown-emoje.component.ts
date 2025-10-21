import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownCardModule, BubbleModule } from '@matechat/ng';
import { full as emoji } from 'markdown-it-emoji';
@Component({
  selector: 'markdown-emoje-demo',
  standalone: true,
  imports: [CommonModule, MarkdownCardModule],
  templateUrl: './markdown-emoje.component.html',
  styleUrl: './markdown-emoje.component.scss',
})
export class MarkdownEmojeDemoComponent {
  themeService;
  theme = 'light';
  mdPlugins = [
    {
      plugin: emoji,
    },
  ];
  content = `
:joy: :thumbsup: :laughing: :blush: :dog:
`;

}
