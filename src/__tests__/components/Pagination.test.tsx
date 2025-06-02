import { Pagination } from '@/components/Pagination/Pagination'
import { useThemeStore } from '@/stores/theme.store'
import { fireEvent, render, screen } from '@testing-library/react'

jest.mock('@/stores/theme.store')
const mockedThemeStore = useThemeStore as jest.MockedFunction<typeof useThemeStore>

beforeEach(() => {
  mockedThemeStore.mockReturnValue({ isDark: false })
})

describe('Pagination component', () => {
  it('should render page buttons', () => {
    render(<Pagination totalItems={15} currentPage={1} onPageChange={jest.fn()} />)
    expect(screen.getByRole('button', { name: /primeira página/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /última página/i })).toBeInTheDocument()
  })

  it('should disable previous and first on first page', () => {
    render(<Pagination totalItems={15} currentPage={1} onPageChange={jest.fn()} />)
    expect(screen.getByLabelText(/primeira página/i)).toBeDisabled()
    expect(screen.getByLabelText(/página anterior/i)).toBeDisabled()
  })

  it('should call onPageChange when clicking next', () => {
    const mockChange = jest.fn()
    render(<Pagination totalItems={15} currentPage={1} onPageChange={mockChange} />)
    fireEvent.click(screen.getByLabelText(/próxima página/i))
    expect(mockChange).toHaveBeenCalledWith(2)
  })
})
