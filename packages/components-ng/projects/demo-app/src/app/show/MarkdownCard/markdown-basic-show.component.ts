import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { MarkdownBasicDemoComponent } from '../../demo/MarkdownCardDemo/markdown-basic/markdown-basic.component';

@Component({
    selector: 'markdown-basic-show',
    standalone: true,
    imports: [CommonModule, InputModule, AngularDemoComponent, MarkdownBasicDemoComponent],
    template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <markdown-basic-demo></markdown-basic-demo>
    </mc-angular-demo>
    `
})
export class MarkdownBasicShowComponent extends BaseShowComponent {
    override urls: { type: string; path: string; }[] = [
        { type: 'html', path: '/demo/MarkdownCardDemo/markdown-basic/markdown-basic.component.html' },
        { type: 'ts', path: '/demo/MarkdownCardDemo/markdown-basic/markdown-basic.component.ts' }
    ];

    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}