import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

export interface AuthUser {
  name: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<AuthUser | null>(this.loadFromStorage());

  /** Readonly signal com o usuário atual (null = não autenticado) */
  readonly user = this._user.asReadonly();

  /** true quando há um usuário autenticado */
  readonly isAuthenticated = computed(() => this._user() !== null);

  constructor(private router: Router) {}

  private loadFromStorage(): AuthUser | null {
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }

  /** Persiste o usuário no storage e atualiza o signal */
  setUser(user: AuthUser): void {
    localStorage.setItem('user', JSON.stringify(user));
    this._user.set(user);
  }

  /** Remove a sessão e redireciona para o login */
  logout(): void {
    localStorage.removeItem('user');
    this._user.set(null);
    this.router.navigate(['/login']);
  }
}
