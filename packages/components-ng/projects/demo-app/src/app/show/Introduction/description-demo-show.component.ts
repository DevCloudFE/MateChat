import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IntroductionModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { DescriptionDemoComponent } from '../../demo/IntroductionDemo/description-demo/description-demo.component';

@Component({
  selector: 'app-intro-description-demo-show',
  standalone: true,
  imports: [
    CommonModule,
    IntroductionModule,
    AngularDemoComponent,
    DescriptionDemoComponent,
  ],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <app-intro-description-demo></app-intro-description-demo>
    </mc-angular-demo>
    `,
})
export class DescriptionDemoShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'HTML',
      path: '/demo/IntroductionDemo/description-demo/description-demo.component.html',
    },
    {
      type: 'TS',
      path: '/demo/IntroductionDemo/description-demo/description-demo.component.ts',
    },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
