import BaseFoundation, { DefaultAdapter } from '../Base/foundation';

export interface InputTagAdapter extends DefaultAdapter {
}

export class InputTagFoundation extends BaseFoundation<InputTagAdapter> {
  constructor(adapter: InputTagAdapter) {
    super({ ...adapter });
  }
}
