import axios from 'axios';
import type { LoginResponse } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL ?? '';

export async function loginWithCredentials(
  usernameOrEmail: string,
  password: string
): Promise<LoginResponse> {
  const isEmail = usernameOrEmail.includes('@');
  const payload = isEmail
    ? { email: usernameOrEmail, password }
    : { username: usernameOrEmail, password };

  const res = await axios.post<LoginResponse>(
    `${BASE_URL}/auth/login`,
    payload
  );
  return res.data;
}

export function logout(): void {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
}

export function getStoredUser(): LoginResponse['user'] | null {
  const raw = localStorage.getItem('user');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as LoginResponse['user'];
  } catch {
    return null;
  }
}
