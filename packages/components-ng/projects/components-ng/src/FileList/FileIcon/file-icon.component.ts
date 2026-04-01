import { CommonModule } from '@angular/common';
import { Component, Input, type OnInit } from '@angular/core';

@Component({
  selector: 'mc-file-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-icon.component.html',
  styleUrls: ['./file-icon.component.scss'],
})
export class McFileIconComponent implements OnInit {
  @Input() iconType: string = 'unknown-icon';
  @Input() size: number | string = 36;
  @Input() title?: string;
  @Input() customClass?: string;

  get className(): string {
    return this.customClass || '';
  }

  ngOnInit(): void {
    console.log('iconType', this.iconType);
  }
}
