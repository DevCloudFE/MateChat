import { FilterXSS, getDefaultCSSWhiteList, getDefaultWhiteList } from 'xss';
import type { CustomXssRule, MdPlugin, XssFilterFunction } from './mdCard.types';

const DEFAULT_XSS_EXTENSIONS = {
  input: ['type', 'checked', 'disabled', 'class'],
  label: ['for'],
  ul: ['class'],
  div: ['class'],
  a: ['href', 'class', 'target', 'name'],
  ol: ['start'],
  p: ['class'],
  span: ['style', 'class', 'title', 'id'],
  svg: ['style', 'class', 'width', 'height', 'viewbox', 'preserveaspectratio', 'id', 'fill', 'stroke'],
  path: ['style', 'class', 'd', 'id', 'fill', 'stroke'],
  th: ['style'],
  td: ['style'],
};

export class MDCardService {
  private xssFilter: XssFilterFunction;

  constructor() {
    this.setCustomXssRules();
  }

  private getDefaultFilterOptions(customXssRules?: CustomXssRule[]) {
    const whiteList = {
      ...getDefaultWhiteList(),
      ...DEFAULT_XSS_EXTENSIONS
    };

    // 应用自定义规则
    if (customXssRules) {
      for (const rule of customXssRules) {
        if (rule.value === null) {
          delete whiteList[rule.key];
        } else {
          whiteList[rule.key] = rule.value;
        }
      }
    }

    return {
      whiteList,
      onIgnoreTagAttr: this.onIgnoreTagAttr,
      css: {
        whiteList: {
          ...getDefaultCSSWhiteList(),
          top: true,
          left: true,
          bottom: true,
          right: true,
        },
      },
    };
  }

  private onIgnoreTagAttr(tag: string, name: string, value: string, isWhiteAttr: boolean) {
    if (!isWhiteAttr && (name === 'id' || (tag === 'span' && name === 'style'))) {
      return name + '=' + value;
    }
  }

  setCustomXssRules(customXssRules?: CustomXssRule[] | XssFilterFunction) {
    // 如果参数为 undefined，使用不过滤的函数
    if (customXssRules === undefined) {
      this.xssFilter = (html: string) => html;
    } else if (typeof customXssRules === 'function') {
      this.xssFilter = customXssRules;
    } else {
      const filterOptions = this.getDefaultFilterOptions(customXssRules);
      const filter = new FilterXSS(filterOptions);
      this.xssFilter = (html: string) => filter.process(html);
    }
  }

  setMdPlugins(plugins: MdPlugin[], mdt: any) {
    if (plugins && plugins.length) {
      plugins.forEach(item => {
        const { plugin, opts } = item;
        mdt.use(plugin, opts);
      })
    }
  }

  filterHtml(html: string) {
    return this.xssFilter(html);
  }
}
