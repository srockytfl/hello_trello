import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="login-page">
      <div class="login-box">
        <h2>Teste 2</h2>
        <div class="field">
          <label>Usuário</label>
          <input type="text" [(ngModel)]="username" placeholder="admin" (keyup.enter)="onLogin()" autofocus />
        </div>
        <div class="field">
          <label>Senha</label>
          <input type="password" [(ngModel)]="password" placeholder="123" (keyup.enter)="onLogin()" />
        </div>
        <button class="btn-login" (click)="onLogin()" [disabled]="loading()">
          {{ loading() ? 'Entrando...' : 'Entrar' }}
        </button>
        @if (error()) {
          <div class="error">{{ error() }}</div>
        }
        <p class="hint">admin / 123</p>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .login-box {
      width: 320px;
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 32px 28px;
    }

    h2 {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-bright);
      margin-bottom: 24px;
      text-align: center;
    }

    .field {
      margin-bottom: 14px;
    }

    label {
      display: block;
      font-size: 12px;
      color: var(--muted);
      margin-bottom: 6px;
    }

    input {
      width: 100%;
      padding: 8px 10px;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 3px;
      color: var(--text-bright);
      font-size: 13px;
      outline: none;
      &:focus { border-color: var(--blue); }
    }

    .btn-login {
      width: 100%;
      padding: 9px;
      background: var(--blue);
      border: none;
      border-radius: 3px;
      color: #1A1400;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      margin-top: 6px;
      &:hover { background: var(--blue-dark); }
      &:disabled { opacity: 0.6; cursor: not-allowed; }
    }

    .error {
      font-size: 12px;
      color: var(--red);
      text-align: center;
      margin-top: 12px;
    }

    .hint {
      font-size: 11px;
      color: var(--muted);
      text-align: center;
      margin-top: 16px;
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  error = signal('');
  loading = signal(false);

  constructor(private api: ApiService, private router: Router) {
    if (localStorage.getItem('user')) this.router.navigate(['/todos']);
  }

  onLogin() {
    this.error.set('');
    this.loading.set(true);
    this.api.login(this.username, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/todos']);
      },
      error: () => {
        this.error.set('Usuário ou senha inválidos');
        this.loading.set(false);
      }
    });
  }
}
