import ThemeToggle from '@/components/ThemeToggle/ThemeToggle'
import { useThemeStore } from '@/stores/theme.store'
import { fireEvent, render, screen } from '@testing-library/react'

jest.mock('@/stores/theme.store')
const mockedThemeStore = useThemeStore as jest.MockedFunction<typeof useThemeStore>

beforeEach(() => {
  mockedThemeStore.mockReturnValue({
    theme: 'light',
    setTheme: jest.fn(),
  })

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    })),
  })
})

describe('ThemeToggle component', () => {
  it('should render the toggle button', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /alternar tema/i })
    expect(button).toBeInTheDocument()
  })

  it('should show moon icon when theme is light', () => {
    render(<ThemeToggle />)
    const icon = screen.getByRole('button').querySelector('span') // ou outro seletor mais específico se necessário
    expect(icon).toHaveClass('pi-moon')
  })

  it('should call setTheme when clicked', () => {
    const mockSet = jest.fn()
    mockedThemeStore.mockReturnValue({ theme: 'light', setTheme: mockSet })

    render(<ThemeToggle />)
    fireEvent.click(screen.getByRole('button'))

    expect(mockSet).toHaveBeenCalledWith('dark')
  })
})
