import { Component } from '@angular/core';
import { BubbleComponent } from '@matechat/ng';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BubbleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'demo-app';
}
