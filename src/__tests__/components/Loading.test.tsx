import Loading from '@/components/Loading/Loading'
import { render, screen } from '@testing-library/react'

describe('Loading component', () => {
  it('should render a spin loader', () => {
    render(<Loading type="spin" size="small" color="primary" />)
    expect(screen.getByRole('status', { name: 'loading' })).toBeInTheDocument()
  })

  it('should render a line loader (fallback selector)', () => {
    const { container } = render(<Loading type="line" size="medium" color="dark" />)
    const loader = container.querySelector('div.bg-current')
    expect(loader).toBeInTheDocument()
  })

  it('should render nothing for invalid type', () => {
    const { container } = render(<Loading type={'invalid' as 'spin' | 'line'} />)
    expect(container.firstChild).toBeNull()
  })
})
