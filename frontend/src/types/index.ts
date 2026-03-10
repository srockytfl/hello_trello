export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export interface LoginResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
}
