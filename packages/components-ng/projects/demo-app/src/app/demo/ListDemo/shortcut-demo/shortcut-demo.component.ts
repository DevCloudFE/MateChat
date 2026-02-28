import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListModule } from '@matechat/ng';

@Component({
  selector: 'app-shortcut-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ListModule],
  templateUrl: './shortcut-demo.component.html',
  styleUrls: ['./shortcut-demo.component.scss'],
})
export class ShortcutListComponent {
  inputValue = '';
  inputEl: HTMLInputElement;
  get options() {
    return new Array(4).fill(0).map((_item, i) => ({
      label: `Option ${i + 1}`,
      value: i + 1,
    }));
  }

  ngOnInit() {
    this.inputEl = document.getElementById(
      'list-shortcut-demo-input',
    ) as HTMLInputElement;
  }
  handleSelect(evt: any) {
    this.inputValue = evt.label;
  }
}
