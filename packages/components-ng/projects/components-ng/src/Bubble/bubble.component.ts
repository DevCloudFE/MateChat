import { Component } from '@angular/core';
import { BubbleFoundation } from '@matechat/common/Bubble/foundation';

@Component({
  selector: 'mc-bubble',
  standalone: true,
  imports: [],
  template: `
    <p>
      bubble-ng works!
    </p>
  `,
  styles: ``
})
export class BubbleComponent {
  private foundation = new BubbleFoundation();

  constructor() {
    this.foundation.test();
  }
}
