import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleModule } from '@matechat/ng';

@Component({
    selector: 'app-variant-bubble',
    standalone: true,
    imports: [CommonModule, BubbleModule],
    styleUrls: ['./variant-demo.component.scss'],
    templateUrl: './variant-demo.component.html'
})
export class VariantBubbleComponent {
}
