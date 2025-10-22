import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { VariantBubbleComponent } from '../../demo/BubbleDemo/variant-demo/variant-demo.component';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';

@Component({
    selector: 'app-align-bubble-show',
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
        { type: 'html', path: '/demo/BubbleDemo/variant-demo/variant-demo.component.html' },
        { type: 'ts', path: '/demo/BubbleDemo/variant-demo/variant-demo.component.ts' }
    ]
    
    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}
