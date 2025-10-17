import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkdownCardComponent } from './markdown-card.component';
import { CodeBlockComponent } from './code-block.component';

@NgModule({
  declarations: [
    MarkdownCardComponent,
    CodeBlockComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MarkdownCardComponent,
    CodeBlockComponent
  ],
  providers: [
  ],
  bootstrap: []
})
export class MarkdownCardModule {
  static forRoot(): ModuleWithProviders<MarkdownCardModule> {
    return {
      ngModule: MarkdownCardModule,
      providers: [
      ]
    };
  }
}