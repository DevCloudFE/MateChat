import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from '@matechat/ng';
import { AngularDemoComponent } from '../AngularDemo';
import { AutoInputComponent } from './auto-demo/auto-demo.component';
import { BaseShowComponent } from '../BaseShow/base-show.component';

@Component({
    selector: 'app-auto-input-show',
    standalone: true,
    imports: [CommonModule, InputModule, AngularDemoComponent, AutoInputComponent],
    template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <app-auto-input></app-auto-input>
    </mc-angular-demo>
    `
})
export class AutoInputShowComponent extends BaseShowComponent {
    sourceCode: Array<{ type: string; code: string }> = [];

    constructor() {
        super();
        this.loadFiles([
            { type: 'html', path: '/demo/InputDemo/auto-demo/auto-demo.component.html' },
            { type: 'ts', path: '/demo/InputDemo/auto-demo/auto-demo.component.ts' }
        ]).then(res => {
            this.sourceCode = res;
        });
    }
}