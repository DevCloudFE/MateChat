import { Component } from '@angular/core';
import { BubbleModule } from '@matechat/ng';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BubbleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'demo-app';

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
