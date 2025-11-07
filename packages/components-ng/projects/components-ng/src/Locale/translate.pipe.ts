import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { LocaleService } from './locale.service';

/**
 * 翻译管道，用于在Angular模板中直接使用翻译功能
 * 用法：{{ 'Input.send' | translate }}
 * 带参数：{{ 'Input.pleaseEnterPlaceholder' | translate:{ enterKey: 'Enter', shiftEnterKey: 'Shift + Enter' } }}
 */
@Pipe({
  name: 'translate',
  pure: false, // 设置为非纯管道，以便在语言变化时自动更新视图
  standalone: true // 标记为standalone，以便在standalone组件中直接使用
})
@Injectable()
export class TranslatePipe implements PipeTransform {
  constructor(private localeService: LocaleService) {}

  /**
   * 转换方法，实现PipeTransform接口
   * @param key 翻译键
   * @param params 替换参数
   */
  transform(key: string, params?: { [key: string]: string | number }): string {
    if (!key) return key;
    
    // 调用LocaleService的翻译方法
    return this.localeService.translate(key, params);
  }
}