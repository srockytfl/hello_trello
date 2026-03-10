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
