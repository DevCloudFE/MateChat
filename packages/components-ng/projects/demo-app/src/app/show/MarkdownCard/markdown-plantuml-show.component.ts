import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownCardModule, BubbleModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { MarkdownPlantumlDemoComponent } from '../../demo/MarkdownCardDemo/markdown-plantuml/markdown-plantuml.component';

@Component({
    selector: 'markdown-plantuml-show',
    standalone: true,
    imports: [CommonModule, MarkdownCardModule, BubbleModule, AngularDemoComponent, MarkdownPlantumlDemoComponent],
    template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <markdown-plantuml-demo></markdown-plantuml-demo>
    </mc-angular-demo>
    `
})
export class MarkdownPlantumlShowComponent extends BaseShowComponent {
    override urls: { type: string; path: string; }[] = [
        { type: 'HTML', path: '/demo/MarkdownCardDemo/markdown-plantuml/markdown-plantuml.component.html' },
        { type: 'TS', path: '/demo/MarkdownCardDemo/markdown-plantuml/markdown-plantuml.component.ts' }
    ];

    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}