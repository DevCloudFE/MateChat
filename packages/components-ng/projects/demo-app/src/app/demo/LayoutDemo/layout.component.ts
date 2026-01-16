import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LayoutAsideModule,
  LayoutContentModule,
  LayoutHeaderModule,
  LayoutModule,
  LayoutSenderModule,
  BubbleModule,
  InputModule,
} from '@matechat/ng';

@Component({
    selector: 'mc-layout-demo',
    standalone: true,
    imports: [
      CommonModule,
      LayoutAsideModule,
      LayoutContentModule,
      LayoutHeaderModule,
      LayoutModule,
      LayoutSenderModule,
      BubbleModule,
      InputModule,
    ],
    styleUrls: ['./layout.component.scss'],
    templateUrl: './layout.component.html'
})
export class LayoutDemoComponent {
  inputValue = '';
}
