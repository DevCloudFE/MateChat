import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// 定义语言包接口
export interface LocaleData {
  [key: string]: any;
}

// 定义支持的语言类型
export type LanguageCode = 'zh-cn' | 'en-us' | string;

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  // 当前语言
  private _currentLanguage: LanguageCode = 'zh-cn';
  // 语言包存储
  private _localeData: Map<LanguageCode, LocaleData> = new Map();
  // 语言变更通知
  private _languageChange = new Subject<LanguageCode>();
  // 公开语言变更Observable
  languageChange$ = this._languageChange.asObservable();

  constructor() {
    // 首先尝试从localStorage获取语言设置
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      this._currentLanguage = savedLang;
    }
    
    // 初始化默认语言包
    this.loadDefaultLocales();
  }

  /**
   * 加载默认语言包
   */
  private async loadDefaultLocales(): Promise<void> {
    try {
      // 动态导入默认语言包
      const zhCN = await import('../components-common/Locale/lang/zh-cn');
      const enUS = await import('../components-common/Locale/lang/en-us');
      
      this._localeData.set('zh-cn', zhCN.default);
      this._localeData.set('en-us', enUS.default);
    } catch (error) {
      console.error('Failed to load default locales:', error);
    }
  }

  /**
   * 设置当前语言
   */
  setLanguage(language: LanguageCode): void {
    if (this._currentLanguage !== language) {
      this._currentLanguage = language;
      // 保存到localStorage
      localStorage.setItem('lang', language);
      this._languageChange.next(language);
    }
  }

  /**
   * 获取当前语言
   */
  getLanguage(): LanguageCode {
    return this._currentLanguage;
  }

  /**
   * 翻译文本
   * @param key 翻译键，支持嵌套路径如 'Input.send'
   * @param params 替换参数
   */
  translate(key: string, params?: { [key: string]: string | number }): string {
    if (!key) return key;

    // 获取当前语言的语言包
    const localeData = this._localeData.get(this._currentLanguage) || {};
    
    // 解析嵌套键
    const keys = key.split('.');
    let value: any = localeData;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // 如果键不存在，返回原始键
        return key;
      }
    }

    // 处理替换参数
    if (typeof value === 'string' && params) {
      let result = value;
      for (const [paramKey, paramValue] of Object.entries(params)) {
        const regex = new RegExp(`\\{${paramKey}\\}`, 'g');
        result = result.replace(regex, String(paramValue));
      }
      return result;
    }

    return value as string;
  }

  /**
   * 添加新的语言
   */
  addLanguage(language: LanguageCode, localeData: LocaleData): void {
    this._localeData.set(language, localeData);
  }

  /**
   * 覆盖现有语言的部分翻译
   */
  overrideLocale(language: LanguageCode, localeData: LocaleData): void {
    if (this._localeData.has(language)) {
      const existingLocale = this._localeData.get(language) || {};
      // 深度合并语言包
      const mergedLocale = this.deepMerge(existingLocale, localeData);
      this._localeData.set(language, mergedLocale);
    } else {
      // 如果语言不存在，则添加新语言
      this.addLanguage(language, localeData);
    }
  }

  /**
   * 获取所有支持的语言
   */
  getSupportedLanguages(): LanguageCode[] {
    return Array.from(this._localeData.keys());
  }

  /**
   * 深度合并对象
   */
  private deepMerge(target: any, source: any): any {
    const result = { ...target };
    
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        if (source[key] instanceof Object && key in target) {
          result[key] = this.deepMerge(target[key], source[key]);
        } else {
          result[key] = source[key];
        }
      }
    }
    
    return result;
  }
}