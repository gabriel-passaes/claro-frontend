'use client'

import { useInputField } from '@/stores/input.store'
import { useThemeStore } from '@/stores/theme.store'
import {
  maskCNPJ,
  maskCPF,
  maskEmail,
  maskNumber,
  maskPhone,
  validateCNPJ,
  validateCPF,
  validateEmail,
  validateLength,
  validatePhone,
  validateRequired,
} from '@/utils/validationsHelper'
import { useState } from 'react'
import type { InputProps } from './input.types'

export default function Input({
  name,
  label,
  required = false,
  placeholder,
  type = 'text',
  size = 'medium',
  disabled = false,
  autoComplete = 'off',
  iconLeft,
  iconRight,
  minLength,
  maxLength,
  value,
  onChange,
}: InputProps) {
  const field = useInputField(name)
  const { isDark } = useThemeStore()
  const [showPassword, setShowPassword] = useState(false)

  const inputType = type === 'password' && showPassword ? 'text' : type

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    let masked = raw

    if (type === 'cpf') masked = maskCPF(raw)
    else if (type === 'cnpj') masked = maskCNPJ(raw)
    else if (type === 'phone') masked = maskPhone(raw)
    else if (type === 'email') masked = maskEmail(raw)
    else if (type === 'number') masked = maskNumber(raw)

    field.setValue(masked)
    onChange?.(masked)
  }

  const handleBlur = () => {
    let error = ''

    if (required && !validateRequired(field.value)) {
      error = `${label || name} é Obrigatório.`
    } else if ((minLength || maxLength) && !validateLength(field.value, minLength || 0, maxLength || Infinity)) {
      error = minLength && field.value.length < minLength
        ? `${label || name} Precisa de No Mínimo ${minLength} Caracteres.`
        : `${label || name} Excede o Limite de ${maxLength} Caracteres.`
    } else {
      switch (type) {
        case 'cpf':
          error = !validateCPF(field.value) ? 'CPF Inválido.' : ''
          break
        case 'cnpj':
          error = !validateCNPJ(field.value) ? 'CNPJ Inválido.' : ''
          break
        case 'phone':
          error = !validatePhone(field.value) ? 'Telefone Inválido.' : ''
          break
        case 'email':
          error = !validateEmail(field.value) ? 'E-mail Inválido.' : ''
          break
        case 'number':
          error = isNaN(Number(field.value)) ? 'Número Inválido.' : ''
          break
      }
    }

    field.setError(error)
  }

  const baseClasses = [
    'w-full',
    'rounded-md',
    'outline-none',
    'transition-all',
    '!px-3',
    '!py-2',
    '!border-2',
    isDark ? 'bg-dark-100 text-light-100 !border-primary-400' : 'bg-light-100 text-dark-100 !border-primary-300',
    field.errorMessage ? (isDark ? '!border-red-300' : '!border-red-700') : '',
    iconLeft ? '!pl-9' : '!pl-3', 
    (type === 'password' || iconRight) ? '!pr-10' : '!pr-3',
    size === 'small' ? 'h-8 text-sm' : '',
    size === 'medium' ? 'h-10 text-base' : '',
    size === 'large' ? 'h-12 text-lg' : '',
    'appearance-none',
  ].join(' ')

  const iconColor = field.errorMessage
    ? '!text-red-700 dark:!text-red-300'
    : '!text-primary-400 dark:!text-primary-300'

  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={name}
          className={`block text-sm font-medium mb-1 ${isDark ? 'text-light-100' : 'text-dark-100'}`}
        >
          {label}
          {required && (
            <span className={`ml-1 ${isDark ? '!text-red-300' : '!text-red-700'}`}>*</span>
          )}
        </label>
      )}

      <div className="relative">
        {iconLeft && (
          <i className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconLeft} ${iconColor} pointer-events-none`} />
        )}

        <input
          id={name}
          name={name}
          type={inputType}
          value={value ?? field.value}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          autoComplete={autoComplete}
          minLength={minLength}
          maxLength={maxLength}
          aria-invalid={!!field.errorMessage}
          aria-describedby={`${name}-error`}
          className={baseClasses}
        />

        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <i className={`pi ${showPassword ? 'pi-eye-slash' : 'pi-eye'} ${iconColor}`} />
          </button>
        )}

        {iconRight && type !== 'password' && (
          <i className={`absolute right-3 top-1/2 -translate-y-1/2 ${iconRight} ${iconColor} pointer-events-none`} />
        )}
      </div>

      {field.errorMessage && (
        <p id={`${name}-error`} className={`text-sm mt-1 ml-1 ${isDark ? '!text-red-300' : '!text-red-700'}`}>
          {field.errorMessage}
        </p>
      )}
    </div>
  )
}
