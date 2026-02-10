import { CommonModule } from '@angular/common';
import {
  type AfterViewInit,
  Component,
  type ElementRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import type {
  SearchChangeEvent,
  Trigger,
} from '@matechat/common/Mention/common/mention-types';
import { InputComponent, MentionComponent, ListComponent } from '@matechat/ng';

interface ListItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-basic-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, MentionComponent, InputComponent, ListComponent],
  templateUrl: './basic-demo.component.html',
  styleUrls: ['./basic-demo.component.scss'],
})
export class BasicDemoComponent implements AfterViewInit {
  isVisible: boolean = false;
  inputValue: string = '';
  listData: ListItem[] = [];
  triggerIndex: number = -1;
  cursorIndex: number = -1;
  currentTrigger: string | null = null;
  currentListLabel: string | null = null;

  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  prefix: Array<string | Trigger> = [{ key: '/', onlyInputStart: true }, '@'];

  ngAfterViewInit() {
    // 初始化时可以执行一些操作
  }

  onSearchChange(e: SearchChangeEvent) {
    this.triggerIndex = e.triggerIndex;
    this.cursorIndex = e.cursorIndex;
    this.currentTrigger = e.trigger;

    if (this.currentListLabel && e.value.includes(this.currentListLabel)) {
      return;
    }

    if (this.currentTrigger === '/') {
      this.listData = [
        { label: '写一个故事', value: 'write a story' },
        { label: '翻译一段内容', value: 'translate some text' },
        { label: '解释一段代码', value: 'explain some code' },
      ];
    } else if (this.currentTrigger === '@') {
      this.listData = [
        { label: 'MateChat', value: 'matechat' },
        { label: 'InsCode', value: 'inscode' },
      ];
    }
  }

  onToggleChange(e: boolean) {
    console.log('mention toggle change', e);
  }

  onInputChange(e: string) {
    this.inputValue = e;
  }

  onListSelect(item) {
    this.isVisible = false;
    this.currentListLabel = item.label;
    this.inputValue =
      this.inputValue.slice(0, this.triggerIndex) +
      this.currentTrigger +
      item.label +
      this.inputValue.slice(this.cursorIndex);
  }
}
