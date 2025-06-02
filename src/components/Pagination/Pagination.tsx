'use client'

import { useThemeStore } from '@/stores/theme.store'
import styles from './pagination.module.css'
import { PaginationProps } from './pagination.types'

export function Pagination({
  totalItems,
  itemsPerPage = 5,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const { isDark } = useThemeStore()

  const handleChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  const textColor = isDark ? 'text-light-100' : 'text-dark-100'

  return (
    <div className={styles.wrapper}>
      <button
        onClick={() => handleChange(1)}
        disabled={currentPage === 1}
        aria-label="Primeira página"
        className={`${styles.button} ${textColor}`}
      >
        <i className="pi pi-angle-double-left" />
      </button>

      <button
        onClick={() => handleChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
        className={`${styles.button} ${textColor}`}
      >
        <i className="pi pi-angle-left" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1
        const isActive = currentPage === page
        return (
          <button
            key={page}
            onClick={() => handleChange(page)}
            className={`${styles.button} ${textColor} ${isActive ? styles.active : ''}`}
          >
            {page}
          </button>
        )
      })}

      <button
        onClick={() => handleChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Próxima página"
        className={`${styles.button} ${textColor}`}
      >
        <i className="pi pi-angle-right" />
      </button>

      <button
        onClick={() => handleChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Última página"
        className={`${styles.button} ${textColor}`}
      >
        <i className="pi pi-angle-double-right" />
      </button>
    </div>
  )
}
