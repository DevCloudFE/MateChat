import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutHeaderComponent } from './header.component';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    LayoutHeaderComponent,
  ],
  exports: [
    LayoutHeaderComponent,
  ]
})
export class LayoutHeaderModule { }
