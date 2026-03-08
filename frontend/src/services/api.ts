import axios from 'axios';
import type { Todo, LoginResponse } from '../types';

const BASE = '/api';

export async function login(username: string, password: string): Promise<LoginResponse> {
  const res = await axios.post<LoginResponse>(`${BASE}/login`, { username, password });
  return res.data;
}

export async function getTodos(): Promise<Todo[]> {
  const res = await axios.get<Todo[]>(`${BASE}/todos`);
  return res.data;
}

export async function addTodo(text: string): Promise<Todo> {
  const res = await axios.post<Todo>(`${BASE}/todos`, { text });
  return res.data;
}

export async function updateTodo(id: number, data: Partial<Todo>): Promise<Todo> {
  const res = await axios.put<Todo>(`${BASE}/todos/${id}`, data);
  return res.data;
}

export async function deleteTodo(id: number): Promise<void> {
  await axios.delete(`${BASE}/todos/${id}`);
}
