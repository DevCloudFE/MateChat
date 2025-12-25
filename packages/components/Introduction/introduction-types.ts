import type { PropType } from 'vue';

export type IntroductionBackground = 'filled' | 'transparent';

export type IntroductionAlign = 'left' | 'center' | 'right';

export const props = {
  logoImg: {
    type: String,
    default: '',
  },
  logoWidth: {
    type: [String, Number],
    default: '',
  },
  logoHeight: {
    type: [String, Number],
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
