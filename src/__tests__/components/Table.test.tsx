import { Table } from '@/components/Table/Table'
import type { TableColumn } from '@/components/Table/table.types'
import { useThemeStore } from '@/stores/theme.store'
import { render, screen } from '@testing-library/react'

jest.mock('@/stores/theme.store')
const mockedThemeStore = useThemeStore as unknown as jest.MockedFunction<typeof useThemeStore>

describe('Table component', () => {
  beforeEach(() => {
    mockedThemeStore.mockReturnValue({ isDark: false })
  })

  const data = [
    { name: 'João', email: 'joao@email.com' },
    { name: 'Maria', email: 'maria@email.com' },
  ]

  const columns: TableColumn<{ name: string; email: string }>[] = [
    { field: 'name', header: 'Nome' },
    { field: 'email', header: 'Email', align: 'right' },
  ]

  it('should render table headers and rows', () => {
    render(<Table data={data} columns={columns} currentPage={1} onPageChange={jest.fn()} />)
    expect(screen.getByText('Nome')).toBeInTheDocument()
    expect(screen.getByText('João')).toBeInTheDocument()
    expect(screen.getByText('Maria')).toBeInTheDocument()
  })

  it('should show pagination', () => {
    render(<Table data={data} columns={columns} currentPage={1} onPageChange={jest.fn()} />)
    expect(screen.getByRole('button', { name: /primeira página/i })).toBeInTheDocument()
  })
})
