import axios from 'axios';
import type { LoginRequest, LoginResponse } from '../types/auth';

const API_URL = import.meta.env.VITE_API_URL ?? '';

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const { data } = await axios.post<LoginResponse>(
    `${API_URL}/auth/login`,
    credentials
  );
  return data;
}

export function saveToken(token: string): void {
  localStorage.setItem('auth_token', token);
}

export function getToken(): string | null {
  return localStorage.getItem('auth_token');
}

export function clearToken(): void {
  localStorage.removeItem('auth_token');
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function logout(): void {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  clearToken();
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
