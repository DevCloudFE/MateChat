import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  type OnChanges,
  Output,
  type SimpleChanges,
} from '@angular/core';
import { TOOLBAR_ICON_SIZE_DEFAULT_VALUE } from '../../components-common/Toolbar/common/toolbar-constants';

@Component({
  selector: 'mc-like-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './like-icon.component.html',
  styleUrls: ['./like-icon.component.scss'],
})
export class LikeIconComponent implements OnChanges {
  @Input() width: number = TOOLBAR_ICON_SIZE_DEFAULT_VALUE;
  @Input() height: number = TOOLBAR_ICON_SIZE_DEFAULT_VALUE;
  @Input() isActive: boolean = false;
  @Input() title: string = '';
  @Input() text: string = '';

  @Output() activeChange = new EventEmitter<boolean>();

  active = this.isActive;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isActive']) {
      this.active = changes['isActive'].currentValue;
    }
  }

  handleClick(): void {
    this.active = !this.active;
    this.activeChange.emit(this.active);
  }
}
