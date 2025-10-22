import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleModule } from '@matechat/ng';
import { AngularDemoComponent } from '../AngularDemo';
import { BasicBubbleComponent } from './basic-demo/basic-demo.component';
import { BaseShowComponent } from '../BaseShow/base-show.component';

@Component({
    selector: 'app-basic-bubble-show',
    standalone: true,
    imports: [CommonModule, BubbleModule, AngularDemoComponent, BasicBubbleComponent],
    template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <app-basic-bubble></app-basic-bubble>
    </mc-angular-demo>
    `
})
export class BasicBubbleShowComponent extends BaseShowComponent {
    sourceCode: Array<{ type: string; code: string }> = [];

    constructor() {
        super();
        this.loadFiles([
            { type: 'html', path: '/demo/BubbleDemo/basic-demo/basic-demo.component.html' },
            { type: 'ts', path: '/demo/BubbleDemo/basic-demo/basic-demo.component.ts' }
        ]).then(res => {
            this.sourceCode = res;
        });
    }
}
