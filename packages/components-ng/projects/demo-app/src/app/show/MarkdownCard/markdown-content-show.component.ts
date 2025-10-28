import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownCardModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { MarkdownContentDemoComponent } from '../../demo/MarkdownCardDemo/markdown-content/markdown-content.component';

@Component({
    selector: 'markdown-content-show',
    standalone: true,
    imports: [CommonModule, MarkdownCardModule, AngularDemoComponent, MarkdownContentDemoComponent],
    template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <markdown-content-demo></markdown-content-demo>
    </mc-angular-demo>
    `
})
export class MarkdownContentShowComponent extends BaseShowComponent {
    override urls: { type: string; path: string; }[] = [
        { type: 'HTML', path: '/demo/MarkdownCardDemo/markdown-content/markdown-content.component.html' },
        { type: 'TS', path: '/demo/MarkdownCardDemo/markdown-content/markdown-content.component.ts' }
    ];

    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}