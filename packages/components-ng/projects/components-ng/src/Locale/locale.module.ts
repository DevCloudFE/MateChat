import { NgModule, ModuleWithProviders } from '@angular/core';
import { LocaleService } from './locale.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class LocaleModule {
  /**
   * 静态方法，用于配置模块并提供服务
   * 可以在AppModule中使用LocaleModule.forRoot()来初始化
   */
  static forRoot(): ModuleWithProviders<LocaleModule> {
    return {
      ngModule: LocaleModule,
      providers: [
        LocaleService
      ]
    };
  }

  /**
   * 普通导入方法，用于特性模块中导入
   * 避免服务被多次实例化
   */
  static forChild(): ModuleWithProviders<LocaleModule> {
    return {
      ngModule: LocaleModule,
      providers: [] // 子模块不提供服务实例
    };
  }
}