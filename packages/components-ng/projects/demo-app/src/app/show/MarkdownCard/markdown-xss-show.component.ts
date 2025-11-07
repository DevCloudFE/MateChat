import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { MarkdownXssDemoComponent } from '../../demo/MarkdownCardDemo/markdown-xss/markdown-xss.component';

@Component({
    selector: 'markdown-xss-show',
    standalone: true,
    imports: [CommonModule, AngularDemoComponent, MarkdownXssDemoComponent],
    template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <markdown-xss-demo></markdown-xss-demo>
    </mc-angular-demo>
    `
})
export class MarkdownXssShowComponent extends BaseShowComponent {
    override urls: { type: string; path: string; }[] = [
        { type: 'HTML', path: '/demo/MarkdownCardDemo/markdown-xss/markdown-xss.component.html' },
        { type: 'TS', path: '/demo/MarkdownCardDemo/markdown-xss/markdown-xss.component.ts' }
    ];

    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}