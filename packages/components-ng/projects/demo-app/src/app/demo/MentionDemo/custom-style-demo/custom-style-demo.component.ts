import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MentionComponent,  } from '@matechat/ng';
import { SearchChangeEvent, Trigger } from '@matechat/common/Mention/common/mention-types';
import { InputComponent } from '@matechat/ng';

interface ListItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-custom-style-demo',
  standalone: true,
  imports: [CommonModule, MentionComponent, InputComponent],
  templateUrl: './custom-style-demo.component.html',
  styleUrls: ['./custom-style-demo.component.scss'],
})
export class CustomStyleDemoComponent implements AfterViewInit {
  isVisible: boolean = false;
  inputValue: string = '';
  listData: ListItem[] = [];
  triggerIndex: number = -1;
  cursorIndex: number = -1;
  currentTrigger: string | null = null;

  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  prefix: Array<string | Trigger> = [{ key: '/', onlyInputStart: true }];

  ngAfterViewInit() {
    // 初始化时可以执行一些操作
  }

  onSearchChange(e: SearchChangeEvent) {
    this.triggerIndex = e.triggerIndex;
    this.cursorIndex = e.cursorIndex;
    this.currentTrigger = e.trigger;

    if (this.currentTrigger === '/') {
      this.listData = [
        { label: '写一个故事', value: 'write a story' },
        { label: '翻译一段内容', value: 'translate some text' },
        { label: '解释一段代码', value: 'explain some code' },
      ];
    }
  }

  onInputChange(e: string) {
    this.inputValue = e;
  }

  onListSelect(item: ListItem) {
    this.isVisible = false;
    this.inputValue = 
      this.inputValue.slice(0, this.triggerIndex) + 
      this.currentTrigger + 
      item.label + 
      this.inputValue.slice(this.cursorIndex);
  }
}