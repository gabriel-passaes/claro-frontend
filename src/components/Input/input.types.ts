export type InputProps = {
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  type?: 'text' | 'email' | 'cpf' | 'cnpj' | 'phone' | 'number' | 'password';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  autoComplete?: string;
  iconLeft?: string;
  iconRight?: string;
  value?: string;
  onChange?: (value: string) => void;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  step?: number;
};
