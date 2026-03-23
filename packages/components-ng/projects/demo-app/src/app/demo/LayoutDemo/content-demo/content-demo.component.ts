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
  selector: 'app-layout-content-demo',
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
  templateUrl: './content-demo.component.html',
})
export class LayoutContentDemoComponent {
  inputValue = '';
  messages = this.getInitMessags();

  getInitMessags() {
    return new Array(10).fill(0).map((item, index) => ({
      from: index % 2 === 0 ? 'user' : 'ai',
      content:
        index % 2 === 0 ? 'Hello MateChat' : 'Hello, what can I do for you?',
    }));
  }
  pushMessage() {
    this.messages.push(
      ...[
        { from: 'user', content: 'Hello MateChat' },
        { from: 'ai', content: 'Hello, what can I do for you?' },
      ],
    );
  }
}
