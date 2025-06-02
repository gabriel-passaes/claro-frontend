import Panel from '@/components/Panel/Panel'
import { useThemeStore } from '@/stores/theme.store'
import { render, screen } from '@testing-library/react'

jest.mock('@/stores/theme.store')
const mockedUseThemeStore = useThemeStore as jest.MockedFunction<typeof useThemeStore>

describe('Panel component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the panel with title and children (light theme)', () => {
    mockedUseThemeStore.mockReturnValue({ isDark: false })

    render(
      <Panel title="Informações" contentClassName="custom-content">
        <p>Conteúdo principal</p>
      </Panel>
    )

    expect(screen.getByText('Informações')).toBeInTheDocument()
    expect(screen.getByText('Conteúdo principal')).toBeInTheDocument()
  })

  it('should render the panel without title', () => {
    mockedUseThemeStore.mockReturnValue({ isDark: false })

    render(
      <Panel>
        <span>Sem cabeçalho</span>
      </Panel>
    )

    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    expect(screen.getByText('Sem cabeçalho')).toBeInTheDocument()
  })

  it('should render the icon before the title if provided', () => {
    mockedUseThemeStore.mockReturnValue({ isDark: false })

    render(
      <Panel title="Dashboard" iconBeforeTitle={<i data-testid="custom-icon" />}>
        <p>Conteúdo</p>
      </Panel>
    )

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('should apply dark theme styles when isDark is true', () => {
    mockedUseThemeStore.mockReturnValue({ isDark: true })

    const { container } = render(
      <Panel title="Modo Escuro">
        <p>Conteúdo escuro</p>
      </Panel>
    )

    const panel = container.querySelector('.panel')
    expect(panel).toBeInTheDocument()
    expect(panel?.className).toMatch(/bg-\[rgba\(55,65,81,0.4\)\]/)
    expect(panel?.className).toMatch(/text-light-100/)
    expect(panel?.className).toMatch(/border-dark-200/)
  })

  it('should apply light theme styles when isDark is false', () => {
    mockedUseThemeStore.mockReturnValue({ isDark: false })

    const { container } = render(
      <Panel title="Modo Claro">
        <p>Conteúdo claro</p>
      </Panel>
    )

    const panel = container.querySelector('.panel')
    expect(panel).toBeInTheDocument()
    expect(panel?.className).toMatch(/bg-surface-light100/)
    expect(panel?.className).toMatch(/text-dark-100/)
    expect(panel?.className).toMatch(/border-light-300/)
  })
})
