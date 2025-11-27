import { Component, Input } from '@angular/core';

@Component({
  selector: 'mc-avatar-body-icon',
  standalone: true,
  templateUrl: './avatar-body-icon.component.html',
  styleUrls: ['./avatar-body-icon.component.scss']
})
export class AvatarBodyIconComponent {
  @Input() width: number = 16;
  @Input() height: number = 16;
}