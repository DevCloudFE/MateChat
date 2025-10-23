import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { LoadingBubbleComponent } from '../../demo/BubbleDemo/loading-demo/loading-demo.component';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { type } from 'os';

@Component({
    selector: 'app-loading-bubble-show',
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
        { type: 'HTML', path: '/demo/BubbleDemo/loading-demo/loading-demo.component.html' },
        { type: 'TS', path: '/demo/BubbleDemo/loading-demo/loading-demo.component.ts' },
        { type: 'SCSS', path: '/demo/BubbleDemo/loading-demo/loading-demo.component.scss'}
    ]


    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}
