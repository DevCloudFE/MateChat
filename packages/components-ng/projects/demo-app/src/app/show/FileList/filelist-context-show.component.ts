import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { McFileListModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { ContextDemoComponent } from '../../demo/FileListDemo/context-demo/context-demo.component';

@Component({
  selector: 'filelist-context-show',
  standalone: true,
  imports: [
    CommonModule,
    McFileListModule,
    AngularDemoComponent,
    ContextDemoComponent,
  ],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
      <app-context-demo></app-context-demo>
    </mc-angular-demo>
  `,
})
export class FilelistContextShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'html',
      path: '/demo/FileListDemo/context-demo/context-demo.component.html',
    },
    {
      type: 'ts',
      path: '/demo/FileListDemo/context-demo/context-demo.component.ts',
    },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
