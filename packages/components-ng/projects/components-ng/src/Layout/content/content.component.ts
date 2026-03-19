import { CommonModule } from '@angular/common';
import {
  Component,
  type ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { debounce } from 'lodash-es';
import BaseComponent from '../../Base/base.component';
import {
  type LayoutContentAdapter,
  LayoutContentFoundation,
} from '../../components-common/Layout/content-foundation';

@Component({
  selector: 'mc-layout-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class LayoutContentComponent extends BaseComponent<LayoutContentFoundation> {
  // 组件属性
  @Input() autoScroll: boolean = true;
  @Input() showScrollArrow: boolean = true;

  @Output() onScrollerScroll = new EventEmitter<Event>();
  @Output() onScrollerWheel = new EventEmitter<WheelEvent>();

  @ViewChild('scrollerRef') scrollerRef!: ElementRef;
  @ViewChild('contentRef') contentRef!: ElementRef;

  showUpArrow = false;
  showDownArrow = false;
  userControl = false;

  private contentResizeOb = new ResizeObserver(() => {
    this.updateScroll();
  });

  ngOnInit() {
    this.foundation = new LayoutContentFoundation(this.adapter);
    this.foundation.init();
  }
  ngAfterViewInit(): void {
    this.contentResizeOb.observe(this.contentRef.nativeElement);
    this.scrollHandler({ target: this.scrollerRef.nativeElement } as any);
    this.initListener();
  }
  override ngOnDestroy(): void {
    this.contentResizeOb.disconnect();
    this.removeListener();
    super.ngOnDestroy();
  }

  override get adapter(): LayoutContentAdapter {
    return {
      ...super.adapter,
      getProps: () => ({
        autoScroll: this.autoScroll,
        showScrollArrow: this.showScrollArrow,
      }),
    };
  }

  private wheelHandler = (event: WheelEvent) => {
    if (!this.scrollerRef.nativeElement) {
      return;
    }
    const isBottom =
      Math.abs(
        this.scrollerRef.nativeElement.scrollTop +
          this.scrollerRef.nativeElement.clientHeight -
          this.scrollerRef.nativeElement.scrollHeight,
      ) < 32;
    if (event.deltaY !== 0) {
      this.userControl = !isBottom;
    }
    this.onScrollerWheel.emit(event);
  };
  private scrollHandler = debounce((event: Event) => {
    const target = event.target as HTMLDivElement;
    if (!target) {
      return;
    }
    this.showUpArrow = target.scrollTop !== 0;
    this.showDownArrow =
      target.scrollTop + target.clientHeight + 32 < target.scrollHeight;
    this.onScrollerScroll.emit(event);
  }, 100);
  private initListener() {
    this.scrollerRef.nativeElement?.addEventListener(
      'scroll',
      this.scrollHandler,
    );
    this.scrollerRef.nativeElement?.addEventListener(
      'wheel',
      this.wheelHandler,
    );
  }
  private removeListener() {
    this.scrollerRef.nativeElement?.removeEventListener(
      'scroll',
      this.scrollHandler,
    );
    this.scrollerRef.nativeElement?.removeEventListener(
      'wheel',
      this.wheelHandler,
    );
  }

  scrollToPosition = (position: number) => {
    if (this.scrollerRef.nativeElement) {
      this.scrollerRef.nativeElement.scrollTo({
        top: position,
        behavior: 'smooth',
      });
    }
  };
  scrollToBottom = () => {
    this.scrollToPosition(this.scrollerRef.nativeElement?.scrollHeight ?? 0);
  };
  scrollToTop = () => {
    this.scrollToPosition(0);
  };
  updateScroll = (force = false) => {
    if (!this.autoScroll) {
      return;
    }
    if (this.userControl && !force) {
      return;
    }
    this.scrollToBottom();
  };
}
