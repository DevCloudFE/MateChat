import BaseFoundation, { type DefaultAdapter } from '../Base/foundation';
import type {
  IntroductionAlign,
  IntroductionBackground,
} from './common/introduction-types';

export interface IntroductionAdapter extends DefaultAdapter {}

export class IntroductionFoundation extends BaseFoundation<IntroductionAdapter> {
  constructor(adapter: IntroductionAdapter) {
    super({ ...adapter });
  }

  getIntroductionClasses() {
    const align = this._adapter.getProp('align') as IntroductionAlign;
    const background = this._adapter.getProp(
      'background',
    ) as IntroductionBackground;
    return [align, background].filter(Boolean).join(' ');
  }

  getLogoStyle() {
    const logoWidth = this._adapter.getProp('logoWidth') as number | string;
    const logoHeight = this._adapter.getProp('logoHeight') as number | string;
    const style: Record<string, string> = {};

    if (logoWidth) {
      style['width'] =
        typeof logoWidth === 'number' ? `${logoWidth}px` : logoWidth;
    }

    if (logoHeight) {
      style['height'] =
        typeof logoHeight === 'number' ? `${logoHeight}px` : logoHeight;
    }

    return style;
  }
}
