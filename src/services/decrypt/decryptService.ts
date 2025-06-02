import api from '@/services/api';

export async function decryptToken(jwe: string) {
  const { data } = await api.post('/auth/decrypt', { jwe });
  return data;
}
