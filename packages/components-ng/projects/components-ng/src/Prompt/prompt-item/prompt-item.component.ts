import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import BaseComponent from '../../Base/base.component';
import type { Prompt } from '../../components-common/Prompt/common/prompt-types';
import {
  type PromptItemAdapter,
  PromptItemFoundation,
} from '../../components-common/Prompt/item-foundation';
import { PromptIconComponent } from '../prompt-icon/prompt-icon.component';

@Component({
  selector: 'mc-prompt-item',
  standalone: true,
  imports: [CommonModule, PromptIconComponent],
  templateUrl: './prompt-item.component.html',
  styleUrls: ['./prompt-item.component.scss'],
})
export class PromptItemComponent extends BaseComponent<PromptItemFoundation> {
  // 组件属性
  @Input() prompt: Prompt = {} as Prompt;

  constructor() {
    super();
  }

  ngOnInit() {
    this.foundation = new PromptItemFoundation(this.adapter);
    this.foundation.init();
  }

  override get adapter(): PromptItemAdapter {
    return {
      ...super.adapter,
      getProps: () => ({
        prompt: this.prompt,
      }),
    };
  }
}
