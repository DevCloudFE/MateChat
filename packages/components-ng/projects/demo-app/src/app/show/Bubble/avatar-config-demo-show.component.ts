import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { AvatarConfigBubbleComponent } from '../../demo/BubbleDemo/avatar-config-demo/avatar-config-demo.component';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';

@Component({
    selector: 'app-align-bubble-show',
    standalone: true,
    imports: [CommonModule, BubbleModule, AngularDemoComponent, AvatarConfigBubbleComponent],
    template: `
    <mc-angular-demo [sourceCode]="sourceCode">
       <app-avatar-config-bubble></app-avatar-config-bubble>
    </mc-angular-demo>
    `
})
export class AvatarConfigBubbleShowComponent extends BaseShowComponent {
    override urls: { type: string; path: string; }[] = [
        { type: 'html', path: '/demo/BubbleDemo/avatar-config-demo/avatar-config-demo.component.html' },
        { type: 'ts', path: '/demo/BubbleDemo/avatar-config-demo/avatar-config-demo.component.ts' }
    ];
    
    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}
