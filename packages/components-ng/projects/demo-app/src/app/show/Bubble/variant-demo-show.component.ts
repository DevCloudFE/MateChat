import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { VariantBubbleComponent } from '../../demo/BubbleDemo/variant-demo/variant-demo.component';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';

@Component({
    selector: 'app-variant-bubble-show',
    standalone: true,
    imports: [CommonModule, BubbleModule, AngularDemoComponent, VariantBubbleComponent],
    template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <app-variant-bubble></app-variant-bubble>
    </mc-angular-demo>
    `
})
export class VariantBubbleShowComponent extends BaseShowComponent {
    override urls: { type: string; path: string; }[] = [
        { type: 'HTML', path: '/demo/BubbleDemo/variant-demo/variant-demo.component.html' },
        { type: 'TS', path: '/demo/BubbleDemo/variant-demo/variant-demo.component.ts' },
        { type: 'SCSS', path: '/demo/BubbleDemo/variant-demo/variant-demo.component.scss' }
    ]

    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}
