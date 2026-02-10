import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { DisplayListComponent } from '../../demo/ListDemo/display-demo/display-demo.component';

@Component({
  selector: 'app-display-list-show',
  standalone: true,
  imports: [
    CommonModule,
    ListModule,
    AngularDemoComponent,
    DisplayListComponent,
  ],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
      <app-display-list></app-display-list>
    </mc-angular-demo>
    `,
})
export class DisplayListShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'HTML',
      path: '/demo/ListDemo/display-demo/display-demo.component.html',
    },
    {
      type: 'TS',
      path: '/demo/ListDemo/display-demo/display-demo.component.ts',
    },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
