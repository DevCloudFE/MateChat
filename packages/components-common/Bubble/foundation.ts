import { AVATAR_NAME, AVATAR_IMG } from "./common/bubble-constants";
import { BubbleAvatar, BubbleAlign } from "./common/bubble-types";
import BaseFoundation, { DefaultAdapter } from "../Base/foudation";

export class BubbleFoundation extends BaseFoundation<any> {
  constructor(adapter: DefaultAdapter) {
    super(adapter);
  }

  bubbleClasses() {
    const { align, loading, isEmptyAvatar, avatarPosition } = this._adapter;
    return [
      `mc-bubble-avatar-${avatarPosition}`,
      `mc-bubble-${align}`,
      loading ? "mc-bubble-loading" : "",
      isEmptyAvatar ? "mc-bubble-avatar-empty" : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  isEmptyAvatar(avatarConfig: BubbleAvatar | undefined) {
    if (avatarConfig) {
      // 传了 avatarConfig，但是没有 name 和 imgSrc 时表示头像区域仅占位
      const keys = Object.keys(avatarConfig);
      const shouldShow = keys.some(
        (k) => k === AVATAR_NAME || k === AVATAR_IMG
      );
      return keys.length < 1 || !shouldShow;
    } else {
      return true;
    }
  }
}
