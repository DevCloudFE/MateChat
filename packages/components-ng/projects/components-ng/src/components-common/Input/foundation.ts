import BaseFoundation, { DefaultAdapter } from '../Base/foundation';
import {
  DisplayType,
  InputVariant,
  SendBtnVariant,
  SubmitShortKey,
} from './common/types';

export interface InputAdapter extends DefaultAdapter {
  locale(key: string, params?: Record<string, string>): string;
  emitChange(): void;
  submit(inputValue: string): void;
}

export class InputFoundation extends BaseFoundation<InputAdapter> {
  constructor(adapter: InputAdapter) {
    super({ ...adapter });
  }

  getInputClasses() {
    const { disabled, displayType, variant } = this.getProps();
    return {
      'mc-input': true,
      'mc-input-disabled': disabled,
      'mc-input-simple': displayType === DisplayType.Simple,
      'mc-input-borderless': variant === InputVariant.BorderLess,
    };
  }

  getPlaceholderText() {
    const { placeholder, submitShortKey } = this.getProps();
    if (placeholder) {
      return placeholder;
    }

    let enterKey = '';
    let shiftEnterKey = '';

    if (submitShortKey === SubmitShortKey.Enter) {
      enterKey = 'Enter';
      shiftEnterKey = 'Shift + Enter';
    } else if (submitShortKey === SubmitShortKey.ShiftEnter) {
      enterKey = 'Shift + Enter';
      shiftEnterKey = 'Enter';
    }

    return enterKey
      ? this._adapter.locale('Input.pleaseEnterPlaceholder', {
          enterKey,
          shiftEnterKey,
        })
      : this._adapter.locale('Input.pleaseEnter');
  }

  clearInput(): void {
    this.setState({
      inputValue: '',
    });
    this._adapter.emitChange();
  }

  emitChange(): void {
    this._adapter.emitChange();
  }

  submit(inputValue: string): void {
    this._adapter.submit(inputValue);
  }

  onKeydown(event: KeyboardEvent): void {
    const { submitShortKey, lock } = this.getProps();
    const inputValue = this.getState('inputValue');
    if (submitShortKey === null) {
      return;
    }

    const shiftKey =
      submitShortKey === SubmitShortKey.Enter
        ? !event.shiftKey
        : submitShortKey === SubmitShortKey.ShiftEnter
        ? event.shiftKey
        : false;

    if (shiftKey && event.key === 'Enter' && !lock) {
      event.preventDefault();
      this.submit(inputValue);
      this.setState({
        inputValue: '',
      });
      this.emitChange();
    }
  }
}
