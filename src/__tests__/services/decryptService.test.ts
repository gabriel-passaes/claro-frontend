import api from '@/services/api';
import { decryptToken } from '@/services/decrypt/decryptService';

jest.mock('@/services/api', () => ({
  post: jest.fn(),
}));

describe('decryptToken', () => {
  it('should be a function', () => {
    expect(typeof decryptToken).toBe('function');
  });

  it('should call the correct endpoint with jwe payload', async () => {
    const jwe = 'mocked-jwe-token';
    (api.post as jest.Mock).mockResolvedValue({ data: {} });

    await decryptToken(jwe);

    expect(api.post).toHaveBeenCalledWith('/auth/decrypt', { jwe });
  });

  it('should return decrypted token data from the API', async () => {
    const jwe = 'mocked-jwe-token';
    const decryptedData = { email: 'test@example.com', name: 'John Doe' };

    (api.post as jest.Mock).mockResolvedValue({ data: decryptedData });

    const result = await decryptToken(jwe);

    expect(result).toEqual(decryptedData);
  });
});
