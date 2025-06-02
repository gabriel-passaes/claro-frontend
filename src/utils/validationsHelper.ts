const removeNonNumeric = (value: string): string => value.replace(/\D/g, '');

export const maskValue = (
  value: string,
  pattern: RegExp,
  format: string,
): string => {
  return removeNonNumeric(value).replace(pattern, format);
};

export const maskCPF = (cpf: string): string => {
  cpf = removeNonNumeric(cpf).slice(0, 11);
  return maskValue(cpf, /(\d{3})(\d{3})(\d{3})(\d{1,2})$/, '$1.$2.$3-$4');
};

export const maskCNPJ = (cnpj: string): string => {
  cnpj = removeNonNumeric(cnpj).slice(0, 14);
  return maskValue(
    cnpj,
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})$/,
    '$1.$2.$3/$4-$5',
  );
};

export const maskPhone = (phone: string): string => {
  phone = removeNonNumeric(phone).slice(0, 11);
  return maskValue(phone, /(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3');
};

export const maskNumber = (number: string): string => {
  return removeNonNumeric(number);
};

export const maskEmail = (email: string): string => email.trim();

export const validateCPF = (cpf: string): boolean => {
  cpf = removeNonNumeric(cpf);
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) sum += parseInt(cpf[i - 1]) * (11 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf[9])) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(cpf[i - 1]) * (12 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  return remainder === parseInt(cpf[10]);
};

export const validateCNPJ = (cnpj: string): boolean => {
  cnpj = removeNonNumeric(cnpj);
  if (cnpj.length !== 14) return false;

  const validateDigit = (numbers: string, size: number): boolean => {
    let sum = 0;
    let pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers[size - i]) * pos--;
      if (pos < 2) pos = 9;
    }
    const result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return result === parseInt(cnpj[size]);
  };

  return (
    validateDigit(cnpj.substring(0, 12), 12) &&
    validateDigit(cnpj.substring(0, 13), 13)
  );
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  return phoneRegex.test(phone);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateLength = (
  value: string,
  min: number,
  max: number,
): boolean => {
  const length = value.trim().length;
  return length >= min && length <= max;
};

export const validateNumber = (number: string): boolean => {
  const numberRegex = /^[0-9]+$/;
  return numberRegex.test(number);
};

export const validateDate = (value: string): boolean => {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  return regex.test(value);
};

export const validateTime = (value: string): boolean => {
  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return regex.test(value);
};

export const validateDateTime = (value: string): boolean => {
  const regex = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/;
  return regex.test(value);
};

export const validateDateRange = (value: string[]): boolean => {
  return Array.isArray(value) && value.every((date) => validateDate(date));
};

export const validateTimeRange = (value: string[]): boolean => {
  return Array.isArray(value) && value.every((time) => validateTime(time));
};
