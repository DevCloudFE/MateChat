import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InputModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { ToolbarSlotDemoComponent } from '../../demo/Toolbar/toolbar-slot-demo/toolbar-slot-demo.component';

@Component({
  selector: 'app-toolbar-slot-show',
  standalone: true,
  imports: [
    CommonModule,
    InputModule,
    AngularDemoComponent,
    ToolbarSlotDemoComponent,
  ],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <app-toolbar-slot-demo></app-toolbar-slot-demo>
    </mc-angular-demo>
    `,
})
export class ToolbarSlotShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'HTML',
      path: '/demo/Toolbar/toolbar-slot-demo/toolbar-slot-demo.component.html',
    },
    {
      type: 'TS',
      path: '/demo/Toolbar/toolbar-slot-demo/toolbar-slot-demo.component.ts',
    },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
