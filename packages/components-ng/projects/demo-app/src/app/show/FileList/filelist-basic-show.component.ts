import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { McFileListModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { BasicDemoComponent } from '../../demo/FileListDemo/basic-demo/basic-demo.component';

@Component({
  selector: 'filelist-basic-show',
  standalone: true,
  imports: [
    CommonModule,
    McFileListModule,
    AngularDemoComponent,
    BasicDemoComponent,
  ],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
      <app-basic-demo></app-basic-demo>
    </mc-angular-demo>
  `,
})
export class FilelistBasicShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'html',
      path: '/demo/FileListDemo/basic-demo/basic-demo.component.html',
    },
    {
      type: 'ts',
      path: '/demo/FileListDemo/basic-demo/basic-demo.component.ts',
    },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
