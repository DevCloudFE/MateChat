import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { copyToClipboard } from '../../components-common/Toolbar/common/toolbar-common-fun';
import { TOOLBAR_ICON_SIZE_DEFAULT_VALUE } from '../../components-common/Toolbar/common/toolbar-constants';

@Component({
  selector: 'mc-copy-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './copy-icon.component.html',
  styleUrls: ['./copy-icon.component.scss'],
})
export class CopyIconComponent {
  @Input() width: number = TOOLBAR_ICON_SIZE_DEFAULT_VALUE;
  @Input() height: number = TOOLBAR_ICON_SIZE_DEFAULT_VALUE;
  @Input() isActive: boolean = false;
  @Input() text: string = '';
  @Input() title: string = '';

  copied = false;

  async handleClick() {
    setTimeout(() => {
      this.copied = false;
    }, 1500);
    try {
      await copyToClipboard(this.text);
      this.copied = true;
    } catch (error) {}
  }
}
