import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { ShortcutListComponent } from '../../demo/ListDemo/shortcut-demo/shortcut-demo.component';

@Component({
  selector: 'app-shortcut-list-show',
  standalone: true,
  imports: [
    CommonModule,
    ListModule,
    AngularDemoComponent,
    ShortcutListComponent,
  ],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
      <app-shortcut-list></app-shortcut-list>
    </mc-angular-demo>
    `,
})
export class ShortcutListShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'HTML',
      path: '/demo/ListDemo/shortcut-demo/shortcut-demo.component.html',
    },
    {
      type: 'TS',
      path: '/demo/ListDemo/shortcut-demo/shortcut-demo.component.ts',
    },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
