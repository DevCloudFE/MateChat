import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListDirection, ListModule, ListVariant } from '@matechat/ng';
import { RadioModule } from 'ng-devui/radio';
import { ToggleModule } from 'ng-devui/toggle';

@Component({
  selector: 'app-display-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RadioModule, ToggleModule, ListModule],
  templateUrl: './display-demo.component.html',
})
export class DisplayListComponent {
  variantList = [
    { label: '填充', value: ListVariant.Filled },
    { label: '边框', value: ListVariant.Bordered },
  ];
  selectedVariant: ListVariant = ListVariant.Filled;
  autoWrap = true;
  direction = ListDirection.Horizontal;
  get options() {
    return new Array(10).fill(0).map((_item, i) => ({
      label: `Option ${i + 1}`,
      value: i + 1,
      disabled: i === 3,
      active: i === 1,
    }));
  }

  handleVariantChange(option: any) {
    console.log('variant changed', option);
  }
  handleAutoWrapChange(option: any) {
    console.log('autoWrap changed', option);
  }
}
