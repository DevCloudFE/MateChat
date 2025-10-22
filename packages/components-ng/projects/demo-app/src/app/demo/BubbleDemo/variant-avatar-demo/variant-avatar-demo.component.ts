import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleModule } from '@matechat/ng';

@Component({
    selector: 'app-variant-avatar-bubble',
    standalone: true,
    imports: [CommonModule, BubbleModule],
    templateUrl: './variant-avatar-demo.component.html'
})
export class VariantAvatarBubbleComponent {
}
