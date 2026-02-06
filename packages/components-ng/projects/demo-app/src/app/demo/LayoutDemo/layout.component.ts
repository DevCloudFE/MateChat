import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  BubbleModule,
  HeaderModule,
  InputModule,
  LayoutAsideModule,
  LayoutContentModule,
  LayoutHeaderModule,
  LayoutModule,
  LayoutSenderModule,
} from '@matechat/ng';

@Component({
  selector: 'app-layout-demo',
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
    HeaderModule,
  ],
  templateUrl: './layout.component.html',
})
export class LayoutDemoComponent {
  inputValue = '';
}
