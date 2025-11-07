import { Component, Input } from '@angular/core';

@Component({
  selector: 'mc-avatar-no-body-icon',
  standalone: true,
  templateUrl: './avatar-no-body-icon.component.html',
  styleUrls: ['./avatar-no-body-icon.component.scss']
})
export class AvatarNoBodyIconComponent {
  @Input() width: number = 16;
  @Input() height: number = 16;
}