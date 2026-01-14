import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { AttachmentBasicDemoComponent } from '../../demo/AttachmentDemo/basic-demo/basic-demo.component';

@Component({
  selector: 'attachment-basic-show',
  standalone: true,
  imports: [
    CommonModule,
    InputModule,
    AngularDemoComponent,
    AttachmentBasicDemoComponent,
  ],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
      <attachment-basic-demo></attachment-basic-demo>
    </mc-angular-demo>
  `,
})
export class AttachmentBasicShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'html',
      path: '/demo/AttachmentDemo/basic-demo/basic-demo.component.html',
    },
    {
      type: 'ts',
      path: '/demo/AttachmentDemo/basic-demo/basic-demo.component.ts',
    },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
