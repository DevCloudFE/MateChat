// 导出Locale服务
import { LocaleService } from './locale.service';
import { LocaleModule } from './locale.module';
import { TranslatePipe } from './translate.pipe';

// 重新导出类型
export type { LanguageCode, LocaleData } from './locale.service';

export {
  LocaleService,
  LocaleModule,
  TranslatePipe
};