import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListComponent } from './list.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, ListComponent],
  exports: [ListComponent],
})
export class ListModule {}
