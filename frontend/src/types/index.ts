export type TodoStatus = 'todo' | 'doing' | 'done';

export interface Todo {
  id: number;
  text: string;
  done: boolean;
  status: TodoStatus;
}

export interface LoginResponse {
  token: string;
  user: {
    name: string;
    username: string;
  };
}

export interface UserProfile {
  name: string;
  username: string;
}

export interface UpdateProfileRequest {
  name: string;
}

export interface UpdateProfileResponse {
  user: UserProfile;
}

export interface RegisterRequest {
  name: string;
  username: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
  user: {
    name: string;
    username: string;
  };
}

export interface ForgotPasswordResponse {
  message: string;
}
