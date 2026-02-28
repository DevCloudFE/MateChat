import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListModule } from '@matechat/ng';
import { LoadingModule } from 'ng-devui/loading';

@Component({
  selector: 'app-lazyload-list',
  standalone: true,
  imports: [CommonModule, ListModule, LoadingModule],
  templateUrl: './lazyload-demo.component.html',
})
export class LazyloadListComponent {
  loading = false;
  total = 30;
  options = this.getInitData();

  getInitData() {
    return new Array(10).fill(0).map((_item, i) => ({
      label: `Option ${i + 1}`,
      value: i + 1,
    }));
  }
  onLoadMore(_option: any) {
    if (this.loading || this.options.length >= this.total) {
      return;
    }
    this.loading = true;
    setTimeout(() => {
      const newData = new Array(10).fill(0).map((_item, i) => ({
        label: `Option ${this.options.length + i + 1}`,
        value: this.options.length + i + 1,
      }));
      this.options.push(...newData);
      this.loading = false;
    }, 1500);
  }
}
