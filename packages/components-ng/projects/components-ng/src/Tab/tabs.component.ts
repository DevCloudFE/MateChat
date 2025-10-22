import { Component, Input, Output, EventEmitter, OnInit, ContentChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab.component';

@Component({
  selector: 'mc-tabs',
  standalone: true,
  imports: [CommonModule, TabComponent],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input() type: 'line' | 'card' | 'slider' = 'line';
  @Input() activeTab: string = '';
  @Output() activeTabChange = new EventEmitter<string>();

  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

  constructor() {}

  ngOnInit() {
    // 初始化逻辑
  }

  ngAfterContentInit() {
    // 监听子Tab的activeChange事件
    this.tabs.forEach(tab => {
      tab.activeChange.subscribe(() => {
        this.onTabActive(tab.id);
      });
    });

    // 如果没有设置activeTab，默认激活第一个tab
    if (!this.activeTab && this.tabs.length > 0) {
      this.activeTab = this.tabs.first.id;
      this.tabs.first.active = true;
    }
  }

  onTabActive(tabId: string) {
    // 更新activeTab状态
    this.activeTab = tabId;
    this.activeTabChange.emit(tabId);
    
    // 更新所有tab的active状态
    this.tabs.forEach(tab => {
      tab.active = tab.id === tabId;
    });
  }
}