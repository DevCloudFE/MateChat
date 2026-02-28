import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'mc-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() logoImg: string = '';
  @Input() title: string = '';
  @Input() logoClickable: boolean = false;

  @Output() logoClicked = new EventEmitter<void>();

  onLogoClicked(): void {
    if (this.logoClickable) {
      this.logoClicked.emit();
    }
  }
}
