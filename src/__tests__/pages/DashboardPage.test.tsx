import DashboardIndex from '@/pages/dashboard'
import ReduxProviderWrapper from '@/providers/ReduxProviderWrapper'
import { render, screen } from '@testing-library/react'
import React from 'react'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    pathname: '/dashboard',
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    query: {},
    asPath: '/dashboard',
  })),
}))

jest.mock('primereact/chart', () => ({
  Chart: () => <div data-testid="mock-chart" />,
}))

jest.mock('@/stores/hooks', () => ({
  useAppDispatch: jest.fn(() => jest.fn()),
  useAppSelector: jest.fn(() => [
    {
      email: 'user@example.com',
      loginAt: new Date().toISOString(),
      jwe: 'jwe-token-123',
    },
  ]),
}))

jest.mock('@/stores/modal.store', () => ({
  useModalStore: () => ({
    isOpen: true,
    openModal: jest.fn(),
    closeModal: jest.fn(),
    toggleModal: jest.fn(),
    resetModal: jest.fn(),
  }),
}))

jest.mock('@/services/history/historyService', () => ({
  getRecentHistory: jest.fn(() =>
    Promise.resolve([
      {
        email: 'user@example.com',
        loginAt: new Date().toISOString(),
        jwe: 'jwe-token-123',
      },
    ])
  ),
}))

jest.mock('@/components/Button/Button', () => ({
  __esModule: true,
  default: ({ onClick }: { onClick?: () => void }) => (
    <button onClick={onClick} data-testid="mock-button">
      Ver
    </button>
  ),
}))

jest.mock('primereact/toast', () => ({
  Toast: jest.fn(() => null),
}))

jest.mock('@/components/Table/Table', () => ({
  __esModule: true,
  Table: <T,>({
    data,
    actions,
  }: {
    data: T[]
    actions?: (row: T) => React.ReactNode[]
  }) => (
    <div data-testid="mock-table">
      {data.map((row, index) => (
        <div key={index} data-testid={`row-${index}`}>
          {actions?.(row)}
        </div>
      ))}
    </div>
  ),
}))

jest.mock('@/components/Modal/Modal', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-modal">{children}</div>
  ),
}))

jest.mock('@/components/Modal/ModalFooter/ModalFooter', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-footer" />,
}))

jest.mock('@/components/Modal/ModalBody/ModalBody', () => ({
  __esModule: true,
  default: () => (
    <div data-testid="mock-body">
      <div className="max-h-[60vh] overflow-y-auto">
        <p className="break-words text-sm text-dark-100 dark:text-light-100">
          jwe-token-123
        </p>
      </div>
    </div>
  ),
}))

jest.mock('@/components/Modal/ModalHeader/ModalHeader', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-header" />,
}))

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

const renderWithProviders = () =>
  render(
    <ReduxProviderWrapper>
      <DashboardIndex />
    </ReduxProviderWrapper>
  )

describe('DashboardIndex', () => {
  it('should render table and modal', () => {
    renderWithProviders()
    expect(screen.getByTestId('mock-table')).toBeInTheDocument()
    expect(screen.getByTestId('mock-modal')).toBeInTheDocument()
  })

  it('should render a table row with button', () => {
    renderWithProviders()
    expect(screen.getByTestId('row-0')).toBeInTheDocument()
    expect(screen.getByTestId('mock-button')).toBeInTheDocument()
  })

  it('should show token inside modal', () => {
    renderWithProviders()
    expect(screen.getByText('jwe-token-123')).toBeInTheDocument()
  })
})
