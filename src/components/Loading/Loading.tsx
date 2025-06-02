'use client'

import styles from './loading.module.css'
import type { LoadingProps } from './loading.types'

export default function Loading({
  type = 'spin',
  size = 'medium',
  color = 'primary',
}: LoadingProps) {
  const sizePx = {
    small: 24,
    medium: 40,
    large: 64,
  }[size]

  const colorClass = {
    primary: '!text-primary-400',
    dark: 'text-dark-300',
    light: 'text-light-100',
  }[color]

  if (type === 'spin') {
    return (
      <svg
        className={`animate-spin ${colorClass}`}
        width={sizePx}
        height={sizePx}
        viewBox="0 0 50 50"
        fill="none"
        role="status"
        aria-label="loading"
      >
        <circle
          className="opacity-20"
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeWidth="4"
        />
        <circle
          className={styles.spinnerStroke}
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="90 150"
          strokeDashoffset="0"
        />
      </svg>
    )
  }

  if (type === 'line') {
    const height = {
      small: 'h-1',
      medium: 'h-2',
      large: 'h-3',
    }[size]

    return (
      <div className={`w-full bg-gray-200 overflow-hidden rounded ${height}`}>
        <div className={`h-full bg-current ${colorClass} ${styles.lineFill}`} />
      </div>
    )
  }

  return null
}
