import api from '@/services/api';
import { login } from '@/services/auth/authService';

jest.mock('@/services/api', () => ({
  post: jest.fn(),
}));

describe('login', () => {
  it('should be a function', () => {
    expect(typeof login).toBe('function');
  });

  it('should call the correct endpoint with payload', async () => {
    const payload = { email: 'user@example.com', password: 'password123' };
    (api.post as jest.Mock).mockResolvedValue({ data: {} });

    await login(payload);

    expect(api.post).toHaveBeenCalledWith('/auth/login', payload);
  });

  it('should return the token from API response', async () => {
    const payload = { email: 'user@example.com', password: 'password123' };
    const tokenResponse = { token: 'mocked-jwt-token' };

    (api.post as jest.Mock).mockResolvedValue({ data: tokenResponse });

    const result = await login(payload);

    expect(result).toEqual(tokenResponse);
  });
});
