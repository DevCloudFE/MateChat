import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListModule, ListVariant } from '@matechat/ng';

@Component({
  selector: 'app-custom-list',
  standalone: true,
  imports: [CommonModule, ListModule],
  templateUrl: './custom-demo.component.html',
  styleUrls: ['./custom-demo.component.scss'],
})
export class CustomListComponent {
  variantNone = ListVariant.None;
  options = [
    { label: `Option 1`, value: 1, icon: 'icon-information' },
    { label: `Option 2`, value: 2, icon: 'icon-inform' },
    { label: `Option 3`, value: 3, icon: 'icon-infrastructure' },
  ];
}
