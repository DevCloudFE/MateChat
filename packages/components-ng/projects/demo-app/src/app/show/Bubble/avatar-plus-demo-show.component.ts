import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { AvatarPlusBubbleComponent } from '../../demo/BubbleDemo/avatar-plus-demo/avatar-plus-demo.component';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';

@Component({
    selector: 'app-avatar-plus-bubble-show',
    standalone: true,
    imports: [CommonModule, BubbleModule, AngularDemoComponent, AvatarPlusBubbleComponent],
    template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <app-avatar-plus-bubble></app-avatar-plus-bubble>
    </mc-angular-demo>
    `
})
export class AvatarPlusBubbleShowComponent extends BaseShowComponent {
    override urls: { type: string; path: string; }[] = [
        {
            type: 'HTML',
            path: '/demo/BubbleDemo/avatar-plus-demo/avatar-plus-demo.component.html'
        },
        {
            type: 'TS',
            path: '/demo/BubbleDemo/avatar-plus-demo/avatar-plus-demo.component.ts'
        },
        {
            type: 'SCSS',
            path: '/demo/BubbleDemo/avatar-plus-demo/avatar-plus-demo.component.scss'
        }
    ];

    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}