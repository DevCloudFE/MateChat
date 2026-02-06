import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { LazyloadListComponent } from '../../demo/ListDemo/lazyload-demo/lazyload-demo.component';

@Component({
  selector: 'app-basic-list-show',
  standalone: true,
  imports: [
    CommonModule,
    ListModule,
    AngularDemoComponent,
    LazyloadListComponent,
  ],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
      <app-lazyload-list></app-lazyload-list>
    </mc-angular-demo>
    `,
})
export class LazyloadListShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'HTML',
      path: '/demo/ListDemo/lazyload-demo/lazyload-demo.component.html',
    },
    {
      type: 'TS',
      path: '/demo/ListDemo/lazyload-demo/lazyload-demo.component.ts',
    },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
