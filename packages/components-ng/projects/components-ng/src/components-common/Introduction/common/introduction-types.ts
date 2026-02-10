export type IntroductionBackground = 'filled' | 'transparent';

export type IntroductionAlign = 'left' | 'center' | 'right';

export interface IntroductionProps {
  logoImg?: string;
  logoWidth?: string | number;
  logoHeight?: string | number;
  title?: string;
  subTitle?: string;
  description?: string[];
  background?: IntroductionBackground;
  align?: IntroductionAlign;
}
