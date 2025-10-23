import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { AutoInputComponent } from '../../demo/InputDemo/auto-demo/auto-demo.component';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';

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
    override urls: { type: string; path: string; }[] = [
        { type: 'HTML', path: '/demo/InputDemo/auto-demo/auto-demo.component.html' },
        { type: 'TS', path: '/demo/InputDemo/auto-demo/auto-demo.component.ts' }
    ];

    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}