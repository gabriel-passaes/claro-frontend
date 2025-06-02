import Sidebar from '@/components/Sidebar/Sidebar'
import { useAppDispatch } from '@/stores/hooks'
import { useSidebarStore } from '@/stores/sidebar.store'
import { fireEvent, render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@/stores/sidebar.store', () => ({
  useSidebarStore: jest.fn(),
}))

jest.mock('@/stores/hooks', () => ({
  useAppDispatch: jest.fn(),
}))

describe('Sidebar component', () => {
  const mockPush = jest.fn()
  const mockDispatch = jest.fn()
  const mockHide = jest.fn()
  const mockToggle = jest.fn()

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({ pathname: '/dashboard', push: mockPush })
    ;(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)
    ;(useSidebarStore as unknown as jest.Mock).mockReturnValue({
      visible: false,
      hide: mockHide,
      toggle: mockToggle,
    })
    window.innerWidth = 1024
  })

  it('should render logo and menu items', () => {
    render(<Sidebar />)
    expect(screen.getByAltText('Logo da Claro')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: /sair do sistema/i })).toBeInTheDocument()
  })

  it('should call logout handler', () => {
    render(<Sidebar />)
    fireEvent.click(screen.getByRole('menuitem', { name: /sair do sistema/i }))
    expect(mockDispatch).toHaveBeenCalled()
    expect(mockPush).toHaveBeenCalledWith('/auth/login')
  })
})
