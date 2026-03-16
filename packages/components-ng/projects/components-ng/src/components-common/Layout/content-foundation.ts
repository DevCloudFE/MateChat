import BaseFoundation, { type DefaultAdapter } from '../Base/foundation';

export interface LayoutContentAdapter extends DefaultAdapter {}

export class LayoutContentFoundation extends BaseFoundation<LayoutContentAdapter> {
  constructor(adapter: LayoutContentAdapter) {
    super({ ...adapter });
  }
}
