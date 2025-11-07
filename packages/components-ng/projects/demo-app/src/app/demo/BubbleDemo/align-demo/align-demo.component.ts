import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleModule } from '@matechat/ng';

@Component({
    selector: 'app-align-bubble',
    standalone: true,
    imports: [CommonModule, BubbleModule],
    styleUrls: ['./align-demo.component.scss'],
    templateUrl: './align-demo.component.html'
})
export class AlignBubbleComponent {
}
