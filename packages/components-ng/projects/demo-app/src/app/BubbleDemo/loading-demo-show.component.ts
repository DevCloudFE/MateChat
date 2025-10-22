import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleModule } from '@matechat/ng';
import { AngularDemoComponent } from '../AngularDemo';
import { LoadingBubbleComponent } from './loading-demo/loading-demo.component';
import { BaseShowComponent } from './../BaseShow/base-show.component';

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
    sourceCode: Array<{ type: string; code: string }> = [];

    constructor() {
        super();
        this.loadFiles([
            { type: 'html', path: '/demo/BubbleDemo/loading-demo/loading-demo.component.html' },
            { type: 'ts', path: '/demo/BubbleDemo/loading-demo/loading-demo.component.ts' }
        ]).then(res => {
            this.sourceCode = res;
        });
    }
}
