import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutAsideComponent } from './aside.component';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    LayoutAsideComponent,
  ],
  exports: [
    LayoutAsideComponent,
  ]
})
export class LayoutAsideModule { }