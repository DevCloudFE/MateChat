import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { SuffixInputComponent } from '../../demo/InputDemo/suffix-demo/suffix-demo.component';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';

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
    override urls: { type: string; path: string; }[] = [
        { type: 'HTML', path: '/demo/InputDemo/suffix-demo/suffix-demo.component.html' },
        { type: 'TS', path: '/demo/InputDemo/suffix-demo/suffix-demo.component.ts' },
        { type: 'SCSS', path: '/demo/InputDemo/suffix-demo/suffix-demo.component.scss' }
    ];

    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}