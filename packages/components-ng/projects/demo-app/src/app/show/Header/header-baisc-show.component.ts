import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InputModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { HeaderBasicComponent } from '../../demo/HeaderDemo/basic-demo/basic-demo.component';

@Component({
  selector: 'app-basic-header-show',
  standalone: true,
  imports: [
    CommonModule,
    InputModule,
    AngularDemoComponent,
    HeaderBasicComponent,
  ],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <app-header-basic></app-header-basic>
    </mc-angular-demo>
    `,
})
export class HeaderBasicShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'HTML',
      path: '/demo/HeaderDemo/basic-demo/basic-demo.component.html',
    },
    { type: 'TS', path: '/demo/HeaderDemo/basic-demo/basic-demo.component.ts' },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
