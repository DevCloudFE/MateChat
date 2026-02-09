import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { CustomListComponent } from '../../demo/ListDemo/custom-demo/custom-demo.component';

@Component({
  selector: 'app-custom-list-show',
  standalone: true,
  imports: [
    CommonModule,
    ListModule,
    AngularDemoComponent,
    CustomListComponent,
  ],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
      <app-custom-list></app-custom-list> 
    </mc-angular-demo>
    `,
})
export class CustomListShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'HTML',
      path: '/demo/ListDemo/custom-demo/custom-demo.component.html',
    },
    { type: 'TS', path: '/demo/ListDemo/custom-demo/custom-demo.component.ts' },
    {
      type: 'SCSS',
      path: '/demo/ListDemo/custom-demo/custom-demo.component.scss',
    },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
