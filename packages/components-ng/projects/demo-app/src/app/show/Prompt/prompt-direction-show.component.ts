import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PromptModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { DirectionPromptComponent } from '../../demo/PromptDemo/direction-demo/direction-demo.component';

@Component({
  selector: 'app-direction-prompt-show',
  standalone: true,
  imports: [
    CommonModule,
    PromptModule,
    AngularDemoComponent,
    DirectionPromptComponent,
  ],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
      <app-direction-prompt></app-direction-prompt>
    </mc-angular-demo>
    `,
})
export class DirectionPromptShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'HTML',
      path: '/demo/PromptDemo/direction-demo/direction-demo.component.html',
    },
    {
      type: 'TS',
      path: '/demo/PromptDemo/direction-demo/direction-demo.component.ts',
    },
    {
      type: 'SCSS',
      path: '/demo/PromptDemo/direction-demo/direction-demo.component.scss',
    },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
