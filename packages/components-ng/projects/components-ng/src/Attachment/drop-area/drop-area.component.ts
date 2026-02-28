import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
  SimpleChanges,
  Renderer2,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'mc-drop-area',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drop-area.component.html',
  styleUrls: ['./drop-area.component.scss'],
})
export class DropAreaComponent implements AfterViewInit, OnDestroy {
  @Input() getDropContainer: () => HTMLElement;
  @Input() isDisabled: boolean = false;
  @Output() drop = new EventEmitter<File[]>();

  @ViewChild('dropArea') dropAreaEl!: ElementRef<HTMLDivElement>;

  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef){}

  container: HTMLElement;
  isDragging = false;
  // 使用计数器来跟踪 dragenter 和 dragleave 事件，防止进入子元素导致的状态变化
  dragCounter = 0;
  dragEnterListener: () => void;
  dragOverListener: () => void;
  dragLeaveListener: () => void;
  dropListener: () => void;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['getDropContainer'] && this.getDropContainer) {
      const newContainer = this.getDropContainer();
      if (this.container !== newContainer) {
        this.container = newContainer;
      }
    }
  }

  handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    this.dragCounter++;
    if (this.dragCounter === 1) {
      this.isDragging = true;
      this.cdr.detectChanges();
    }
    if (this.container && this.dropAreaEl.nativeElement) {
      if (this.container === document.body) {
        this.dropAreaEl.nativeElement.style.inset = '0';
      } else {
        const { x, y, width, height } = this.container.getBoundingClientRect();
        this.dropAreaEl.nativeElement.style.width = `${width}px`;
        this.dropAreaEl.nativeElement.style.height = `${height}px`;
        this.dropAreaEl.nativeElement.style.top = `${y}px`;
        this.dropAreaEl.nativeElement.style.left = `${x}px`;
      }
    }
  };
  handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    this.dragCounter--;
    if (this.dragCounter === 0) {
      this.isDragging = false;
      this.cdr.detectChanges();
    }
  };
  handleDrop = (e: DragEvent) => {
    e.preventDefault();
    this.isDragging = false;
    this.cdr.detectChanges();
    this.dragCounter = 0; // 重置计数器
    if (this.isDisabled) return;

    const files = Array.from(e.dataTransfer?.files || []);
    if (files.length > 0) {
      this.drop.emit(files);
    }
  };
  onBodyDrop = (e: DragEvent) => {
    e.preventDefault();
    this.isDragging = false;
    this.cdr.detectChanges();
    this.dragCounter = 0;
  };

  ngAfterViewInit(): void {
    this.renderer.appendChild(document.body, this.dropAreaEl.nativeElement);
    if (this.getDropContainer) {
      this.container = this.getDropContainer();
    }
    this.dragEnterListener = this.renderer.listen(document.body, 'dragenter', this.handleDragEnter);
    this.dragOverListener = this.renderer.listen(document.body, 'dragover', this.handleDragOver);
    this.dragLeaveListener = this.renderer.listen(document.body, 'dragleave', this.handleDragLeave);
    this.dropListener = this.renderer.listen(document.body, 'drop', this.onBodyDrop);
  }

  ngOnDestroy(): void {
    this.dragEnterListener?.();
    this.dragOverListener?.();
    this.dragLeaveListener?.();
    this.dropListener?.();
  }
}
