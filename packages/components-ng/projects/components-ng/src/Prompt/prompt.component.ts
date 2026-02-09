import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { Prompt } from '@matechat/common/Prompt/common/prompt-types';
import {
  type PromptAdapter,
  PromptFoundation,
} from '@matechat/common/Prompt/foundation';
import BaseComponent from '../Base/base.component';
import { ListDirection, ListModule, ListVariant } from '../List/index';
import { PromptItemComponent } from './prompt-item/prompt-item.component';

@Component({
  selector: 'mc-prompt',
  standalone: true,
  imports: [CommonModule, ListModule, PromptItemComponent],
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss'],
})
export class PromptComponent extends BaseComponent<PromptFoundation> {
  // 组件属性
  @Input() direction: ListDirection = ListDirection.Vertical;
  @Input() list: Prompt[] = [];
  @Input() variant: ListVariant = ListVariant.Filled;

  @Output() itemClick = new EventEmitter<Prompt>();

  constructor() {
    super();
  }

  ngOnInit() {
    this.foundation = new PromptFoundation(this.adapter);
    this.foundation.init();
  }

  override get adapter(): PromptAdapter {
    return {
      ...super.adapter,
      getProps: () => ({
        direction: this.direction,
        list: this.list,
        variant: this.variant,
      }),
    };
  }

  handleItemClick(item: Prompt) {
    this.itemClick.emit(item);
  }
}
