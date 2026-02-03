import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListComponent } from './list.commponent';

@NgModule({
  declarations: [],
  imports: [CommonModule, ListComponent],
  exports: [ListComponent],
})
export class ListModule {}
