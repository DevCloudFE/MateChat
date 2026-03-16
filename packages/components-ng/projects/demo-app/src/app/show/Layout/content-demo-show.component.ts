import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { LayoutContentDemoComponent } from '../../demo/LayoutDemo/content-demo/content-demo.component';

@Component({
  selector: 'app-layout-content-demo-show',
  standalone: true,
  imports: [
    CommonModule,
    ListModule,
    AngularDemoComponent,
    LayoutContentDemoComponent,
  ],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
      <app-layout-content-demo></app-layout-content-demo>
    </mc-angular-demo>
    `,
})
export class LayoutContentDemoShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'HTML',
      path: '/demo/LayoutDemo/content-demo/content-demo.component.html',
    },
    {
      type: 'TS',
      path: '/demo/LayoutDemo/content-demo/content-demo.component.ts',
    },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
