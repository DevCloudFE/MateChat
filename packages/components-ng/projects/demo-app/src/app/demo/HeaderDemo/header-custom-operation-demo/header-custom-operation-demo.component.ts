import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderModule } from '@matechat/ng';

@Component({
  selector: 'app-header-custom-operation-demo',
  standalone: true,
  imports: [CommonModule, HeaderModule],
  styleUrls: ['./header-custom-operation-demo.component.scss'],
  templateUrl: './header-custom-operation-demo.component.html',
})
export class HeaderCustomOperationDemoComponent {
  logoImgSrc = 'https://matechat.gitcode.com/logo.svg';
}
