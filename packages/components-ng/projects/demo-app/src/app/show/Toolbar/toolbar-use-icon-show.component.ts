import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InputModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { ToolbarUseIconDemoComponent } from '../../demo/Toolbar/toolbar-use-icon/toolbar-use-icon-demo.component';

@Component({
  selector: 'app-toolbar-use-icon-show',
  standalone: true,
  imports: [
    CommonModule,
    InputModule,
    AngularDemoComponent,
    ToolbarUseIconDemoComponent,
  ],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <app-toolbar-use-icon-demo></app-toolbar-use-icon-demo>
    </mc-angular-demo>
    `,
})
export class ToolbarUseIconShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'HTML',
      path: '/demo/Toolbar/toolbar-use-icon/toolbar-use-icon-demo.component.html',
    },
    {
      type: 'TS',
      path: '/demo/Toolbar/toolbar-use-icon/toolbar-use-icon-demo.component.ts',
    },
    {
      type: 'SCSS',
      path: '/demo/Toolbar/toolbar-use-icon/toolbar-use-icon-demo.component.scss',
    },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
