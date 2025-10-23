import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { SubmitInputComponent } from '../../demo/InputDemo/submit-demo/submit-demo.component';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';

@Component({
    selector: 'app-submit-input-show',
    standalone: true,
    imports: [CommonModule, InputModule, AngularDemoComponent, SubmitInputComponent],
    template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <app-submit-input></app-submit-input>
    </mc-angular-demo>
    `
})
export class SubmitInputShowComponent extends BaseShowComponent {
    override urls: { type: string; path: string; }[] = [
        { type: 'HTML', path: '/demo/InputDemo/submit-demo/submit-demo.component.html' },
        { type: 'TS', path: '/demo/InputDemo/submit-demo/submit-demo.component.ts' }
    ];

    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}