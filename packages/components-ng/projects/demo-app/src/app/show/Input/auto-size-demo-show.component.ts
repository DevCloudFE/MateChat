import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularDemoComponent } from '../../base/AngularDemo/angular-demo.component';
import { AutoSizeInputComponent } from '../../demo/InputDemo/auto-size-demo/auto-size-demo.component';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';

@Component({
  selector: 'app-auto-size-input-show',
  standalone: true,
  imports: [CommonModule, RouterModule, AngularDemoComponent, AutoSizeInputComponent],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
      <app-auto-size-input></app-auto-size-input>
    </mc-angular-demo>
  `
})
export class AutoSizeInputShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string; }[] = [
    {
      type: 'HTML',
      path: '/demo/InputDemo/auto-size-demo/auto-size-demo.component.html'
    },
    {
      type: 'TS',
      path: '/demo/InputDemo/auto-size-demo/auto-size-demo.component.ts'
    },
    {
      type: 'SCSS',
      path: '/demo/InputDemo/auto-size-demo/auto-size-demo.component.scss'
    }
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}