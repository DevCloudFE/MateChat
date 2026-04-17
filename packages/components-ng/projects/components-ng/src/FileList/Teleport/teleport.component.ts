import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'mc-teleport',
  standalone: true,
  template: '<ng-template #content><ng-content></ng-content></ng-template>',
  styles: [''],
})
export class McTeleportComponent implements OnInit, OnDestroy {
  @Input() to: string | Element;

  @ViewChild('content', { static: true }) contentTemplate: TemplateRef<any>;

  private insertedElements: Node[] = [];
  private targetElement: Element | null = null;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.targetElement = this.getTargetElement();
    if (this.targetElement && this.contentTemplate) {
      this.teleportContent();
    }
  }

  ngOnDestroy(): void {
    this.removeContent();
  }

  private getTargetElement(): Element | null {
    if (typeof this.to === 'string') {
      if (this.to === 'body') {
        return document.body;
      }
      return document.querySelector(this.to);
    }
    return this.to as Element;
  }

  private teleportContent(): void {
    if (!this.targetElement || !this.contentTemplate) return;

    // 创建一个注释节点作为标记
    const startComment = this.renderer.createComment('mc-teleport-start');
    const endComment = this.renderer.createComment('mc-teleport-end');

    // 将注释节点添加到目标位置
    this.renderer.appendChild(this.targetElement, startComment);
    this.renderer.appendChild(this.targetElement, endComment);

    // 保存插入的节点
    this.insertedElements.push(startComment, endComment);

    // 使用 ViewContainerRef 创建嵌入式视图
    const viewRef = this.viewContainerRef.createEmbeddedView(
      this.contentTemplate,
    );

    // 将视图的根节点移动到目标位置
    viewRef.rootNodes.forEach((node) => {
      this.renderer.insertBefore(this.targetElement!, node, endComment);
      this.insertedElements.push(node);
    });
  }

  private removeContent(): void {
    // 移除所有插入的节点
    this.insertedElements.forEach((node) => {
      if (node.parentNode) {
        this.renderer.removeChild(node.parentNode, node);
      }
    });

    // 清空插入的节点列表
    this.insertedElements = [];

    // 清空视图容器
    this.viewContainerRef.clear();
  }
}
