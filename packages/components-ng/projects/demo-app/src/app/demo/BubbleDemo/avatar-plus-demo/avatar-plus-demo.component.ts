import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleModule } from '@matechat/ng';

@Component({
    selector: 'app-avatar-plus-bubble',
    standalone: true,
    imports: [CommonModule, BubbleModule],
    styleUrls: ['./avatar-plus-demo.component.scss'],
    templateUrl: './avatar-plus-demo.component.html'
})
export class AvatarPlusBubbleComponent {
    avatarConfig = {
        imgSrc: 'https://matechat.gitcode.com/logo.svg',
    };
}
