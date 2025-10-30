import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { MarkdownTypingDemoComponent } from '../../demo/MarkdownCardDemo/markdown-typing/markdown-typing.component';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';

@Component({
    selector: 'markdown-typing-show',
    standalone: true,
    imports: [CommonModule, InputModule, AngularDemoComponent, MarkdownTypingDemoComponent],
    template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <markdown-typing-demo></markdown-typing-demo>
    </mc-angular-demo>
    `
})
export class MarkdownTypingShowComponent extends BaseShowComponent {
    override urls: { type: string; path: string; }[] = [
        { type: 'html', path: '/demo/MarkdownCardDemo/markdown-typing/markdown-typing.component.html' },
        { type: 'ts', path: '/demo/MarkdownCardDemo/markdown-typing/markdown-typing.component.ts' },
        { type: 'scss', path: '/demo/MarkdownCardDemo/markdown-typing/markdown-typing.component.scss' },
    ];

    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}