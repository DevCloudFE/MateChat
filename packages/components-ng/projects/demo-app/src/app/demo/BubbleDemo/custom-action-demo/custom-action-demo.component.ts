import { Component } from '@angular/core';
import { BubbleModule } from '@matechat/ng';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-action-demo',
  standalone: true,
  imports: [CommonModule, BubbleModule],
  templateUrl: './custom-action-demo.component.html',
  styleUrls: ['./custom-action-demo.component.scss']
})
export class CustomActionDemoComponent {

}