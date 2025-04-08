import type { PropType } from 'vue';

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

export const props = {
  content: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  align: {
    type: String as PropType<BubbleAlign>,
    default: 'left',
  },
  avatarPosition: {
    type: String as PropType<AvatarPosition>,
    default: 'side',
  },
  variant: {
    type: String as PropType<BubbleVariant>,
    default: 'filled',
  },
  avatarConfig: {
    type: Object as PropType<BubbleAvatar>,
  },
};
