export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export interface LoginResponse {
  user: {
    username: string;
  };
}
