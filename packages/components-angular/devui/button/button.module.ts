import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonGroupComponent } from './button-group.component';
import { ButtonComponent } from './button.component';

@NgModule({
  imports: [CommonModule],
  exports: [ButtonComponent, ButtonGroupComponent],
  declarations: [ButtonComponent, ButtonGroupComponent],
  providers: [],
})
export class ButtonModule {
}
