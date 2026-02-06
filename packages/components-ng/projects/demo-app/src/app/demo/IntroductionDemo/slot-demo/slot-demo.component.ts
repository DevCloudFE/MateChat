import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IntroductionModule } from '@matechat/ng';

@Component({
  selector: 'app-intro-slot-demo',
  standalone: true,
  imports: [CommonModule, IntroductionModule],
  templateUrl: './slot-demo.component.html',
  styleUrls: ['./slot-demo.component.scss'],
})
export class SlotDemoComponent {}
