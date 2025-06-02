import {
  maskCNPJ,
  maskCPF,
  maskEmail,
  maskNumber,
  maskPhone,
  validateCNPJ,
  validateCPF,
  validateDate,
  validateDateRange,
  validateDateTime,
  validateEmail,
  validateLength,
  validateNumber,
  validatePhone,
  validateRequired,
  validateTime,
  validateTimeRange,
} from '@/utils/validationsHelper';

describe('Utils - validation and masking', () => {
  describe('maskCPF', () => {
    it('should format CPF correctly', () => {
      expect(maskCPF('12345678909')).toBe('123.456.789-09');
    });

    it('should slice extra digits', () => {
      expect(maskCPF('12345678909876')).toBe('123.456.789-09');
    });
  });

  describe('maskCNPJ', () => {
    it('should format CNPJ correctly', () => {
      expect(maskCNPJ('12345678000195')).toBe('12.345.678/0001-95');
    });

    it('should slice extra digits', () => {
      expect(maskCNPJ('12345678000195123')).toBe('12.345.678/0001-95');
    });
  });

  describe('maskPhone', () => {
    it('should format 11-digit phone', () => {
      expect(maskPhone('11987654321')).toBe('(11) 98765-4321');
    });

    it('should format 10-digit phone', () => {
      expect(maskPhone('1134567890')).toBe('(11) 3456-7890');
    });

    it('should slice extra digits', () => {
      expect(maskPhone('119876543210000')).toBe('(11) 98765-4321');
    });
  });

  describe('maskNumber', () => {
    it('should remove non-numeric characters', () => {
      expect(maskNumber('abc123d45')).toBe('12345');
    });
  });

  describe('maskEmail', () => {
    it('should trim email input', () => {
      expect(maskEmail('  test@email.com  ')).toBe('test@email.com');
    });
  });

  describe('validateCPF', () => {
    it('should return true for valid CPF', () => {
      expect(validateCPF('529.982.247-25')).toBe(true);
    });

    it('should return false for invalid CPF', () => {
      expect(validateCPF('123.456.789-00')).toBe(false);
    });

    it('should return false for all same digits', () => {
      expect(validateCPF('111.111.111-11')).toBe(false);
    });
  });

  describe('validateCNPJ', () => {
    it('should return true for valid CNPJ', () => {
      expect(validateCNPJ('45.723.174/0001-10')).toBe(true);
    });

    it('should return false for invalid CNPJ', () => {
      expect(validateCNPJ('11.111.111/1111-11')).toBe(false);
    });
  });

  describe('validatePhone', () => {
    it('should validate formatted phone', () => {
      expect(validatePhone('(11) 98765-4321')).toBe(true);
      expect(validatePhone('(11) 3456-7890')).toBe(true);
    });

    it('should return false for invalid format', () => {
      expect(validatePhone('11987654321')).toBe(false);
    });
  });

  describe('validateEmail', () => {
    it('should return true for valid email', () => {
      expect(validateEmail('test@site.com')).toBe(true);
    });

    it('should return false for invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false);
    });
  });

  describe('validateRequired', () => {
    it('should return true for non-empty string', () => {
      expect(validateRequired('hello')).toBe(true);
    });

    it('should return false for empty or blank string', () => {
      expect(validateRequired('')).toBe(false);
      expect(validateRequired('   ')).toBe(false);
    });
  });

  describe('validateLength', () => {
    it('should return true for value within range', () => {
      expect(validateLength('12345', 3, 6)).toBe(true);
    });

    it('should return false for value outside range', () => {
      expect(validateLength('12', 3, 6)).toBe(false);
      expect(validateLength('1234567', 3, 6)).toBe(false);
    });
  });

  describe('validateNumber', () => {
    it('should return true for only digits', () => {
      expect(validateNumber('12345')).toBe(true);
    });

    it('should return false for non-digit characters', () => {
      expect(validateNumber('abc123')).toBe(false);
    });
  });

  describe('validateDate', () => {
    it('should return true for valid date format', () => {
      expect(validateDate('31/12/2020')).toBe(true);
    });

    it('should return false for invalid format', () => {
      expect(validateDate('2020-12-31')).toBe(false);
    });
  });

  describe('validateTime', () => {
    it('should return true for valid time', () => {
      expect(validateTime('23:59')).toBe(true);
    });

    it('should return false for invalid time', () => {
      expect(validateTime('25:00')).toBe(false);
    });
  });

  describe('validateDateTime', () => {
    it('should return true for valid datetime', () => {
      expect(validateDateTime('31/12/2020 23:59')).toBe(true);
    });

    it('should return false for invalid datetime', () => {
      expect(validateDateTime('2020-12-31 23:59')).toBe(false);
    });
  });

  describe('validateDateRange', () => {
    it('should return true for valid array of dates', () => {
      expect(validateDateRange(['01/01/2022', '31/12/2022'])).toBe(true);
    });

    it('should return false if any date is invalid', () => {
      expect(validateDateRange(['01/01/2022', '2022-12-31'])).toBe(false);
    });
  });

  describe('validateTimeRange', () => {
    it('should return true for valid time range', () => {
      expect(validateTimeRange(['08:00', '18:30'])).toBe(true);
    });

    it('should return false for invalid time format', () => {
      expect(validateTimeRange(['08:00', '25:00'])).toBe(false);
    });
  });
});
