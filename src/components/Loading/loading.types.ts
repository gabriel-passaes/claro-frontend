export type LoadingType = 'spin' | 'line';
export type LoadingSize = 'small' | 'medium' | 'large';
export type LoadingColor = 'light' | 'dark' | 'primary';

export interface LoadingProps {
  type?: LoadingType;
  size?: LoadingSize;
  color?: LoadingColor;
}
