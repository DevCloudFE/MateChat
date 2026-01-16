import { CommonModule } from '@angular/common';
import {
  type AfterContentInit,
  Component,
  type ComponentFactoryResolver,
  ContentChildren,
  EventEmitter,
  type Injector,
  Input,
  type OnInit,
  Output,
  type QueryList,
  TemplateRef,
} from '@angular/core';
import {
  type ActionItem,
  ToolbarAction,
} from '../components-common/Toolbar/common/toolbar.types';
import {
  TOOLBAR_GAP_DEFAULT_VALUE,
  TOOLBAR_ICON_SIZE_DEFAULT_VALUE,
} from '../components-common/Toolbar/common/toolbar-constants';
import { CopyIconComponent } from './copy-icon/copy-icon.component';
import { DeleteIconComponent } from './delete-icon/delete-icon.component';
import { DislikeIconComponent } from './dislike-icon/dislike-icon.component';
import { LikeIconComponent } from './like-icon/like-icon.component';
import { RefreshIconComponent } from './refresh-icon/refresh-icon.component';
import { ShareIconComponent } from './share-icon/share-icon.component';

@Component({
  selector: 'mc-toolbar',
  templateUrl: './toolbar.component.html',
  imports: [
    CommonModule,
    CopyIconComponent,
    DeleteIconComponent,
    RefreshIconComponent,
    ShareIconComponent,
    LikeIconComponent,
    DislikeIconComponent,
  ],
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, AfterContentInit {
  // 输入属性
  @Input() items: ActionItem[] = [];
  @Input() gap = TOOLBAR_GAP_DEFAULT_VALUE; // 默认间距
  @Input() iconSize = TOOLBAR_ICON_SIZE_DEFAULT_VALUE; // 默认图标大小

  // 输出事件
  @Output() onClick = new EventEmitter<{
    item: ActionItem;
    event: MouseEvent;
  }>();

  // 关键：获取所有投影进来的 ng-template 模板（包含变量名）
  @ContentChildren(TemplateRef, { read: TemplateRef })
  private allTemplates!: QueryList<TemplateRef<any>>;
  // 用户自定义插槽映射
  CustomSlotComponent = {};

  // 响应式操作项（深拷贝避免修改原数据）
  actionItems: ActionItem[] = [];

  ToolbarAction = ToolbarAction;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
  ) {}

  ngOnInit(): void {
    // 深拷贝输入的items
    this.actionItems = this.items?.map((item) => ({ ...item }));
    // 初始化点赞/点踩互斥
    this.init();
  }

  ngAfterContentInit(): void {
    // 初始化阶段：解析所有模板的变量名，构建映射关系
    this.allTemplates.forEach((template: any) => {
      // 通过模板的 nativeElement 获取其变量名（#xxx 中的 xxx）
      const templateName = template._declarationTContainer?.localNames?.[0];
      if (templateName) {
        this.CustomSlotComponent[templateName] = template;
      }
    });
    console.log('ngAfterContentInit', this.CustomSlotComponent);
  }

  trackByKey(index: number, item: ActionItem) {
    return item.key;
  }

  /** 初始化：确保点赞和点踩不同时激活 */
  private init(): void {
    const likeAction = this.actionItems.find(
      (item) => item.icon === ToolbarAction.LIKE,
    );
    const dislikeAction = this.actionItems.find(
      (item) => item.icon === ToolbarAction.DISLIKE,
    );

    if (likeAction?.isActive && dislikeAction) {
      dislikeAction.isActive = false;
    }
  }

  /** 点赞点击处理：取消点踩状态 */
  private handleLikeClick(): void {
    const dislikeAction = this.actionItems.find(
      (item) => item.icon === ToolbarAction.DISLIKE,
    );
    if (dislikeAction) {
      dislikeAction.isActive = false;
    }
  }

  /** 点踩点击处理：取消点赞状态 */
  private handleDislikeClick(): void {
    const likeAction = this.actionItems.find(
      (item) => item.icon === ToolbarAction.LIKE,
    );
    if (likeAction) {
      likeAction.isActive = false;
    }
  }

  /** 操作项点击事件 */
  actionClick(event: MouseEvent, actionItem: ActionItem): void {
    // 处理点赞/点踩互斥
    if (actionItem.icon === ToolbarAction.LIKE) {
      this.handleLikeClick();
    } else if (actionItem.icon === ToolbarAction.DISLIKE) {
      this.handleDislikeClick();
    }
    console.log('actionClick', event, actionItem);

    // 执行item自身的点击回调
    if (actionItem.onClick) {
      actionItem.onClick(actionItem, event);
    }

    // 触发组件输出事件
    this.onClick.emit({ item: actionItem, event });
  }

  /** 激活状态变更 */
  activeChange(isActive: boolean, actionItem: ActionItem): void {
    actionItem.isActive = isActive;
  }
}
