import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { AttachmentValidDemoComponent } from '../../demo/AttachmentDemo/valid-demo/valid-demo.component';

@Component({
  selector: 'attachment-valid-show',
  standalone: true,
  imports: [
    CommonModule,
    InputModule,
    AngularDemoComponent,
    AttachmentValidDemoComponent,
  ],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
      <attachment-valid-demo></attachment-valid-demo>
    </mc-angular-demo>
  `,
})
export class AttachmentValidShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'html',
      path: '/demo/AttachmentDemo/valid-demo/valid-demo.component.html',
    },
    {
      type: 'ts',
      path: '/demo/AttachmentDemo/valid-demo/valid-demo.component.ts',
    },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
