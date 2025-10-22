import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleModule } from '@matechat/ng';

@Component({
  selector: 'app-basic-bubble',
  standalone: true,
  imports: [CommonModule, BubbleModule],
  templateUrl: './basic-demo.component.html'
})
export class BasicBubbleComponent {
}
