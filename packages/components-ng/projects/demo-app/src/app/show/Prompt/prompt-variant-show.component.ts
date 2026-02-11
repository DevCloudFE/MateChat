import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PromptModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { VariantPromptComponent } from '../../demo/PromptDemo/variant-demo/variant-demo.component';

@Component({
  selector: 'app-variant-prompt-show',
  standalone: true,
  imports: [
    CommonModule,
    PromptModule,
    AngularDemoComponent,
    VariantPromptComponent,
  ],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
      <app-variant-prompt></app-variant-prompt>
    </mc-angular-demo>
    `,
})
export class VariantPromptShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'HTML',
      path: '/demo/PromptDemo/variant-demo/variant-demo.component.html',
    },
    {
      type: 'TS',
      path: '/demo/PromptDemo/variant-demo/variant-demo.component.ts',
    },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
