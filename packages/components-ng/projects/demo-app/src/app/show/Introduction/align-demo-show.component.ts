import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IntroductionModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { AlignDemoComponent } from '../../demo/IntroductionDemo/align-demo/align-demo.component';

@Component({
  selector: 'app-intro-align-demo-show',
  standalone: true,
  imports: [
    CommonModule,
    IntroductionModule,
    AngularDemoComponent,
    AlignDemoComponent,
  ],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <app-intro-align-demo></app-intro-align-demo>
    </mc-angular-demo>
    `,
})
export class AlignDemoShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'HTML',
      path: '/demo/IntroductionDemo/align-demo/align-demo.component.html',
    },
    {
      type: 'TS',
      path: '/demo/IntroductionDemo/align-demo/align-demo.component.ts',
    },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
