import BaseFoundation, { type DefaultAdapter } from '../Base/foundation';

export interface PromptAdapter extends DefaultAdapter {}

export class PromptFoundation extends BaseFoundation<PromptAdapter> {
  constructor(adapter: PromptAdapter) {
    super({ ...adapter });
  }
}
