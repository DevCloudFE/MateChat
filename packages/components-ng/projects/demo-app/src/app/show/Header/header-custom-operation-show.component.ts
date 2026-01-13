import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InputModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { HeaderCustomOperationDemoComponent } from '../../demo/HeaderDemo/header-custom-operation-demo/header-custom-operation-demo.component';

@Component({
  selector: 'app-basic-header-show',
  standalone: true,
  imports: [
    CommonModule,
    InputModule,
    AngularDemoComponent,
    HeaderCustomOperationDemoComponent,
  ],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <app-header-custom-operation-demo></app-header-custom-operation-demo>
    </mc-angular-demo>
    `,
})
export class HeaderCustomOperationShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'HTML',
      path: '/demo/HeaderDemo/header-custom-operation-demo/header-custom-operation-demo.component.html',
    },
    {
      type: 'TS',
      path: '/demo/HeaderDemo/header-custom-operation-demo/header-custom-operation-demo.component.ts',
    },
    {
      type: 'SCSS',
      path: '/demo/HeaderDemo/header-custom-operation-demo/header-custom-operation-demo.component.scss',
    },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
