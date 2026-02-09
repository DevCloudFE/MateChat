import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PromptModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { BasicPromptComponent } from '../../demo/PromptDemo/basic-demo/basic-demo.component';

@Component({
  selector: 'app-basic-prompt-show',
  standalone: true,
  imports: [
    CommonModule,
    PromptModule,
    AngularDemoComponent,
    BasicPromptComponent,
  ],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
      <app-basic-prompt></app-basic-prompt>
    </mc-angular-demo>
    `,
})
export class BasicPromptShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'HTML',
      path: '/demo/PromptDemo/basic-demo/basic-demo.component.html',
    },
    { type: 'TS', path: '/demo/PromptDemo/basic-demo/basic-demo.component.ts' },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
