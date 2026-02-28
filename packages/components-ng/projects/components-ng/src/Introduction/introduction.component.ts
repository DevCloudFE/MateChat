import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import BaseComponent from '../Base/base.component';
import type {
  IntroductionAlign,
  IntroductionBackground,
} from '../components-common/Introduction/common/introduction-types';
import { IntroductionFoundation } from '../components-common/Introduction/foundation';

@Component({
  selector: 'mc-introduction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
})
export class IntroductionComponent extends BaseComponent<IntroductionFoundation> {
  @Input() logoImg?: string;
  @Input() title?: string;
  @Input() subTitle?: string;
  @Input() description: string[] = [];
  @Input() logoWidth?: number | string;
  @Input() logoHeight?: number | string;
  @Input() background: IntroductionBackground = 'transparent';
  @Input() align: IntroductionAlign = 'center';

  constructor() {
    super();
    this.foundation = new IntroductionFoundation(this.adapter);
  }
}
