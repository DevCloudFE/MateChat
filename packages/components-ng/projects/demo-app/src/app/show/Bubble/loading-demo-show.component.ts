import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { LoadingBubbleComponent } from '../../demo/BubbleDemo/loading-demo/loading-demo.component';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';

@Component({
    selector: 'app-align-bubble-show',
    standalone: true,
    imports: [CommonModule, BubbleModule, AngularDemoComponent, LoadingBubbleComponent],
    template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <app-loading-bubble></app-loading-bubble>
    </mc-angular-demo>
    `
})
export class LoadingBubbleShowComponent extends BaseShowComponent {
    override urls: { type: string; path: string; }[] = [
        { type: 'html', path: '/demo/BubbleDemo/loading-demo/loading-demo.component.html' },
        { type: 'ts', path: '/demo/BubbleDemo/loading-demo/loading-demo.component.ts' }
    ]


    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}
