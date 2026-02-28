import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// 导入所有图标组件
import { CopyIconComponent } from './copy-icon/copy-icon.component';
import { DeleteIconComponent } from './delete-icon/delete-icon.component';
import { DislikeIconComponent } from './dislike-icon/dislike-icon.component';
import { LikeIconComponent } from './like-icon/like-icon.component';
import { RefreshIconComponent } from './refresh-icon/refresh-icon.component';
import { ShareIconComponent } from './share-icon/share-icon.component';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToolbarComponent,
    CopyIconComponent,
    DeleteIconComponent,
    RefreshIconComponent,
    ShareIconComponent,
    LikeIconComponent,
    DislikeIconComponent,
  ],
  exports: [
    ToolbarComponent,
    CopyIconComponent,
    DeleteIconComponent,
    RefreshIconComponent,
    ShareIconComponent,
    LikeIconComponent,
    DislikeIconComponent,
  ],
})
export class ToolbarModule {}
