import api from '../api';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await api.post('/auth/login', payload);
  return response.data;
}
