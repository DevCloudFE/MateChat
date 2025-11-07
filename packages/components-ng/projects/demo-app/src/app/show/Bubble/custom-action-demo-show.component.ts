import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomActionDemoComponent } from '../../demo/BubbleDemo/custom-action-demo/custom-action-demo.component';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { AngularDemoComponent } from '../../base/AngularDemo';

@Component({
  selector: 'app-custom-action-demo-show',
  standalone: true,
  imports: [CommonModule, CustomActionDemoComponent, AngularDemoComponent],
  template: `
      <mc-angular-demo [sourceCode]="sourceCode">
        <app-custom-action-demo></app-custom-action-demo>
    </mc-angular-demo>
`
})
export class CustomActionDemoShowComponent extends BaseShowComponent {
    override urls: { type: string; path: string; }[] = [
        { type: 'HTML', path: '/demo/BubbleDemo/custom-action-demo/custom-action-demo.component.html' },
        { type: 'TS', path: '/demo/BubbleDemo/custom-action-demo/custom-action-demo.component.ts' },
        { type: 'SCSS', path: '/demo/BubbleDemo/custom-action-demo/custom-action-demo.component.scss' },
    ];
    constructor() {
        super();
        this.loadFiles(this.urls);
    }
}