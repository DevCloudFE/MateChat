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
  theme = 'light';

 content = `以下是快速排序的实现方法：

\`\`\`ts
function quickSort(arr) {
  // 快速排序
}
\`\`\`
`;

 handleAction(codeBlockData) {
  console.log(codeBlockData);
};

}
