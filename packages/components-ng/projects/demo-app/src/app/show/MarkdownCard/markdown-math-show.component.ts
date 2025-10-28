import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownCardModule, BubbleModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { MarkdownMathDemoComponent } from '../../demo/MarkdownCardDemo/markdown-math/markdown-math.component';

@Component({
    selector: 'markdown-math-show',
    standalone: true,
    imports: [CommonModule, MarkdownCardModule, BubbleModule, AngularDemoComponent, MarkdownMathDemoComponent],
    template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <markdown-math-demo></markdown-math-demo>
    </mc-angular-demo>
    `
})
export class MarkdownMathShowComponent extends BaseShowComponent {
    override urls: { type: string; path: string; }[] = [
        { type: 'HTML', path: '/demo/MarkdownCardDemo/markdown-math/markdown-math.component.html' },
        { type: 'TS', path: '/demo/MarkdownCardDemo/markdown-math/markdown-math.component.ts' }
    ];

    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}