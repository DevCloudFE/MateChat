import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutContentComponent } from './content.component';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    LayoutContentComponent,
  ],
  exports: [
    LayoutContentComponent,
  ]
})
export class LayoutContentModule { }