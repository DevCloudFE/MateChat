import { Component, Input, computed, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleLoadingComponent } from './bubble-loading/bubble-loading.component';
import { AvatarComponent } from './avatar/avatar.component';
import { DEFAULT_AVATAR_WIDTH, DEFAULT_AVATAR_HEIGHT, AVATAR_NAME, AVATAR_IMG } from '../components-common/Bubble/common/bubble-constants';
import { BubbleAlign, BubbleVariant, AvatarPosition, BubbleAvatar } from '../components-common//Bubble/common/bubble-types';
import { BubbleAdapter, BubbleFoundation } from '../components-common/Bubble/foundation';
import BaseComponent from '../Base/base.component';

@Component({
  selector: 'mc-bubble',
  standalone: true,
  imports: [CommonModule, BubbleLoadingComponent, AvatarComponent],
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss']
})
export class BubbleComponent extends BaseComponent {
  // 组件属性
  @Input() content: string = '';
  @Input() loading: boolean = false;
  @Input() align: BubbleAlign = 'left';
  @Input() avatarPosition: AvatarPosition = 'side';
  @Input() variant: BubbleVariant = 'filled';
  @Input() avatarConfig?: BubbleAvatar;

  // 内容投影模板引用
  @ContentChild('top') topTemplate: TemplateRef<any> | null = null;
  @ContentChild('loadingTpl') loadingTplTemplate: TemplateRef<any> | null = null;
  @ContentChild('defaultTemplate') defaultTemplate: TemplateRef<any> | null = null;
  @ContentChild('bottom') bottomTemplate: TemplateRef<any> | null = null;

  constructor() { super(); }

  override ngOnInit() {
    this.foundation = new BubbleFoundation(this.adapter as any);
    this.foundation.init();
  }

  override get adapter(): BubbleAdapter {
    return {
      ...super.adapter,
      getProps: () => ({
        content: this.content,
        loading: this.loading,
        align: this.align,
        avatarPosition: this.avatarPosition,
        variant: this.variant,
        avatarConfig: this.avatarConfig,
      }),
    }
  }

  // 计算属性
  get bubbleClasses(): string {
    return this.foundation.getBubbleClasses();
  };

  get isEmptyAvatar(): boolean {
    return this.foundation.getIsEmptyAvatar(this.avatarConfig);
  };
}
