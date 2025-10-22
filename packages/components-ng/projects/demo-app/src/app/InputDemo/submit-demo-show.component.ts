import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from '@matechat/ng';
import { AngularDemoComponent } from '../AngularDemo';
import { SubmitInputComponent } from './submit-demo/submit-demo.component';
import { BaseShowComponent } from '../BaseShow/base-show.component';

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
    sourceCode: Array<{ type: string; code: string }> = [];

    constructor() {
        super();
        this.loadFiles([
            { type: 'html', path: '/demo/InputDemo/submit-demo/submit-demo.component.html' },
            { type: 'ts', path: '/demo/InputDemo/submit-demo/submit-demo.component.ts' }
        ]).then(res => {
            this.sourceCode = res;
        });
    }
}