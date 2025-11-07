import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { VariantAvatarBubbleComponent } from '../../demo/BubbleDemo/variant-avatar-demo/variant-avatar-demo.component';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';

@Component({
    selector: 'app-variant-avatar-bubble-show',
    standalone: true,
    imports: [CommonModule, BubbleModule, AngularDemoComponent, VariantAvatarBubbleComponent],
    template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <app-variant-avatar-bubble></app-variant-avatar-bubble>
    </mc-angular-demo>
    `
})
export class VariantAvatarBubbleShowComponent extends BaseShowComponent {
    override urls: { type: string; path: string; }[] = [
        { type: 'HTML', path: '/demo/BubbleDemo/variant-avatar-demo/variant-avatar-demo.component.html' },
        { type: 'TS', path: '/demo/BubbleDemo/variant-avatar-demo/variant-avatar-demo.component.ts' },
        { type: 'SCSS', path: '/demo/BubbleDemo/variant-avatar-demo/variant-avatar-demo.component.scss' }
    ]

    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}
