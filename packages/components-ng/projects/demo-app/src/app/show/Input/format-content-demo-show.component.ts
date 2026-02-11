import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularDemoComponent } from '../../base/AngularDemo/angular-demo.component';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { FormatContentInputComponent } from '../../demo/InputDemo/format-content-demo/format-content-demo.component';

@Component({
  selector: 'app-format-content-input-show',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AngularDemoComponent,
    FormatContentInputComponent,
  ],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
      <app-format-content-input></app-format-content-input>
    </mc-angular-demo>
  `,
})
export class FormatContentInputShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'HTML',
      path: '/demo/InputDemo/format-content-demo/format-content-demo.component.html',
    },
    {
      type: 'TS',
      path: '/demo/InputDemo/format-content-demo/format-content-demo.component.ts',
    },
    {
      type: 'SCSS',
      path: '/demo/InputDemo/format-content-demo/format-content-demo.component.scss',
    },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
