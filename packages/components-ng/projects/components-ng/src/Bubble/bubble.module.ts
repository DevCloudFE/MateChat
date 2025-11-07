import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleComponent } from './bubble.component';
import { BubbleLoadingComponent } from './bubble-loading/bubble-loading.component';
import { AvatarComponent } from './avatar/avatar.component';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    BubbleComponent,
    BubbleLoadingComponent,
    AvatarComponent
  ],
  exports: [
    BubbleComponent,
    BubbleLoadingComponent,
    AvatarComponent
  ]
})
export class BubbleModule { }