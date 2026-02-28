import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InputModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { ToolbarBasicDemoComponent } from '../../demo/Toolbar/basic-demo/basic-demo.component';

@Component({
  selector: 'app-toolbar-basic-show',
  standalone: true,
  imports: [
    CommonModule,
    InputModule,
    AngularDemoComponent,
    ToolbarBasicDemoComponent,
  ],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <app-toolbar-basic-demo></app-toolbar-basic-demo>
    </mc-angular-demo>
    `,
})
export class ToolbarBasicShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'HTML',
      path: '/demo/Toolbar/basic-demo/basic-demo.component.html',
    },
    { type: 'TS', path: '/demo/Toolbar/basic-demo/basic-demo.component.ts' },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
