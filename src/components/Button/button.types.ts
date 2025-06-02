import type { LoadingProps } from '@/components/Loading/loading.types';

export type ButtonType = 'button' | 'submit' | 'reset';

export type ButtonVariant = 'basic' | 'rounded' | 'outline';

export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'terciary'
  | 'quaternary'
  | 'red'
  | 'transparent';

export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonTextColor =
  | 'light'
  | 'dark'
  | 'primary'
  | 'secondary'
  | 'terciary'
  | 'quaternary'
  | 'red'
  | string;

export interface ButtonProps {
  type?: ButtonType;
  label?: string;
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  textColor?: ButtonTextColor;
  onClick?: () => void | Promise<void>;
  loading?: boolean;
  loadingProps?: LoadingProps;
  className?: string;
}
