import LoginPage from '@/pages/auth/login'
import ReduxProviderWrapper from '@/providers/ReduxProviderWrapper'
import * as authService from '@/services/auth/authService'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useRouter } from 'next/router'
import React from 'react'

const mockPush = jest.fn()
const mockShow = jest.fn()
const mockUseInputField = jest.fn()

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@/services/auth/authService', () => ({
  login: jest.fn(),
}))

jest.mock('@/components/Input/Input', () => ({
  __esModule: true,
  default: ({ name, value, onChange }: { name: string; value?: string; onChange?: (value: string) => void }) => (
    <input
      name={name}
      data-testid={`mock-input-${name}`}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
  ),
}))

jest.mock('@/components/Button/Button', () => ({
  __esModule: true,
  default: ({ label, loading }: { label?: string; loading?: boolean }) => (
    <button data-testid="mock-button" disabled={loading}>
      {label}
    </button>
  ),
}))

jest.mock('primereact/toast', () => {
  const actualReact = jest.requireActual<typeof import('react')>('react')
  return {
    __esModule: true,
    Toast: actualReact.forwardRef((_, ref) => {
      if (ref && typeof ref !== 'function') {
        (ref as unknown as React.MutableRefObject<{ show: jest.Mock }>).current = { show: mockShow }
      }
      return <div data-testid="mock-toast" />
    }),
  }
})

jest.mock('@/stores/input.store', () => ({
  useInputField: (...args: string[]) => mockUseInputField(...args),
  useInputStore: {
    getState: () => ({
      initField: jest.fn(),
    }),
  },
}))

jest.mock('@/stores/auth.store', () => ({
  setToken: jest.fn(),
}))

jest.mock('@/layouts/AuthLayout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

const renderWithRedux = (ui: React.ReactElement) =>
  render(<ReduxProviderWrapper>{ui}</ReduxProviderWrapper>)

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })
  })

  it('should render input fields and button', () => {
    mockUseInputField.mockImplementation(() => ({
      value: '',
      setValue: jest.fn(),
    }))

    renderWithRedux(<LoginPage />)

    expect(screen.getByTestId('mock-input-email')).toBeInTheDocument()
    expect(screen.getByTestId('mock-input-password')).toBeInTheDocument()
    expect(screen.getByTestId('mock-button')).toBeInTheDocument()
  })

  it('should allow typing into email and password inputs', () => {
    const setEmail = jest.fn()
    const setPassword = jest.fn()

    mockUseInputField.mockImplementation((field: string) => ({
      value: '',
      setValue: field === 'email' ? setEmail : setPassword,
    }))

    renderWithRedux(<LoginPage />)

    fireEvent.change(screen.getByTestId('mock-input-email'), {
      target: { value: 'test@email.com' },
    })
    fireEvent.change(screen.getByTestId('mock-input-password'), {
      target: { value: '123456' },
    })

    expect(setEmail).toHaveBeenCalledWith('test@email.com')
    expect(setPassword).toHaveBeenCalledWith('123456')
  })

  it('should show alert when fields are empty and login is submitted', async () => {
    mockUseInputField.mockImplementation(() => ({
      value: '',
      setValue: jest.fn(),
    }))

    renderWithRedux(<LoginPage />)
    fireEvent.submit(screen.getByTestId('mock-button'))

    await waitFor(() =>
      expect(screen.getByText('Todos os Campos Precisam Estar Preenchidos')).toBeInTheDocument()
    )
  })

  it('should show error toast on login failure', async () => {
    mockUseInputField.mockImplementation((field: string) => ({
      value: field === 'email' ? 'user@email.com' : 'wrongpass',
      setValue: jest.fn(),
    }))

    ;(authService.login as jest.Mock).mockRejectedValue(new Error('Invalid credentials'))

    renderWithRedux(<LoginPage />)
    fireEvent.submit(screen.getByTestId('mock-button'))

    await waitFor(() =>
      expect(mockShow).toHaveBeenCalledWith(
        expect.objectContaining({
          severity: 'error',
          detail: 'Falha No Login, Verifique Seus Dados',
        })
      )
    )
  })
})
