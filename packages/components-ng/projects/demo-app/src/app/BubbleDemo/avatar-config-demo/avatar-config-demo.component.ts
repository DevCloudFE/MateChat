import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleModule } from '@matechat/ng';

@Component({
    selector: 'app-avatar-config-bubble',
    standalone: true,
    imports: [CommonModule, BubbleModule],
    templateUrl: './avatar-config-demo.component.html'
})
export class AvatarConfigBubbleComponent {
    avatarConfig = {
        imgSrc: 'https://matechat.gitcode.com/logo.svg',
    };
    modelAvatar = {
        imgSrc: 'https://matechat.gitcode.com/logo.svg',
    };
    userAvatar = {
        imgSrc: 'https://matechat.gitcode.com/png/demo/userAvatar.svg',
    };
    modelAvatarTop = {
        ...this.modelAvatar,
        displayName: 'MateChat',
    };
    userAvatarTop = {
        ...this.userAvatar,
        displayName: 'User',
    };
}
