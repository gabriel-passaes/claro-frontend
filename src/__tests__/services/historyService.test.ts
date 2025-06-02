import api from '@/services/api';
import { getAllHistory } from '@/services/history/historyService';

jest.mock('@/services/api', () => ({
  get: jest.fn(),
}));

describe('getAllHistory', () => {
  it('should be a function', () => {
    expect(typeof getAllHistory).toBe('function');
  });

  it('should call the correct endpoint', async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: [] });

    await getAllHistory();

    expect(api.get).toHaveBeenCalledWith('/auth/history');
  });

  it('should return history data from the API', async () => {
    const mockData = [
      { id: 1, action: 'login' },
      { id: 2, action: 'logout' },
    ];
    (api.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await getAllHistory();

    expect(result).toEqual(mockData);
  });
});
