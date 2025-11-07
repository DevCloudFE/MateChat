import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { MarkdownCodeOperatorDemoComponent } from '../../demo/MarkdownCardDemo/markdown-code-operator/markdown-operator.component';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';

@Component({
    selector: 'app-auto-input-show',
    standalone: true,
    imports: [CommonModule, InputModule, AngularDemoComponent, MarkdownCodeOperatorDemoComponent],
    template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <markdown-operator-demo></markdown-operator-demo>
    </mc-angular-demo>
    `
})
export class MarkdownCodeOperatorShowComponent extends BaseShowComponent {
    override urls: { type: string; path: string; }[] = [
        { type: 'html', path: '/demo/MarkdownCardDemo/markdown-code-operator/markdown-operator.component.html' },
        { type: 'ts', path: '/demo/MarkdownCardDemo/markdown-code-operator/markdown-operator.component.ts' }
    ];

    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}