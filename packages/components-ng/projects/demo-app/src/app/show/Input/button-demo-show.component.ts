import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularDemoComponent } from '../../base/AngularDemo/angular-demo.component';
import { ButtonInputComponent } from '../../demo/InputDemo/button-demo/button-demo.component';
import { BaseShowComponent } from '../../base/BaseShow/base-show.component';

@Component({
  selector: 'app-button-input-show',
  standalone: true,
  imports: [CommonModule, RouterModule, AngularDemoComponent, ButtonInputComponent],
  template: `
    <mc-angular-demo [sourceCode]="sourceCode">
        <app-button-input></app-button-input>
    </mc-angular-demo>
    `
})
export class ButtonInputShowComponent extends BaseShowComponent {
  override urls: { type: string; path: string; }[] = [
    {
      type: 'HTML',
      path: '/demo/InputDemo/button-demo/button-demo.component.html'
    },
    {
      type: 'TS',
      path: '/demo/InputDemo/button-demo/button-demo.component.ts'
    },
    {
      type: 'SCSS',
      path: '/demo/InputDemo/button-demo/button-demo.component.scss'
    }
  ];

  constructor() {
    super();
    this.loadFiles(this.urls);
  }
}