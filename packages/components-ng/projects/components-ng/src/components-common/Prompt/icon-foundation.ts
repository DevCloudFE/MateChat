import BaseFoundation, { type DefaultAdapter } from '../Base/foundation';

export interface PromptIconAdapter extends DefaultAdapter {}

export class PromptIconFoundation extends BaseFoundation<PromptIconAdapter> {
  constructor(adapter: PromptIconAdapter) {
    super({ ...adapter });
  }

  getIconSize(): string {
    const { size } = this.getProps();
    return typeof size === 'number' ? `${size}px` : size;
  }
  getFontIconClass(): string {
    const { name } = this.getProps();
    return /^icon-/.test(name) ? name : '';
  }
  getIsComponent(): boolean {
    const { component } = this.getProps();
    return !!component;
  }
  getIsUrl(): boolean {
    const { name } = this.getProps();
    return /^((http|https):)?\/\//.test(name);
  }
  getImageAlt(): string {
    const { name } = this.getProps();
    return name.split('/').pop() || '';
  }
}
