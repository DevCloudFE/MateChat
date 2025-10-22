import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleModule } from '@matechat/ng';
import { AngularDemoComponent } from '../AngularDemo';
import { AlignBubbleComponent } from './align-demo/align-demo.component';
import { BaseShowComponent } from '../BaseShow/base-show.component';

@Component({
    selector: 'app-align-bubble-show',
    standalone: true,
    imports: [CommonModule, BubbleModule, AngularDemoComponent, AlignBubbleComponent],
    template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <app-align-bubble></app-align-bubble>
    </mc-angular-demo>
    `
})
export class AlignBubbleShowComponent extends BaseShowComponent {
    sourceCode: Array<{ type: string; code: string }> = [];
    
    constructor() {
        super();
        this.loadFiles([
            { type: 'html', path: '/demo/BubbleDemo/align-demo/align-demo.component.html' },
            { type: 'ts', path: '/demo/BubbleDemo/align-demo/align-demo.component.ts' }
        ]).then(res => {
            this.sourceCode = res;
        });
    }
}
