import { Component, Input, computed, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleLoadingComponent } from './bubble-loading/bubble-loading.component';
import { AvatarComponent } from './avatar/avatar.component';
import { DEFAULT_AVATAR_WIDTH, DEFAULT_AVATAR_HEIGHT, AVATAR_NAME, AVATAR_IMG } from '@matechat/common/Bubble/common/bubble-constants';
import { BubbleAlign, BubbleVariant, AvatarPosition, BubbleAvatar } from '@matechat/common/Bubble/common/bubble-types';
import { BubbleFoundation } from '@matechat/common/Bubble/foundation';

@Component({
  selector: 'mc-bubble',
  standalone: true,
  imports: [CommonModule, BubbleLoadingComponent, AvatarComponent],
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss']
})
export class BubbleComponent {
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
  foundation: BubbleFoundation;

  constructor() { }

  ngOnInit() {
    this.foundation = new BubbleFoundation(this.adapter as any);
    this.foundation.init();
  }

  get adapter() {
    return {
      getProp: (key: string) => this,
      setState: (states: Record<string, any>, cb?: (...args: any) => void) => {
        Object.assign(this, states);
        cb && cb();
      },
      getState: (key: string) => this,
      getContext: (key: string) => this,
      getContexts: () => this,
      stopPropagation: (e: any) => {
        e.stopPropagation();
      },
    }
  }

  // 计算属性
  get bubbleClasses(): string {
    return this.foundation.bubbleClasses();
  };

  get isEmptyAvatar(): boolean {
    return this.foundation.isEmptyAvatar(this.avatarConfig);
  };
}
