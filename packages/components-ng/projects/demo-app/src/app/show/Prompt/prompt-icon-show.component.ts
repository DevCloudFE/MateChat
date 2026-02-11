import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PromptModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { IconPromptComponent } from '../../demo/PromptDemo/icon-demo/icon-demo.component';

@Component({
  selector: 'app-icon-prompt-show',
  standalone: true,
  imports: [
    CommonModule,
    PromptModule,
    AngularDemoComponent,
    IconPromptComponent,
  ],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
      <app-icon-prompt></app-icon-prompt>
    </mc-angular-demo>
    `,
})
export class IconPromptShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'HTML',
      path: '/demo/PromptDemo/icon-demo/icon-demo.component.html',
    },
    { type: 'TS', path: '/demo/PromptDemo/icon-demo/icon-demo.component.ts' },
    {
      type: 'SCSS',
      path: '/demo/PromptDemo/icon-demo/icon-demo.component.scss',
    },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
