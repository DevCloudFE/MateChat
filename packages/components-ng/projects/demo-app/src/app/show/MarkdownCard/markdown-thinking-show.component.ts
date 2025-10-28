import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { MarkdownThinkDemoComponent } from '../../demo/MarkdownCardDemo/markdown-think/markdown-think.component';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';

@Component({
    selector: 'markdown-thinking-show',
    standalone: true,
    imports: [CommonModule, InputModule, AngularDemoComponent, MarkdownThinkDemoComponent],
    template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <markdown-thinking-demo></markdown-thinking-demo>
    </mc-angular-demo>
    `
})
export class MarkdownThinkingShowComponent extends BaseShowComponent {
    override urls: { type: string; path: string; }[] = [
        { type: 'html', path: '/demo/MarkdownCardDemo/markdown-thinking/markdown-thinking.component.html' },
        { type: 'ts', path: '/demo/MarkdownCardDemo/markdown-thinking/markdown-thinking.component.ts' }
    ];

    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}