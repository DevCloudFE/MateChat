import type { PropType } from 'vue';

export type IntroductionBackground = 'filled' | 'transparent';

export type IntroductionAlign = 'left' | 'center' | 'right';

export const props = {
  logoImg: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  subTitle: {
    type: String,
    default: '',
  },
  description: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  background: {
    type: String as PropType<IntroductionBackground>,
    default: 'transparent',
  },
  align: {
    type: String as PropType<IntroductionAlign>,
    default: 'center',
  },
};
