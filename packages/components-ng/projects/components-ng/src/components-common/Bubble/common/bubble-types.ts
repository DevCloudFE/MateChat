
export type BubbleVariant = 'filled' | 'none' | 'bordered';

export type AvatarPosition = 'top' | 'side';

export type BubbleAlign = 'left' | 'right';

export interface BubbleAvatar {
  name?: string;
  gender?: string;
  width?: number;
  height?: number;
  isRound?: boolean;
  imgSrc?: string;
  displayName?: string;
}

