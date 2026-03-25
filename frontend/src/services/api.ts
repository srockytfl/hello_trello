import axios from 'axios';
import type { Todo, LoginResponse, TodoStatus, UpdateProfileRequest, UpdateProfileResponse, RegisterResponse } from '../types';

const BASE = '/api';

export async function login(username: string, password: string): Promise<LoginResponse> {
  const res = await axios.post<LoginResponse>(`${BASE}/login`, { username, password });
  return res.data;
}

export async function getTodos(): Promise<Todo[]> {
  const res = await axios.get<Todo[]>(`${BASE}/todos`);
  return res.data;
}

export async function addTodo(text: string, status: TodoStatus = 'todo'): Promise<Todo> {
  const res = await axios.post<Todo>(`${BASE}/todos`, { text, status });
  return res.data;
}

export async function updateTodo(id: number, data: Partial<Todo>): Promise<Todo> {
  const res = await axios.put<Todo>(`${BASE}/todos/${id}`, data);
  return res.data;
}

export async function deleteTodo(id: number): Promise<void> {
  await axios.delete(`${BASE}/todos/${id}`);
}

export async function updateProfile(data: UpdateProfileRequest): Promise<UpdateProfileResponse> {
  const res = await axios.patch<UpdateProfileResponse>(`${BASE}/profile`, data);
  return res.data;
}

export async function register(name: string, username: string, password: string): Promise<RegisterResponse> {
  const res = await axios.post<RegisterResponse>(`${BASE}/register`, { name, username, password });
  return res.data;
}
