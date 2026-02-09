import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PromptModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { DataPromptComponent } from '../../demo/PromptDemo/data-demo/data-demo.component';

@Component({
  selector: 'app-data-prompt-show',
  standalone: true,
  imports: [
    CommonModule,
    PromptModule,
    AngularDemoComponent,
    DataPromptComponent,
  ],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
      <app-data-prompt></app-data-prompt>
    </mc-angular-demo>
    `,
})
export class DataPromptShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'HTML',
      path: '/demo/PromptDemo/data-demo/data-demo.component.html',
    },
    { type: 'TS', path: '/demo/PromptDemo/data-demo/data-demo.component.ts' },
    {
      type: 'SCSS',
      path: '/demo/PromptDemo/data-demo/data-demo.component.scss',
    },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
