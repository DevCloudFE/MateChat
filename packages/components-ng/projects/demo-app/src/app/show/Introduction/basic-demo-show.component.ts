import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IntroductionModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { BasicDemoComponent } from '../../demo/IntroductionDemo/basic-demo/basic-demo.component';

@Component({
  selector: 'app-intro-basic-demo-show',
  standalone: true,
  imports: [
    CommonModule,
    IntroductionModule,
    AngularDemoComponent,
    BasicDemoComponent,
  ],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <app-intro-basic-demo></app-intro-basic-demo>
    </mc-angular-demo>
    `,
})
export class BasicDemoShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'HTML',
      path: '/demo/IntroductionDemo/basic-demo/basic-demo.component.html',
    },
    {
      type: 'TS',
      path: '/demo/IntroductionDemo/basic-demo/basic-demo.component.ts',
    },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
