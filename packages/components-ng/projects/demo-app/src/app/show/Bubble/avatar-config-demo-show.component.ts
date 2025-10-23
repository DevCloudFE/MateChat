import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { AvatarConfigBubbleComponent } from '../../demo/BubbleDemo/avatar-config-demo/avatar-config-demo.component';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';

@Component({
    selector: 'app-avatar-config-bubble-show',
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
        { type: 'HTML', path: '/demo/BubbleDemo/avatar-config-demo/avatar-config-demo.component.html' },
        { type: 'TS', path: '/demo/BubbleDemo/avatar-config-demo/avatar-config-demo.component.ts' },
        { type: 'SCSS', path: '/demo/BubbleDemo/avatar-config-demo/avatar-config-demo.component.scss' }
    ];
    
    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}
