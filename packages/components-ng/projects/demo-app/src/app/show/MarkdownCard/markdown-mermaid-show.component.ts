import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { MarkdownMermaidDemoComponent } from '../../demo/MarkdownCardDemo/markdown-mermaid/markdown-mermaid.component';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';

@Component({
    selector: 'app-markdown-mermaid-show',
    standalone: true,
    imports: [CommonModule, InputModule, AngularDemoComponent, MarkdownMermaidDemoComponent],
    template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <markdown-mermaid-demo></markdown-mermaid-demo>
    </mc-angular-demo>
    `
})
export class MarkdownMermaidShowComponent extends BaseShowComponent {
    override urls: { type: string; path: string; }[] = [
        { type: 'html', path: '/demo/MarkdownCardDemo/markdown-mermaid/markdown-mermaid.component.html' },
        { type: 'ts', path: '/demo/MarkdownCardDemo/markdown-mermaid/markdown-mermaid.component.ts' },
        { type: 'scss', path: '/demo/MarkdownCardDemo/markdown-mermaid/markdown-mermaid.component.scss' }

    ];

    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}