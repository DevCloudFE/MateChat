import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  type TemplateRef,
} from '@angular/core';
import BaseComponent from '../Base/base.component';
import {
  ArrowDown,
  ArrowUp,
  Enter,
  InputTagNames,
  LazyLoadThreshold,
} from '../components-common/List/common/list-const';
import {
  ListDirection,
  type ListItemData,
  ListVariant,
} from '../components-common/List/common/list-types';
import {
  type ListAdapter,
  ListFoundation,
} from '../components-common/List/foundation';

@Component({
  selector: 'mc-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent<ListFoundation> {
  // 组件属性
  @Input() direction: ListDirection = ListDirection.Vertical;
  @Input() autoWrap: boolean = true;
  @Input() variant: ListVariant = ListVariant.Transparent;
  @Input() enableLazyLoad: boolean = false;
  @Input() enableShortKey: boolean = false;
  @Input() data: Array<ListItemData> = [];
  @Input() inputEl: HTMLElement;
  @Input() selectable: boolean = true;
  @Input() preSelectIndex: number = this.enableShortKey ? 0 : -1;

  @Output() loadMore = new EventEmitter<Event>();
  @Output() select = new EventEmitter<ListItemData>();

  // 内容投影模板引用
  @ContentChild('item') itemTemplate: TemplateRef<any> | null = null;

  protected readonly ListVariant = ListVariant;
  private listenDom: HTMLElement | Document;

  constructor() {
    super();
  }

  ngOnInit() {
    this.foundation = new ListFoundation(this.adapter);
    this.foundation.init();
    this.initListenDom();
    this.initListener();
  }
  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.removeListener();
  }

  override get adapter(): ListAdapter {
    return {
      ...super.adapter,
      getProps: () => ({
        direction: this.direction,
        autoWrap: this.autoWrap,
        variant: this.variant,
        enableLazyLoad: this.enableLazyLoad,
        enableShortKey: this.enableShortKey,
        data: this.data,
        inputEl: this.inputEl,
        selectable: this.selectable,
      }),
    };
  }

  // 计算属性
  get listClasses(): Record<string, any> {
    return this.foundation.getListClasses();
  }

  initListenDom() {
    if (this.inputEl) {
      const el = this.inputEl;
      if (InputTagNames.includes(el.tagName)) {
        this.listenDom = el;
      } else {
        this.listenDom =
          el.querySelector('textarea') || el.querySelector('input') || document;
      }
    } else {
      this.listenDom = document;
    }
  }
  initListener() {
    if (this.enableShortKey) {
      this.listenDom.addEventListener(
        'keydown',
        this.onKeyDown.bind(this) as any,
      );
    }
  }
  removeListener() {
    this.listenDom.removeEventListener(
      'keydown',
      this.onKeyDown.bind(this) as any,
    );
  }
  onListScroll(e: Event): void {
    if (!this.enableLazyLoad || this.direction !== ListDirection.Vertical) {
      return;
    }
    const targetEl = e.target as HTMLElement;
    const scrollHeight = targetEl.scrollHeight;
    const clientHeight = targetEl.clientHeight;
    const scrollTop = targetEl.scrollTop;

    if (scrollHeight - clientHeight - scrollTop < LazyLoadThreshold) {
      this.loadMore.emit(e);
    }
  }
  onItemClick(clickedItem: ListItemData): void {
    if (clickedItem.disabled) {
      return;
    }
    if (this.selectable) {
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].active = this.data[i].value === clickedItem.value;
      }
    }
    this.select.emit({ ...clickedItem });
  }
  onKeyDown(e: KeyboardEvent) {
    if (e.code === ArrowUp) {
      this.preSelectIndex =
        this.preSelectIndex === 0
          ? this.data.length - 1
          : this.preSelectIndex - 1;
    }
    if (e.code === ArrowDown) {
      this.preSelectIndex =
        this.preSelectIndex === this.data.length - 1
          ? 0
          : this.preSelectIndex + 1;
    }
    if (e.code === Enter) {
      if (this.selectable) {
        this.onItemClick(this.data[this.preSelectIndex]);
      }
    }
  }
}
