import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { BasicListComponent } from '../../demo/ListDemo/basic-demo/basic-demo.component';

@Component({
  selector: 'app-basic-list-show',
  standalone: true,
  imports: [CommonModule, ListModule, AngularDemoComponent, BasicListComponent],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
      <app-basic-list></app-basic-list>
    </mc-angular-demo>
    `,
})
export class BasicListShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'HTML',
      path: '/demo/ListDemo/basic-demo/basic-demo.component.html',
    },
    { type: 'TS', path: '/demo/ListDemo/basic-demo/basic-demo.component.ts' },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
