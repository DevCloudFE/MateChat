import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleModule } from '@matechat/ng';
import { AngularDemoComponent } from '../AngularDemo';
import { VariantAvatarBubbleComponent } from './variant-avatar-demo/variant-avatar-demo.component';
import { BaseShowComponent } from '../BaseShow/base-show.component';

@Component({
    selector: 'app-align-bubble-show',
    standalone: true,
    imports: [CommonModule, BubbleModule, AngularDemoComponent, VariantAvatarBubbleComponent],
    template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <app-variant-avatar-bubble></app-variant-avatar-bubble>
    </mc-angular-demo>
    `
})
export class VariantAvatarBubbleShowComponent extends BaseShowComponent {
 sourceCode: Array<{ type: string; code: string }> = [];

    constructor() {
        super();
        this.loadFiles([
            { type: 'html', path: '/demo/BubbleDemo/variant-avatar-demo/variant-avatar-demo.component.html' },
            { type: 'ts', path: '/demo/BubbleDemo/variant-avatar-demo/variant-avatar-demo.component.ts' }
        ]).then(res => {
            this.sourceCode = res;
        });
    }
}
