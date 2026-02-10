import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { BasicDemoComponent } from '../../demo/MentionDemo/basic-demo/basic-demo.component';

@Component({
    selector: 'mention-basic-show',
    standalone: true,
    imports: [CommonModule, AngularDemoComponent, BasicDemoComponent],
    template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <app-basic-demo></app-basic-demo>
    </mc-angular-demo>
    `
})
export class BasicMentionComponent extends BaseShowComponent {
    override urls: { type: string; path: string; }[] = [
        { type: 'HTML', path: '/demo/MentionDemo/basic-demo/basic-demo.component.html' },
        { type: 'TS', path: '/demo/MentionDemo/basic-demo/basic-demo.component.ts' },
        { type: 'SCSS', path: '/demo/MentionDemo/basic-demo/basic-demo.component.scss' }
    ];

    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}