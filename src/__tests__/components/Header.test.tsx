import Header from '@/components/Header/Header'
import { fireEvent, render, screen } from '@testing-library/react'

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
})

describe('Header component', () => {
  it('should render the header with correct role and aria-label', () => {
    render(<Header onToggleSidebar={jest.fn()} />)

    const header = screen.getByRole('banner', { name: /cabeçalho principal/i })
    expect(header).toBeInTheDocument()
  })

  it('should render the menu button and call onToggleSidebar when clicked', () => {
    const mockToggle = jest.fn()
    render(<Header onToggleSidebar={mockToggle} />)

    const menuButton = screen.getByRole('button', { name: /abrir ou fechar menu lateral/i })
    expect(menuButton).toBeInTheDocument()

    fireEvent.click(menuButton)
    expect(mockToggle).toHaveBeenCalledTimes(1)
  })

  it('should render the notification bell and badge', () => {
    render(<Header onToggleSidebar={jest.fn()} />)

    const bell = screen.getByRole('button', { name: /abrir notificações/i })
    expect(bell).toBeInTheDocument()

    const badge = screen.getByLabelText(/2 notificações não lidas/i)
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveTextContent('2')
  })

  it('should render the ThemeToggle button', () => {
    render(<Header onToggleSidebar={jest.fn()} />)

    const themeToggle = screen.getByRole('button', { name: /alternar tema/i })
    expect(themeToggle).toBeInTheDocument()
  })

  it('should render the user avatar image only (not container)', () => {
    render(<Header onToggleSidebar={jest.fn()} />)

    const avatarImage = screen.getByAltText(/avatar do usuário/i)
    expect(avatarImage).toBeInTheDocument()
    expect(avatarImage).toHaveAttribute('src', expect.stringContaining('avatar.svg'))
  })
})
