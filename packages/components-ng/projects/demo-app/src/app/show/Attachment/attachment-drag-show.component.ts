import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { AttachmentDragDemoComponent } from '../../demo/AttachmentDemo/drag-demo/drag-demo.component';

@Component({
  selector: 'attachment-drag-show',
  standalone: true,
  imports: [
    CommonModule,
    InputModule,
    AngularDemoComponent,
    AttachmentDragDemoComponent,
  ],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
      <attachment-drag-demo></attachment-drag-demo>
    </mc-angular-demo>
  `,
})
export class AttachmentDragShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'html',
      path: '/demo/AttachmentDemo/drag-demo/drag-demo.component.html',
    },
    {
      type: 'ts',
      path: '/demo/AttachmentDemo/drag-demo/drag-demo.component.ts',
    },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
