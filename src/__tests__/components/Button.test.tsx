import Button from '@/components/Button/Button'
import { act, fireEvent, render, screen } from '@testing-library/react'

describe('Button component', () => {
  it('should render with the provided label', () => {
    render(<Button label="Save" />)
    expect(screen.getByRole('button')).toHaveTextContent('Save')
  })

  it('should apply correct classes for color and variant', () => {
    render(<Button label="View" color="primary" variant="basic" />)
    const button = screen.getByRole('button')
    expect(button.className).toMatch(/bg-primary-400/)
    expect(button.className).toMatch(/text-light-100/)
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Button label="Disabled" disabled />)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button.className).toMatch(/opacity-60/)
  })

  it('should show loading component when loading is true', () => {
    render(<Button label="Loading" loading />)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).not.toHaveTextContent('Loading')
  })

  it('should call onClick when clicked', async () => {
    const handleClick = jest.fn(() => Promise.resolve())

    render(<Button label="Click" onClick={handleClick} />)
    const button = screen.getByRole('button')

    await act(async () => {
      fireEvent.click(button)
    })

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
