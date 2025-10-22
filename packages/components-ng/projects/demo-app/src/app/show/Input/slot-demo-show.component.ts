import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { SlotInputComponent } from '../../demo/InputDemo/slot-demo/slot-demo.component';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';

@Component({
    selector: 'app-slot-input-show',
    standalone: true,
    imports: [CommonModule, InputModule, AngularDemoComponent, SlotInputComponent],
    template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <app-slot-input></app-slot-input>
    </mc-angular-demo>
    `
})
export class SlotInputShowComponent extends BaseShowComponent {
    override urls: { type: string; path: string; }[] = [
        { type: 'html', path: '/demo/InputDemo/slot-demo/slot-demo.component.html' },
        { type: 'ts', path: '/demo/InputDemo/slot-demo/slot-demo.component.ts' }
    ];

    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}