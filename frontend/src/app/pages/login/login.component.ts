import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="login-page">
      <div class="login-card">

        <!-- Logo -->
        <div class="login-logo">
          <div class="logo-icon">
            <span class="material-icons-round">view_kanban</span>
          </div>
          <h1 class="app-name">{{ titleService.appTitle() }}</h1>
          <p class="app-tagline">Organize suas tarefas com facilidade</p>
        </div>

        <!-- Form -->
        <div class="login-form">
          <div class="field">
            <label for="username">Usuário</label>
            <div class="input-wrap">
              <span class="material-icons-round field-icon">person_outline</span>
              <input
                id="username"
                type="text"
                [(ngModel)]="username"
                placeholder="admin"
                (keyup.enter)="onLogin()"
                autofocus
              />
            </div>
          </div>

          <div class="field">
            <label for="password">Senha</label>
            <div class="input-wrap">
              <span class="material-icons-round field-icon">lock_outline</span>
              <input
                id="password"
                type="password"
                [(ngModel)]="password"
                placeholder="••••••"
                (keyup.enter)="onLogin()"
              />
            </div>
          </div>

          @if (error()) {
            <div class="error-msg">
              <span class="material-icons-round">error_outline</span>
              {{ error() }}
            </div>
          }

          <button class="btn-login" (click)="onLogin()" [disabled]="loading()">
            @if (loading()) {
              <span class="material-icons-round spinning">sync</span>
              Entrando...
            } @else {
              <span class="material-icons-round">login</span>
              Entrar
            }
          </button>
        </div>

        <p class="hint">
          <span class="material-icons-round">info_outline</span>
          Credenciais: <strong>admin / 123</strong>
        </p>

      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background: var(--bg);
      background-image:
        radial-gradient(ellipse 80% 50% at 50% -20%, rgba(47, 129, 247, 0.08), transparent),
        radial-gradient(ellipse 60% 40% at 80% 80%, rgba(163, 113, 247, 0.05), transparent);
    }

    .login-card {
      width: 100%;
      max-width: 380px;
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg, 12px);
      overflow: hidden;
      box-shadow: var(--shadow-lg);
      display: flex;
      flex-direction: column;
    }

    /* ── Logo ── */
    .login-logo {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 36px 32px 28px;
      background: linear-gradient(160deg, rgba(47, 129, 247, 0.1) 0%, transparent 60%);
      border-bottom: 1px solid var(--border);
    }

    .logo-icon {
      width: 52px;
      height: 52px;
      border-radius: var(--radius-md, 8px);
      background: linear-gradient(135deg, var(--blue), var(--blue-darker));
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 24px rgba(47, 129, 247, 0.4);

      .material-icons-round { font-size: 28px; color: #fff; }
    }

    .app-name {
      font-size: 20px;
      font-weight: 700;
      color: var(--text-bright);
      letter-spacing: -0.5px;
    }

    .app-tagline {
      font-size: 12px;
      color: var(--muted);
      text-align: center;
    }

    /* ── Form ── */
    .login-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 28px 32px 24px;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    label {
      font-size: 12px;
      font-weight: 600;
      color: var(--text);
      letter-spacing: 0.2px;
    }

    .input-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--bg3);
      border: 1px solid var(--border);
      border-radius: var(--radius-md, 8px);
      padding: 0 14px;
      transition: border-color var(--transition-base), box-shadow var(--transition-base);

      &:focus-within {
        border-color: var(--blue);
        box-shadow: var(--shadow-blue);
      }
    }

    .field-icon {
      font-size: 16px;
      color: var(--muted);
      flex-shrink: 0;
    }

    input {
      flex: 1;
      padding: 12px 0;
      background: none;
      border: none;
      color: var(--text-bright);
      font-size: 13px;
      outline: none;

      &::placeholder { color: var(--muted); }
    }

    /* ── Error ── */
    .error-msg {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      background: rgba(248, 81, 73, 0.08);
      border: 1px solid rgba(248, 81, 73, 0.2);
      border-radius: var(--radius-md, 8px);
      font-size: 12px;
      font-weight: 500;
      color: var(--red);

      .material-icons-round { font-size: 16px; }
    }

    /* ── Login Button ── */
    .btn-login {
      width: 100%;
      padding: 12px;
      background: var(--blue);
      border: none;
      border-radius: var(--radius-md, 8px);
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      letter-spacing: 0.1px;
      transition: background var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast);
      margin-top: 4px;

      .material-icons-round { font-size: 18px; }

      &:hover {
        background: var(--blue-dark);
        box-shadow: 0 6px 20px rgba(47, 129, 247, 0.4);
      }

      &:active { transform: scale(0.98); }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
      }
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }

    .spinning { animation: spin 0.8s linear infinite; }

    /* ── Hint ── */
    .hint {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-size: 11px;
      color: var(--muted);
      text-align: center;
      padding: 0 32px 24px;

      .material-icons-round { font-size: 13px; }

      strong { color: var(--text); }
    }

    /* ── Responsive ── */
    @media (max-width: 480px) {
      .login-card {
        border-radius: var(--radius-md, 8px);
      }
      .login-logo { padding: 28px 20px 20px; }
      .login-form { padding: 20px 20px 16px; }
      .hint { padding: 0 20px 20px; }
    }
  `],
})
export class LoginComponent {
  username = '';
  password = '';
  error = signal('');
  loading = signal(false);

  constructor(
    private api: ApiService,
    private router: Router,
    public titleService: TitleService,
  ) {
    if (localStorage.getItem('user')) this.router.navigate(['/todos']);
  }

  onLogin(): void {
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
      },
    });
  }
}
