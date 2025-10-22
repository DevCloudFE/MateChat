import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from '@matechat/ng';
import { AngularDemoComponent } from '../AngularDemo';
import { SuffixInputComponent } from './suffix-demo/suffix-demo.component';
import { BaseShowComponent } from '../BaseShow/base-show.component';

@Component({
    selector: 'app-suffix-input-show',
    standalone: true,
    imports: [CommonModule, InputModule, AngularDemoComponent, SuffixInputComponent],
    template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <app-suffix-input></app-suffix-input>
    </mc-angular-demo>
    `
})
export class SuffixInputShowComponent extends BaseShowComponent {
    sourceCode: Array<{ type: string; code: string }> = [];

    constructor() {
        super();
        this.loadFiles([
            { type: 'html', path: '/demo/InputDemo/suffix-demo/suffix-demo.component.html' },
            { type: 'ts', path: '/demo/InputDemo/suffix-demo/suffix-demo.component.ts' }
        ]).then(res => {
            this.sourceCode = res;
        });
    }
}