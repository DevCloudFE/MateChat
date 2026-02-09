import BaseFoundation, { type DefaultAdapter } from '../Base/foundation';

export interface PromptItemAdapter extends DefaultAdapter {}

export class PromptItemFoundation extends BaseFoundation<PromptItemAdapter> {
  constructor(adapter: PromptItemAdapter) {
    super({ ...adapter });
  }
}
