'use client'

import { useThemeStore } from '@/stores/theme.store'
import { Pagination } from '../Pagination/Pagination'
import styles from './table.module.css'
import { TableProps } from './table.types'

export function Table<T>({
  data,
  columns,
  zebra = true,
  actions,
  currentPage,
  onPageChange,
  rowsPerPage = 5,
}: TableProps<T>) {
  const { isDark } = useThemeStore()
  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage)

  const headerBgClass = isDark ? 'bg-dark-100' : 'bg-light-300'
  const rowBgClass = isDark ? 'bg-dark-200' : 'bg-light-100'
  const zebraBgClass = isDark ? '' : 'bg-light-200'
  const borderClass = isDark
    ? 'border-b border-light-100/5'
    : 'border-b border-light-300'

  return (
    <div className={`${styles.wrapper} ${isDark ? 'dark' : ''}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                className={`py-3 px-4 font-semibold text-sm text-dark-100 dark:text-light-100 ${headerBgClass} ${
                  col.align === 'center'
                    ? 'text-center'
                    : col.align === 'right'
                    ? 'text-right'
                    : 'text-left'
                }`}
              >
                {col.header}
              </th>
            ))}
            {actions && (
              <th
                className={`py-3 px-4 font-semibold text-sm text-center text-dark-100 dark:text-light-100 ${headerBgClass}`}
              >
                Ações
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => {
            const zebraStyle =
              zebra && !isDark && rowIndex % 2 !== 0 ? zebraBgClass : ''
            return (
              <tr key={rowIndex} className={`${rowBgClass} ${zebraStyle} ${borderClass}`}>
                {columns.map((col, j) => (
                  <td
                    key={j}
                    className={`py-3 px-4 text-sm text-dark-100 dark:text-light-100 ${
                      col.align === 'center'
                        ? 'text-center'
                        : col.align === 'right'
                        ? 'text-right'
                        : 'text-left'
                    } ${col.className || ''}`}
                  >
                    {col.body
                      ? col.body(row)
                      : (row[col.field as keyof T] as React.ReactNode)}
                  </td>
                ))}

                {actions && (
                  <td className="py-3 px-4 text-sm text-center text-dark-100 dark:text-light-100">
                    <div className="flex justify-center items-center gap-2">
                      {actions(row).map((action, k) => (
                        <span key={k}>{action}</span>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className={`pt-2 pb-4 px-4 ${headerBgClass} rounded-b-md`}>
        <Pagination
          totalItems={data.length}
          itemsPerPage={rowsPerPage}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  )
}
