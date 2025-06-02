'use client'

import { useThemeStore } from '@/stores/theme.store'
import styles from './panel.module.css'
import type { PanelProps } from './panel.types'

export default function Panel({
  title,
  iconBeforeTitle,
  children,
  className = '',
  contentClassName = '',
  headerClassName = '',
}: PanelProps) {
  const { isDark } = useThemeStore()

  const panelColor = isDark
    ? 'bg-[rgba(55,65,81,0.4)] text-light-100 border-dark-200'
    : 'bg-surface-light100 text-dark-100 border-light-300'

  const headerColor = isDark
    ? 'bg-dark-100 border-dark-200'
    : 'bg-[#f0f2f4] border-light-300' 

  return (
    <div className={`${styles.panel} ${panelColor} ${className}`}>
      {title && (
        <div className={`${styles.header} ${headerColor} ${headerClassName}`}>
          <h3 className="text-base md:text-lg font-semibold flex items-center gap-3">
            {iconBeforeTitle && <span className="text-primary-400">{iconBeforeTitle}</span>}
            {title}
          </h3>
        </div>
      )}
      <div className={`${styles.content} ${contentClassName}`}>{children}</div>
    </div>
  )
}
