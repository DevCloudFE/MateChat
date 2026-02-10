import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentComponent } from './attachment.component';
import { DropAreaComponent } from './drop-area/drop-area.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, DropAreaComponent, AttachmentComponent],
  exports: [AttachmentComponent],
})
export class AttachmentModule {}
