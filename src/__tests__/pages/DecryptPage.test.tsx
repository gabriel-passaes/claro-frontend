import DecryptPage from '@/pages/dashboard/decrypt'
import ReduxProviderWrapper from '@/providers/ReduxProviderWrapper'
import { useInputField } from '@/stores/input.store'
import { fireEvent, render, screen } from '@testing-library/react'
import React, { MutableRefObject } from 'react'

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
})

jest.mock('@/components/Input/Input', () => ({
  __esModule: true,
  default: ({ value, onChange }: { value?: string; onChange?: (value: string) => void }) => (
    <input
      data-testid="mock-input"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
  ),
}))

jest.mock('@/components/Button/Button', () => ({
  __esModule: true,
  default: ({ label, onClick, loading }: { label?: string; onClick?: () => void; loading?: boolean }) => (
    <button data-testid="mock-button" onClick={onClick} disabled={loading}>
      {label}
    </button>
  ),
}))

jest.mock('primereact/toast', () => ({
  Toast: jest.fn(() => null),
}))

jest.mock('@/components/Sidebar/Sidebar', () => ({
  __esModule: true,
  default: () => <aside data-testid="mock-sidebar" />,
}))

jest.mock('@/stores/input.store', () => ({
  useInputField: jest.fn(() => ({
    value: '',
    errorMessage: '',
    setValue: jest.fn(),
    setError: jest.fn(),
  })),
  useInputStore: {
    getState: () => ({
      initField: jest.fn(),
    }),
  },
}))

const renderWithRedux = (ui: React.ReactElement) =>
  render(<ReduxProviderWrapper>{ui}</ReduxProviderWrapper>)

describe('DecryptPage', () => {
  it('should render input and button', () => {
    renderWithRedux(<DecryptPage />)
    expect(screen.getByTestId('mock-input')).toBeInTheDocument()
    expect(screen.getByTestId('mock-button')).toBeInTheDocument()
  })

  it('should disable button when loading is true', () => {
    renderWithRedux(<DecryptPage />)
    const button = screen.getByTestId('mock-button')
    expect(button).toBeEnabled()
  })

  it('should allow typing in the input field', () => {
    const mockSetValue = jest.fn()
    ;(useInputField as jest.Mock).mockReturnValue({
      value: '',
      errorMessage: '',
      setValue: mockSetValue,
      setError: jest.fn(),
    })

    renderWithRedux(<DecryptPage />)
    const input = screen.getByTestId('mock-input')
    fireEvent.change(input, { target: { value: 'new-token' } })
    expect(mockSetValue).toHaveBeenCalledWith('new-token')
  })

  it('should show toast on decrypt click based on token length', async () => {
    const mockShow = jest.fn()

    const mockedRef = {
      current: { show: mockShow },
    } as unknown as MutableRefObject<{ show: (args: { severity: string; summary: string; detail: string }) => void }>

    jest.spyOn(React, 'useRef').mockReturnValueOnce(mockedRef)

    ;(useInputField as jest.Mock).mockReturnValue({
      value: 'short',
      errorMessage: '',
      setValue: jest.fn(),
      setError: jest.fn(),
    })

    renderWithRedux(<DecryptPage />)
    const button = screen.getByTestId('mock-button')
    fireEvent.click(button)

    expect(mockShow).toHaveBeenCalledWith(
      expect.objectContaining({
        severity: 'warn',
        summary: 'Token Muito Curto',
        detail: expect.stringContaining('256'),
      })
    )
  })
})
