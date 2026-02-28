export interface IconConfig {
  name: string;
  size?: string;
  color?: string;
  component?: object;
}

export interface Prompt {
  value: string | number;
  label: string;
  iconConfig?: IconConfig;
  desc?: string;
}
