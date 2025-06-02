'use client';

import Loading from '@/components/Loading/Loading';
import { useButtonStore } from '@/stores/button.store';
import { useState } from 'react';
import styles from './button.module.css';
import type { ButtonProps } from './button.types';

export default function Button({
  type = 'button',
  label,
  iconBefore,
  iconAfter,
  variant = 'basic',
  color = 'primary',
  disabled = false,
  size = 'medium',
  textColor = 'light',
  onClick,
  loading = false,
  loadingProps,
  className, 
}: ButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const addClick = useButtonStore((state) => state.addClick);

  const handleClick = async () => {
    if (disabled || isLoading || !onClick) return;
    setIsLoading(true);
    try {
      await onClick();
    } finally {
      setIsLoading(false);
      addClick(label ?? 'button');
    }
  };

  const showLoading = isLoading || loading;

  const textColorClassMap: Record<string, string> = {
    light: '!text-light-100',
    dark: '!text-dark-300',
    primary: '!text-primary-400',
    secondary: '!text-primary-600',
    terciary: '!text-primary-800',
    quaternary: '!text-primary-900',
    red: '!text-red-600',
  };

  const bgColorClassMap: Record<string, string> = {
    primary: '!bg-primary-400',
    secondary: '!bg-primary-600',
    terciary: '!bg-primary-800',
    quaternary: '!bg-primary-900',
    red: '!bg-red-600',
    transparent: '!bg-transparent',
  };

  const borderClassMap: Record<string, string> = {
    primary: '!border !border-2 !border-primary-400',
    secondary: '!border !border-2 !border-primary-600',
    terciary: '!border !border-2 !border-primary-800',
    quaternary: '!border !border-2 !border-primary-900',
    red: '!border !border-2 !border-red-600',
    transparent: '!border !border-2 !border-transparent',
  };

  const sizeClass =
    size === 'small'
      ? 'px-3 py-2 text-sm min-w-[75px] h-[35px]'
      : size === 'large'
      ? 'px-6 py-3 text-lg min-w-[125px] h-[55px]'
      : 'px-4 py-2 text-base min-w-[100px] h-[45px]';

  const shapeClass =
    variant === 'rounded'
      ? styles.rounded
      : variant === 'outline'
      ? styles.outline
      : styles.basic;

  const resolveTextClass = () =>
    variant === 'outline'
      ? textColorClassMap[color] ?? '!text-light-100'
      : textColorClassMap[textColor] ?? `!text-${textColor}`;

  const variantClass =
    variant === 'outline'
      ? `${borderClassMap[color]} !bg-transparent`
      : bgColorClassMap[color];

  const disabledClass =
    disabled || showLoading ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-80';

  const finalClass = `
    inline-flex items-center justify-center font-medium transition-all
    ${sizeClass} ${variantClass} ${resolveTextClass()} ${shapeClass} ${disabledClass}
  `;

  return (
    <button
      type={type}
      className={`${finalClass} ${className ?? ''}`} 
      onClick={handleClick}
      disabled={disabled || showLoading}
      aria-disabled={disabled || showLoading}
      aria-label={label || 'button'}
      title={label}
    >
      <div className="flex items-center justify-center w-full h-full">
        {showLoading ? (
          <Loading {...loadingProps} />
        ) : (
          <>
            {iconBefore && <span className={label ? 'mr-2' : ''}>{iconBefore}</span>}
            {label}
            {iconAfter && <span className="ml-2">{iconAfter}</span>}
          </>
        )}
      </div>
    </button>
  );
}
