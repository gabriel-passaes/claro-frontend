import Input from '@/components/Input/Input'
import { useInputField } from '@/stores/input.store'
import { useThemeStore } from '@/stores/theme.store'
import { fireEvent, render, screen } from '@testing-library/react'

jest.mock('@/stores/theme.store')
jest.mock('@/stores/input.store')

const mockField = {
  value: '',
  errorMessage: '',
  setValue: jest.fn(),
  setError: jest.fn(),
}

describe('Input component', () => {
  beforeEach(() => {
    ;(useInputField as jest.Mock).mockReturnValue(mockField)
    ;(useThemeStore as unknown as jest.Mock).mockReturnValue({ isDark: false })
    mockField.value = ''
    mockField.errorMessage = ''
    mockField.setValue.mockReset()
    mockField.setError.mockReset()
  })

  it('should render with label and required asterisk', () => {
    render(<Input name="email" label="E-mail" required />)
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument()
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('should set masked value on cpf input', () => {
    render(<Input name="cpf" label="CPF" type="cpf" />)
    fireEvent.change(screen.getByLabelText(/cpf/i), { target: { value: '12345678900' } })
    expect(mockField.setValue).toHaveBeenCalledWith('123.456.789-00')
  })

  it('should set masked value on cnpj input', () => {
    render(<Input name="cnpj" label="CNPJ" type="cnpj" />)
    fireEvent.change(screen.getByLabelText(/cnpj/i), { target: { value: '12345678000199' } })
    expect(mockField.setValue).toHaveBeenCalledWith('12.345.678/0001-99')
  })

  it('should set masked value on phone input', () => {
    render(<Input name="phone" label="Telefone" type="phone" />)
    fireEvent.change(screen.getByLabelText(/telefone/i), { target: { value: '21987654321' } })
    expect(mockField.setValue).toHaveBeenCalledWith('(21) 98765-4321')
  })

  it('should show error when required field is empty on blur', () => {
    render(<Input name="name" label="Nome" required />)
    fireEvent.blur(screen.getByLabelText(/nome/i))
    expect(mockField.setError).toHaveBeenCalledWith('Nome é Obrigatório.')
  })

  it('should validate length limits and set error on blur', () => {
    mockField.value = '123'
    render(<Input name="nickname" label="Apelido" minLength={5} maxLength={10} />)
    fireEvent.blur(screen.getByLabelText(/apelido/i))
    expect(mockField.setError).toHaveBeenCalledWith('Apelido Precisa de No Mínimo 5 Caracteres.')

    mockField.value = '12345678901'
    render(<Input name="nickname2" label="Apelido2" minLength={5} maxLength={10} />)
    fireEvent.blur(screen.getByLabelText(/apelido2/i))
    expect(mockField.setError).toHaveBeenCalledWith('Apelido2 Excede o Limite de 10 Caracteres.')
  })

  it('should toggle password visibility when button is clicked', () => {
    render(<Input name="senha" label="Senha" type="password" />)
    const button = screen.getByRole('button')
    expect(screen.getByLabelText(/senha/i)).toHaveAttribute('type', 'password')
    fireEvent.click(button)
    expect(screen.getByLabelText(/senha/i)).toHaveAttribute('type', 'text')
  })

  it('should show error message when field has error', () => {
    mockField.errorMessage = 'Campo inválido.'
    render(<Input name="email" label="E-mail" />)
    expect(screen.getByText('Campo inválido.')).toBeInTheDocument()
  })

  it('should apply dark theme class when isDark is true', () => {
    ;(useThemeStore as unknown as jest.Mock).mockReturnValue({ isDark: true })
    render(<Input name="email" label="E-mail" />)
    const label = screen.getByText(/e-mail/i)
    expect(label).toHaveClass('text-light-100')
  })

  it('should call custom onChange callback if provided', () => {
    const handleChange = jest.fn()
    render(<Input name="phone" label="Telefone" type="phone" onChange={handleChange} />)
    fireEvent.change(screen.getByLabelText(/telefone/i), { target: { value: '21999999999' } })
    expect(handleChange).toHaveBeenCalledWith('(21) 99999-9999')
  })
})
