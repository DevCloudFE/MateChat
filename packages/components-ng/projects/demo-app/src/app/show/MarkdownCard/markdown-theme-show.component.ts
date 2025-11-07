import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownCardModule, BubbleModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { MarkdownThemeDemoComponent } from '../../demo/MarkdownCardDemo/markdown-theme/markdown-theme.component';

@Component({
    selector: 'markdown-theme-show',
    standalone: true,
    imports: [CommonModule, MarkdownCardModule, BubbleModule, AngularDemoComponent, MarkdownThemeDemoComponent],
    template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <markdown-theme-demo></markdown-theme-demo>
    </mc-angular-demo>
    `
})
export class MarkdownThemeShowComponent extends BaseShowComponent {
    override urls: { type: string; path: string; }[] = [
        { type: 'HTML', path: '/demo/MarkdownCardDemo/markdown-theme/markdown-theme.component.html' },
        { type: 'TS', path: '/demo/MarkdownCardDemo/markdown-theme/markdown-theme.component.ts' },
        { type: 'SCSS', path: '/demo/MarkdownCardDemo/markdown-theme/markdown-theme.component.scss' },
    ];

    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}