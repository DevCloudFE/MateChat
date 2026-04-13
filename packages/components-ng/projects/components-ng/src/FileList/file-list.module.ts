import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McFileListComponent } from './file-list.component';

@NgModule({
  imports: [CommonModule, McFileListComponent],
  exports: [McFileListComponent],
})
export class McFileListModule {}
