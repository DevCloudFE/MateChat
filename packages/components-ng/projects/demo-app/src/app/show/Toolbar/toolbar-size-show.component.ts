import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InputModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { ToolbarSizeDemoComponent } from '../../demo/Toolbar/toolbar-size/toolbar-size-demo.component';

@Component({
  selector: 'app-toolbar-size-show',
  standalone: true,
  imports: [
    CommonModule,
    InputModule,
    AngularDemoComponent,
    ToolbarSizeDemoComponent,
  ],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <app-toolbar-size-demo></app-toolbar-size-demo>
    </mc-angular-demo>
    `,
})
export class ToolbarSizeShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'HTML',
      path: '/demo/Toolbar/toolbar-size/toolbar-size-demo.component.html',
    },
    {
      type: 'TS',
      path: '/demo/Toolbar/toolbar-size/toolbar-size-demo.component.ts',
    },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
