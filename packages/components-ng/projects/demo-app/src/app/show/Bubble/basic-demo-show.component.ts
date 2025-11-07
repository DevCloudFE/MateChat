import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BasicBubbleComponent } from '../../demo/BubbleDemo/basic-demo/basic-demo.component';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';

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
    override urls: { type: string; path: string; }[] = [
        { type: 'HTML', path: '/demo/BubbleDemo/basic-demo/basic-demo.component.html' },
        { type: 'TS', path: '/demo/BubbleDemo/basic-demo/basic-demo.component.ts' }
    ];

    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}
