import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TOOLBAR_ICON_SIZE_DEFAULT_VALUE } from '../../components-common/Toolbar/common/toolbar-constants';

@Component({
  selector: 'mc-refresh-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './refresh-icon.component.html',
  styleUrls: ['./refresh-icon.component.scss'],
})
export class RefreshIconComponent {
  @Input() width: number = TOOLBAR_ICON_SIZE_DEFAULT_VALUE;
  @Input() height: number = TOOLBAR_ICON_SIZE_DEFAULT_VALUE;
  @Input() isActive: boolean = false;
  @Input() title: string = '';
  @Input() text: string = '';
}
