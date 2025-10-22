import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { AlignBubbleComponent } from '../../demo/BubbleDemo/align-demo/align-demo.component';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';

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
    override urls: { type: string; path: string; }[] = [
        { type: 'html', path: '/demo/BubbleDemo/align-demo/align-demo.component.html' },
        { type: 'ts', path: '/demo/BubbleDemo/align-demo/align-demo.component.ts' }
    ];
    
    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}
