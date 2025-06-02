import api from '@/services/api';

export async function getRecentHistory() {
  const { data } = await api.get('/auth/history?limit=10');
  return data;
}

export async function getAllHistory() {
  const { data } = await api.get('/auth/history');
  return data;
}
