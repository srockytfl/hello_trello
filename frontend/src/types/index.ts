export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    username: string;
  };
}
