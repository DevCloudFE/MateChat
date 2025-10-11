import { Component } from '@angular/core';
import { BubbleModule, InputModule } from '@matechat/ng';
import {
  SendBtnVariant,
  DisplayType,
  InputVariant,
} from '../../../components-ng/src/components-common/Input/common/types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BubbleModule, InputModule],
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

  loading = false;
  inputValue = '';
  SendBtnVariant = SendBtnVariant;
  DisplayType = DisplayType;
  InputVariant = InputVariant;
  onInputChange = (e) => {
    console.log('input change---', e);
  };
  onSubmit = (e) => {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    console.log('input submit---', e);
  };
  onCancel = () => {
    this.loading = false;
    console.log('input cancel');
  };
}
