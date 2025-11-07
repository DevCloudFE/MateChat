import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleModule } from '@matechat/ng';
import MarkdownIt from 'markdown-it';

@Component({
    selector: 'app-custom-bubble',
    standalone: true,
    imports: [CommonModule, BubbleModule],
    templateUrl: './custom-demo.component.html'
})
export class CustomBubbleComponent {
    content = `#标题1 标题1内容\n\n##标题2 标题2内容\n\n>引用引用`;
    // 更多配置可以参考 markdown-it api 文档，或直接使用 Markdown卡片 组件
    mdt = new MarkdownIt({ breaks: true, linkify: true, html: true }); 
}
