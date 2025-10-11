import { DefaultAdapter } from '../components-common/Base/foundation';
import { Component } from '@angular/core';

@Component({
  selector: 'mate-base-component',
  standalone: true,
  template: '',
})
export default class BaseComponent {
  foundation: any;
  cache: any;
  constructor() {
    this.foundation = null;
  }

  ngOnDestroy() {
    this.foundation &&
      typeof this.foundation.destroy === 'function' &&
      this.foundation.destroy();
  }

  get adapter(): DefaultAdapter {
    return {
      getProp: (key: string) => {
        return this[key];
      },
      getProps: () => {
        return this;
      },
      setState: (states, cb) => {
        for (const key in states) {
          if (states.hasOwnProperty(key)) {
            this[key] = states[key];
          }
          cb && cb();
        }
      },
      getState: (key) => this[key],
      getStates: () => this,
      getCache: (key) => key && this.cache[key],
      getCaches: () => this.cache,
      setCache: (key, value) => key && (this.cache[key] = value),
    };
  }
}
