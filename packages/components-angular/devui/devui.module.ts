import { ModuleWithProviders, NgModule } from '@angular/core';
import { WindowRefModule } from 'ng-devui/window-ref';
import { ButtonModule } from 'ng-devui/button';
export * from 'ng-devui/button';
export * from 'ng-devui/window-ref';
export * from './version';

@NgModule({
  imports: [],
  exports: [
  ButtonModule,
  WindowRefModule,
  ],
  declarations: [],
  })
export class DevUIModule {
  static forRoot(): ModuleWithProviders<DevUIModule> {
    return {
      ngModule: DevUIModule,
    };
  }
}
