import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { CustomStyleDemoComponent } from '../../demo/MentionDemo/custom-style-demo/custom-style-demo.component';

@Component({
    selector: 'mention-custom-style-show',
    standalone: true,
    imports: [CommonModule, AngularDemoComponent, CustomStyleDemoComponent],
    template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <app-custom-style-demo></app-custom-style-demo>
    </mc-angular-demo>
    `
})
export class CustomStyleMentionComponent extends BaseShowComponent {
    override urls: { type: string; path: string; }[] = [
        { type: 'HTML', path: '/demo/MentionDemo/custom-style-demo/custom-style-demo.component.html' },
        { type: 'TS', path: '/demo/MentionDemo/custom-style-demo/custom-style-demo.component.ts' },
        { type: 'SCSS', path: '/demo/MentionDemo/custom-style-demo/custom-style-demo.component.scss' }
    ];

    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}