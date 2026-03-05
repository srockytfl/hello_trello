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
    <main class="login-page" aria-label="Página de login">

      <!-- Decorative background blobs -->
      <div class="bg-blob blob-1"></div>
      <div class="bg-blob blob-2"></div>
      <div class="bg-blob blob-3"></div>

      <div class="login-card">

        <!-- Logo -->
        <div class="login-logo">
          <div class="logo-wrap">
            <div class="logo-icon">
              <span class="material-icons-round">view_kanban</span>
            </div>
            <div class="logo-ring"></div>
          </div>
          <h1 class="app-name">{{ titleService.appTitle() }}</h1>
          <p class="app-tagline">Organize suas tarefas com facilidade</p>
        </div>

        <!-- Form -->
        <form class="login-form" (ngSubmit)="onLogin()" novalidate>

          <div class="field">
            <label for="username">
              <span class="material-icons-round label-icon" aria-hidden="true">person_outline</span>
              Usuário
            </label>
            <div class="input-wrap">
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
            <label for="password">
              <span class="material-icons-round label-icon" aria-hidden="true">lock_outline</span>
              Senha
            </label>
            <div class="input-wrap">
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
            <div class="error-msg" role="alert" aria-live="assertive">
              <span class="material-icons-round" aria-hidden="true">error_outline</span>
              {{ error() }}
            </div>
          }

          <button class="btn-login" type="submit" [disabled]="loading()">
            @if (loading()) {
              <span class="material-icons-round spinning" aria-hidden="true">sync</span>
              Entrando...
            } @else {
              Entrar na Conta
              <span class="material-icons-round" aria-hidden="true">arrow_forward</span>
            }
          </button>

        </form>

        <div class="login-hint">
          <span class="hint-icon material-icons-round" aria-hidden="true">info_outline</span>
          <span>Use <strong>admin</strong> / <strong>123</strong> para acessar</span>
        </div>

      </div>
    </main>
  `,
  styles: [`
    .login-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background: var(--bg);
      position: relative;
      overflow: hidden;
    }

    /* ── Background blobs ── */
    .bg-blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
      z-index: 0;
    }

    .blob-1 {
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(255, 149, 0, 0.12) 0%, transparent 70%);
      top: -150px;
      left: -150px;
    }

    .blob-2 {
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(167, 139, 250, 0.1) 0%, transparent 70%);
      bottom: -100px;
      right: -100px;
    }

    .blob-3 {
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(45, 212, 191, 0.07) 0%, transparent 70%);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    /* ── Card ── */
    .login-card {
      width: 100%;
      max-width: 400px;
      background: var(--bg2);
      border: 1px solid var(--border-emphasis);
      border-radius: var(--radius-xl, 20px);
      overflow: hidden;
      box-shadow: var(--shadow-lg), 0 0 60px rgba(255, 149, 0, 0.06);
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 1;
    }

    /* ── Logo ── */
    .login-logo {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      padding: 40px 32px 32px;
      background: linear-gradient(
        160deg,
        rgba(255, 149, 0, 0.1) 0%,
        rgba(167, 139, 250, 0.06) 50%,
        transparent 100%
      );
      border-bottom: 1px solid var(--border);
    }

    .logo-wrap {
      position: relative;
    }

    .logo-icon {
      width: 58px;
      height: 58px;
      border-radius: var(--radius-lg, 14px);
      background: linear-gradient(135deg, var(--blue) 0%, var(--purple) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 32px rgba(255, 149, 0, 0.45);
      position: relative;
      z-index: 1;

      .material-icons-round { font-size: 30px; color: #fff; }
    }

    .logo-ring {
      position: absolute;
      inset: -6px;
      border-radius: 20px;
      background: linear-gradient(135deg, rgba(255, 149, 0, 0.3), rgba(167, 139, 250, 0.3));
      z-index: 0;
      filter: blur(8px);
    }

    .app-name {
      font-size: 22px;
      font-weight: 800;
      color: var(--text-bright);
      letter-spacing: -0.6px;
    }

    .app-tagline {
      font-size: 13px;
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
      gap: 8px;
    }

    label {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 600;
      color: var(--text);
      letter-spacing: 0.2px;
    }

    .label-icon {
      font-size: 14px;
      color: var(--blue);
    }

    .input-wrap {
      background: var(--bg3);
      border: 1.5px solid var(--border-emphasis);
      border-radius: var(--radius-md, 10px);
      transition: border-color var(--transition-base), box-shadow var(--transition-base);

      &:focus-within {
        border-color: var(--blue);
        box-shadow: var(--shadow-blue);
      }
    }

    input {
      width: 100%;
      padding: 12px 16px;
      background: none;
      border: none;
      color: var(--text-bright);
      font-size: 14px;
      outline: none;

      &::placeholder { color: var(--muted); }
    }

    /* ── Error ── */
    .error-msg {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      background: rgba(248, 113, 113, 0.08);
      border: 1px solid rgba(248, 113, 113, 0.2);
      border-radius: var(--radius-md, 10px);
      font-size: 13px;
      font-weight: 500;
      color: var(--red);

      .material-icons-round { font-size: 16px; }
    }

    /* ── Login Button ── */
    .btn-login {
      width: 100%;
      padding: 13px;
      background: linear-gradient(135deg, var(--blue) 0%, var(--blue-dark) 100%);
      border: none;
      border-radius: var(--radius-md, 10px);
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      letter-spacing: 0.1px;
      transition: opacity var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast);
      margin-top: 4px;

      .material-icons-round { font-size: 18px; }

      &:hover {
        opacity: 0.9;
        box-shadow: 0 6px 24px rgba(255, 149, 0, 0.45);
      }

      &:active { transform: scale(0.98); }

      &:disabled {
        opacity: 0.4;
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
    .login-hint {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-size: 11px;
      color: var(--muted);
      text-align: center;
      padding: 14px 32px 20px;
      border-top: 1px solid var(--border);

      .hint-icon { font-size: 14px; color: var(--blue); }

      strong { color: var(--text); }
    }

    /* ── Responsive ── */
    @media (max-width: 480px) {
      .login-card { border-radius: var(--radius-lg, 14px); }
      .login-logo { padding: 28px 20px 24px; gap: 10px; }
      .login-form { padding: 20px 20px 16px; }
      .login-hint { padding: 12px 20px 16px; }
      .app-name { font-size: 18px; }
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
