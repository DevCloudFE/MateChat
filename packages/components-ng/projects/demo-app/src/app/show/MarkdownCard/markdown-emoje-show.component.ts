import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { MarkdownEmojeDemoComponent } from '../../demo/MarkdownCardDemo/markdown-emoje/markdown-emoje.component';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';

@Component({
    selector: 'app-markdown-emoje-show',
    standalone: true,
    imports: [CommonModule, InputModule, AngularDemoComponent, MarkdownEmojeDemoComponent],
    template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <markdown-emoje-demo></markdown-emoje-demo>
    </mc-angular-demo>
    `
})
export class MarkdownEmojeShowComponent extends BaseShowComponent {
    override urls: { type: string; path: string; }[] = [
        { type: 'html', path: '/demo/MarkdownCardDemo/markdown-emoje/markdown-emoje.component.html' },
        { type: 'ts', path: '/demo/MarkdownCardDemo/markdown-emoje/markdown-emoje.component.ts' }
    ];

    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}