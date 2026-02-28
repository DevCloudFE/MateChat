import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IntroductionModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { SlotDemoComponent } from '../../demo/IntroductionDemo/slot-demo/slot-demo.component';

@Component({
  selector: 'app-intro-slot-demo-show',
  standalone: true,
  imports: [
    CommonModule,
    IntroductionModule,
    AngularDemoComponent,
    SlotDemoComponent,
  ],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <app-intro-slot-demo></app-intro-slot-demo>
    </mc-angular-demo>
    `,
})
export class SlotDemoShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'HTML',
      path: '/demo/IntroductionDemo/slot-demo/slot-demo.component.html',
    },
    {
      type: 'TS',
      path: '/demo/IntroductionDemo/slot-demo/slot-demo.component.ts',
    },
    {
      type: 'CSS',
      path: '/demo/IntroductionDemo/slot-demo/slot-demo.component.scss',
    },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
