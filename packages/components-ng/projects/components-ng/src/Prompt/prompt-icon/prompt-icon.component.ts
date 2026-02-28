import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import BaseComponent from '../../Base/base.component';
import {
  type PromptIconAdapter,
  PromptIconFoundation,
} from '../../components-common/Prompt/icon-foundation';

@Component({
  selector: 'mc-prompt-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prompt-icon.component.html',
  styleUrls: ['./prompt-icon.component.scss'],
})
export class PromptIconComponent extends BaseComponent<PromptIconFoundation> {
  @Input() name: string = '';
  @Input() color: string | undefined = '';
  @Input() size: number | string | undefined = '';
  @Input() component?: any;

  @ViewChild('dynamicIconComponent', { read: ViewContainerRef })
  iconComponent!: ViewContainerRef;

  override get adapter(): PromptIconAdapter {
    return {
      ...super.adapter,
      getProps: () => ({
        name: this.name,
        color: this.color,
        size: this.size,
        component: this.component,
      }),
    };
  }
  get iconSize() {
    return this.foundation.getIconSize();
  }
  get fontIconClass() {
    return this.foundation.getFontIconClass();
  }
  get isComponent() {
    return this.foundation.getIsComponent();
  }
  get isUrl() {
    return this.foundation.getIsUrl();
  }
  get imageAlt() {
    return this.foundation.getImageAlt();
  }
  ngOnInit() {
    this.foundation = new PromptIconFoundation(this.adapter);
    this.foundation.init();
  }
  ngAfterViewInit() {
    this.loadIconComponent();
  }
  loadIconComponent() {
    if (!this.isComponent) {
      return;
    }
    this.iconComponent.createComponent(this.component);
  }
}
