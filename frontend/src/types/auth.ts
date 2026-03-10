export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginUser {
  id: number;
  email: string;
  name: string;
}

export interface LoginResponse {
  token: string;
  user: LoginUser;
}

export interface AuthError {
  error: string;
}
