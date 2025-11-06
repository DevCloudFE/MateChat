import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../Locale';
import { MarkdownCardComponent } from './markdown-card.component';
import { CodeBlockComponent } from './code-block.component';
import { LocaleModule } from '../Locale';
@NgModule({
  declarations: [
    CodeBlockComponent,
    MarkdownCardComponent,
  ],
  imports: [
    CommonModule,
    TranslatePipe,
    LocaleModule,
    
  ],
  exports: [
    CodeBlockComponent,
    MarkdownCardComponent
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