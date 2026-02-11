import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularDemoComponent } from '../../base/AngularDemo/angular-demo.component';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { ThemeTagComponent } from '../../demo/InputDemo/theme-tag-demo/theme-tag-demo.component';

@Component({
  selector: 'app-theme-tag-show',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AngularDemoComponent,
    ThemeTagComponent,
  ],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
      <app-theme-tag></app-theme-tag>
    </mc-angular-demo>
  `,
})
export class ThemeTagShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'HTML',
      path: '/demo/InputDemo/theme-tag-demo/theme-tag-demo.component.html',
    },
    {
      type: 'TS',
      path: '/demo/InputDemo/theme-tag-demo/theme-tag-demo.component.ts',
    },
    {
      type: 'SCSS',
      path: '/demo/InputDemo/theme-tag-demo/theme-tag-demo.component.scss',
    },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
