import BaseFoundation, { DefaultAdapter } from "../Base/foundation";
import { ListDirection } from "./common/list-types";

export interface ListAdapter extends DefaultAdapter {}

export class ListFoundation extends BaseFoundation<ListAdapter> {
  constructor(adapter: ListAdapter) {
    super({ ...adapter });
  }

  getListClasses() {
    const { direction, autoWrap } = this.getProps();
    return {
      'mc-list': true,
      'mc-list-horizontal': direction === ListDirection.Horizontal,
      'mc-list-nowrap': direction === ListDirection.Horizontal && !autoWrap,
    };
  }
}

