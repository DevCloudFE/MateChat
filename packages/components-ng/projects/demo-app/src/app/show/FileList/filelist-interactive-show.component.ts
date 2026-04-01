import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { McFileListModule } from '@matechat/ng';
import { AngularDemoComponent } from '../../base/AngularDemo';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';
import { InteractiveDemoComponent } from '../../demo/FileListDemo/interactive-demo/interactive-demo.component';

@Component({
  selector: 'filelist-interactive-show',
  standalone: true,
  imports: [
    CommonModule,
    McFileListModule,
    AngularDemoComponent,
    InteractiveDemoComponent,
  ],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
      <app-interactive-demo></app-interactive-demo>
    </mc-angular-demo>
  `,
})
export class FilelistInteractiveShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string }[] = [
    {
      type: 'html',
      path: '/demo/FileListDemo/interactive-demo/interactive-demo.component.html',
    },
    {
      type: 'ts',
      path: '/demo/FileListDemo/interactive-demo/interactive-demo.component.ts',
    },
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}
