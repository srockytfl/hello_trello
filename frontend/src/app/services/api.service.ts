import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private url = '/api';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<any>(`${this.url}/login`, { username, password });
  }

  getTodos() {
    return this.http.get<any[]>(`${this.url}/todos`);
  }

  addTodo(text: string) {
    return this.http.post<any>(`${this.url}/todos`, { text });
  }

  updateTodo(id: number, data: any) {
    return this.http.put<any>(`${this.url}/todos/${id}`, data);
  }

  deleteTodo(id: number) {
    return this.http.delete(`${this.url}/todos/${id}`);
  }
}
