import { Component, Input, Output, EventEmitter, OnInit, ContentChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mc-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  @Input() id: string = '';
  @Input() title: string = '';
  @Input() active: boolean = false;
  @Output() activeChange = new EventEmitter<boolean>();
  
  @ContentChild('[tab-title]') tabTitleRef: ElementRef | undefined;
  
  get ngContentProjected(): boolean {
    return !!this.tabTitleRef;
  }

  constructor() {}

  ngOnInit() {
    // 初始化逻辑
  }

  onClick() {
    this.active = !this.active;
    this.activeChange.emit(this.active);
  }
}