import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InputModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { HeaderLogoClickDemoComponent } from '../../demo/HeaderDemo/header-logo-click-demo/header-logo-click-demo.component';

@Component({
  selector: 'app-header-logo-click-show',
  standalone: true,
  imports: [
    CommonModule,
    InputModule,
    AngularDemoComponent,
    HeaderLogoClickDemoComponent,
  ],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <app-header-logo-click></app-header-logo-click>
    </mc-angular-demo>
    `,
})
export class HeaderLogoClickShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'HTML',
      path: '/demo/HeaderDemo/header-logo-click-demo/header-logo-click-demo.component.html',
    },
    {
      type: 'TS',
      path: '/demo/HeaderDemo/header-logo-click-demo/header-logo-click-demo.component.ts',
    },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
