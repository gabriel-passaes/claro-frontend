import Footer from '@/components/Footer/Footer'
import { render, screen } from '@testing-library/react'

describe('Footer component', () => {
  it('should render the logo image', () => {
    render(<Footer />)

    const image = screen.getByAltText('Logo Claro')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', expect.stringContaining('logo-claro.svg'))
  })

  it('should render the copyright text', () => {
    render(<Footer />)

    const text = screen.getByText(/© 2025 - Claro Frontend/i)
    expect(text).toBeInTheDocument()
    expect(text).toHaveTextContent('Feito Com ❤️ por Gabriel Passaes')
  })

  it('should have footer element with correct classes', () => {
    render(<Footer />)

    const footer = screen.getByRole('contentinfo') 
    expect(footer).toHaveClass('px-6')
    expect(footer).toHaveClass('py-4')
    expect(footer).toHaveClass('bg-light-100')
  })
})
