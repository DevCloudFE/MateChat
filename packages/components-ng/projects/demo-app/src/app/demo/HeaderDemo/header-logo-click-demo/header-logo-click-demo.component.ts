import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderModule } from '@matechat/ng';

@Component({
  selector: 'app-header-logo-click',
  standalone: true,
  imports: [CommonModule, HeaderModule],
  templateUrl: './header-logo-click-demo.component.html',
})
export class HeaderLogoClickDemoComponent {
  logoImgSrc = 'https://matechat.gitcode.com/logo.svg';

  onLogoClicked() {
    console.log('logo clicked');
  }
}
