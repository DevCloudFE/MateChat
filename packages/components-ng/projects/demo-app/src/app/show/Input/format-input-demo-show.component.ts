import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularDemoComponent } from '../../base/AngularDemo/angular-demo.component';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { FormatInputComponent } from '../../demo/InputDemo/format-input-demo/format-input-demo.component';

@Component({
  selector: 'app-format-input-show',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AngularDemoComponent,
    FormatInputComponent,
  ],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
      <app-format-input></app-format-input>
    </mc-angular-demo>
  `,
})
export class FormatInputShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'HTML',
      path: '/demo/InputDemo/format-input-demo/format-input-demo.component.html',
    },
    {
      type: 'TS',
      path: '/demo/InputDemo/format-input-demo/format-input-demo.component.ts',
    },
    {
      type: 'SCSS',
      path: '/demo/InputDemo/format-input-demo/format-input-demo.component.scss',
    },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
