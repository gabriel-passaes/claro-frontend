import Modal from '@/components/Modal/Modal'
import { useModalStore } from '@/stores/modal.store'
import { render, screen } from '@testing-library/react'

jest.mock('@/stores/modal.store')
const mockedModalStore = useModalStore as jest.MockedFunction<typeof useModalStore>

describe('Modal component', () => {
  it('should not render when closed', () => {
    mockedModalStore.mockReturnValue({ isOpen: false, size: 'medium', type: 'vertical' })
    const { container } = render(<Modal><p>Content</p></Modal>)
    expect(container.firstChild).toBeNull()
  })

  it('should render when open', () => {
    mockedModalStore.mockReturnValue({ isOpen: true, size: 'medium', type: 'vertical' })
    render(<Modal><p>Modal aberto</p></Modal>)
    expect(screen.getByText('Modal aberto')).toBeInTheDocument()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
