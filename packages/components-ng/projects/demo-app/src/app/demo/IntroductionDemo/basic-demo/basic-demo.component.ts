import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IntroductionModule } from '@matechat/ng';

@Component({
  selector: 'app-intro-basic-demo',
  standalone: true,
  imports: [CommonModule, IntroductionModule],
  templateUrl: './basic-demo.component.html',
})
export class BasicDemoComponent {}
