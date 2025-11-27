import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleModule } from '@matechat/ng';

@Component({
    selector: 'app-loading-bubble',
    standalone: true,
    imports: [CommonModule, BubbleModule],
    styleUrls: ['./loading-demo.component.scss'],
    templateUrl: './loading-demo.component.html'
})
export class LoadingBubbleComponent {
    avatarConfig = {
        imgSrc: 'https://matechat.gitcode.com/logo.svg',
    };
}
