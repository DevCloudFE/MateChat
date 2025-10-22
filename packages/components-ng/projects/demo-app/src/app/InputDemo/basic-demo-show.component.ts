import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from '@matechat/ng';
import { AngularDemoComponent } from '../AngularDemo';
import { BasicInputComponent } from './basic-demo/basic-demo.component';
import { BaseShowComponent } from '../BaseShow/base-show.component';

@Component({
    selector: 'app-basic-input-show',
    standalone: true,
    imports: [CommonModule, InputModule, AngularDemoComponent, BasicInputComponent],
    template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <app-basic-input></app-basic-input>
    </mc-angular-demo>
    `
})
export class BasicInputShowComponent extends BaseShowComponent {
    sourceCode: Array<{ type: string; code: string }> = [];

    constructor() {
        super();
        this.loadFiles([
            { type: 'html', path: '/demo/InputDemo/basic-demo/basic-demo.component.html' },
            { type: 'ts', path: '/demo/InputDemo/basic-demo/basic-demo.component.ts' }
        ]).then(res => {
            this.sourceCode = res;
        });
    }
}