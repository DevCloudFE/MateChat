const noop = () => {};
export type noopFunction = (...args: any) => any;

export interface DefaultAdapter {
  getProp(key: string): any;
  getProps(): any;
  getState(key: string): any;
  getStates(): any;
  setState(s: any, callback?: any): void;
  getCache(c: string): any;
  getCaches(): any;
  setCache(key: any, value: any): void;
  nextTick(cb: (...args: any) => void): void;
}

class BaseFoundation<T extends DefaultAdapter> {
  static get cssClasses() {
    return {};
  }

  static get strings() {
    return {};
  }

  static get numbers() {
    return {};
  }

  static get defaultAdapter() {
    return {
      getProp: noop,
      getProps: noop,
      getState: noop,
      getStates: noop,
      setState: noop,
      getContext: noop,
      getContexts: noop,
      getCache: noop,
      setCache: noop,
      getCaches: noop,
      stopPropagation: noop,
    };
  }

  _adapter!: T;

  constructor(adapter: T) {
    this._adapter = { ...BaseFoundation.defaultAdapter, ...adapter };
  }

  getProp(key: string) {
    return this._adapter.getProp(key);
  }

  getProps(): any {
    return this._adapter.getProps() as any;
  }

  getState(key: string) {
    return this._adapter.getState(key);
  }

  getStates(): any {
    return this._adapter.getStates();
  }

  setState(states: any, cb?: (...args: any) => void) {
    return this._adapter.setState({ ...states }, cb);
  }

  /* istanbul ignore next */
  getCaches() {
    return this._adapter.getCaches();
  }

  getCache(key: string) {
    return this._adapter.getCache(key);
  }

  setCache(key: string, value: any) {
    return key && this._adapter.setCache(key, value);
  }

  nextTick(cb: (...args: any) => void) {
    return this._adapter.nextTick(cb);
  }

  _isInProps(key: string) {
    const props = this.getProps();
    return key in (props as any);
  }

  init(lifecycle?: any) {}

  destroy() {}
}
export default BaseFoundation;
