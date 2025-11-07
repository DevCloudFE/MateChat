import BaseFoundation, { DefaultAdapter } from '../Base/foundation';
import { SendBtnVariant } from './common/types';

export interface InputButtonAdapter extends DefaultAdapter {
  locale(key: string, params?: Record<string, string>): string;
  emitChange(): void;
}

export class InputButtonFoundation extends BaseFoundation<InputButtonAdapter> {
  constructor(adapter: InputButtonAdapter) {
    super({ ...adapter });
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

  getButtonClasses() {
    const { loading, sendBtnVariant } = this.getProps();
    const isMouseDown = this.getState('isMouseDown');
    return {
      'mc-button': true,
      'mc-button-loading': loading,
      mousedown: isMouseDown,
      'mc-button-simple': sendBtnVariant === SendBtnVariant.Simple,
    };
  }
}
