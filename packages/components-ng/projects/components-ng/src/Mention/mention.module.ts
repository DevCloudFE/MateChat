import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MentionComponent } from './mention.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MentionComponent
  ],
  exports: [MentionComponent],
})
export class MentionModule {}