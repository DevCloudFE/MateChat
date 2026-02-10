import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListModule } from '@matechat/ng';

@Component({
  selector: 'app-basic-list',
  standalone: true,
  imports: [CommonModule, ListModule],
  templateUrl: './basic-demo.component.html',
})
export class BasicListComponent {
  get options() {
    return new Array(6).fill(0).map((_item, i) => ({
      label: `Option ${i + 1}`,
      value: i + 1,
      disabled: i === 3,
      active: i === 1,
    }));
  }

  onSelect(option: any) {
    console.log('list selected', option);
  }
}
