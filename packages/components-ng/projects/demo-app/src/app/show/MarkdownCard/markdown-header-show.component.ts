import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownCardModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { MarkdownHeaderDemoComponent } from '../../demo/MarkdownCardDemo/markdown-header/markdown-header.component';

@Component({
    selector: 'markdown-header-show',
    standalone: true,
    imports: [CommonModule, MarkdownCardModule, AngularDemoComponent, MarkdownHeaderDemoComponent],
    template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <markdown-header-demo></markdown-header-demo>
    </mc-angular-demo>
    `
})
export class MarkdownHeaderShowComponent extends BaseShowComponent {
    override urls: { type: string; path: string; }[] = [
        { type: 'HTML', path: '/demo/MarkdownCardDemo/markdown-header/markdown-header.component.html' },
        { type: 'TS', path: '/demo/MarkdownCardDemo/markdown-header/markdown-header.component.ts' },
        { type: 'SCSS', path: '/demo/MarkdownCardDemo/markdown-header/markdown-header.component.scss' },
    ];

    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}