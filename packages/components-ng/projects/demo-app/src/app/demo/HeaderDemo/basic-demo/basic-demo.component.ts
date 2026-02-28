import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderModule } from '@matechat/ng';

@Component({
  selector: 'app-header-basic',
  standalone: true,
  imports: [CommonModule, HeaderModule],
  templateUrl: './basic-demo.component.html',
})
export class HeaderBasicComponent {
  logoImgSrc = 'https://matechat.gitcode.com/logo.svg';
}
