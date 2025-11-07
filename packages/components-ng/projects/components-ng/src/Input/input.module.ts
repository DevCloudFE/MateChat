import { NgModule } from '@angular/core';
import { InputComponent } from './input.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { SendIconComponent } from './send-icon/send-icon.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    SendIconComponent,
    InputComponent
  ],
  exports: [InputComponent],
})
export class InputModule {}
