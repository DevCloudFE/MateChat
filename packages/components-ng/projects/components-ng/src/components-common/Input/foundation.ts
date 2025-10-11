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

  showClickWave(nativeElement: HTMLElement, event: MouseEvent): void {
    const rect = nativeElement.getBoundingClientRect();
    this.setState({
      waveStyle: {
        left: event.clientX - rect.left + 'px',
        top: event.clientY - rect.top + 'px',
      },
      showWave: true,
    });

    setTimeout(() => {
      this.setState({
        showWave: false,
      });
    }, 300);
  }
}
