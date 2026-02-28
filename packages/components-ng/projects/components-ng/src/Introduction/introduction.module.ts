import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IntroductionComponent } from './introduction.component';

@NgModule({
  imports: [CommonModule, IntroductionComponent],
  exports: [IntroductionComponent],
})
export class IntroductionModule {}
