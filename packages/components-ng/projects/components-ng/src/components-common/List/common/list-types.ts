export enum ListDirection {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}
export enum ListVariant {
  Transparent = 'transparent',
  Filled = 'filled',
  Bordered = 'bordered',
  None = 'none',
}
export interface ListItemData {
  label: string;
  value: string | number;
  disabled?: boolean;
  active?: boolean;
  [key: string]: any;
}
