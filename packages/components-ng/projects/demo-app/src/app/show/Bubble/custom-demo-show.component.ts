import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { CustomBubbleComponent } from '../../demo/BubbleDemo/custom-demo/custom-demo.component';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';

@Component({
    selector: 'app-custom-bubble-show',
    standalone: true,
    imports: [CommonModule, BubbleModule, AngularDemoComponent, CustomBubbleComponent],
    template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <app-custom-bubble></app-custom-bubble>
    </mc-angular-demo>
    `
})
export class CustomBubbleShowComponent extends BaseShowComponent {
    override urls: { type: string; path: string; }[] = [
        {
            type: 'HTML',
            path: '/demo/BubbleDemo/custom-demo/custom-demo.component.html'
        },
        {
            type: 'TS',
            path: '/demo/BubbleDemo/custom-demo/custom-demo.component.ts'
        }
    ];

    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}