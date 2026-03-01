import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

interface UserProfile {
  name: string;
  email: string;
  role: string;
  joinedAt: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  template: `
    <div class="profile-page">

      <!-- Page Header -->
      <div class="page-header">
        <button class="btn-back" (click)="goBack()">
          <span class="material-icons-round">arrow_back</span>
          Voltar
        </button>
        <h1>Perfil do Usuário</h1>
      </div>

      <!-- Profile Card -->
      <div class="profile-card">
        <div class="avatar-large">{{ initials() }}</div>
        <div class="user-meta">
          <h2>{{ profile().name }}</h2>
          <p class="email">
            <span class="material-icons-round">email</span>
            {{ profile().email }}
          </p>
          <span class="role-badge">{{ profile().role }}</span>
        </div>
      </div>

      <!-- Settings Section -->
      <div class="settings-section">
        <h3>
          <span class="material-icons-round">settings</span>
          Settings
        </h3>

        <div class="settings-list">
          <div class="settings-item">
            <span class="material-icons-round icon-accent">notifications</span>
            <div class="settings-text">
              <strong>Notificações</strong>
              <p>Gerenciar preferências de notificação</p>
            </div>
            <span class="material-icons-round arrow">chevron_right</span>
          </div>

          <div class="settings-item">
            <span class="material-icons-round icon-accent">palette</span>
            <div class="settings-text">
              <strong>Aparência</strong>
              <p>Personalizar tema e visualização</p>
            </div>
            <span class="material-icons-round arrow">chevron_right</span>
          </div>

          <div class="settings-item">
            <span class="material-icons-round icon-accent">security</span>
            <div class="settings-text">
              <strong>Segurança</strong>
              <p>Senha e autenticação</p>
            </div>
            <span class="material-icons-round arrow">chevron_right</span>
          </div>

          <div class="settings-item">
            <span class="material-icons-round icon-accent">language</span>
            <div class="settings-text">
              <strong>Idioma</strong>
              <p>Selecionar idioma da interface</p>
            </div>
            <span class="material-icons-round arrow">chevron_right</span>
          </div>
        </div>
      </div>

      <!-- Logout -->
      <button class="btn-logout" (click)="logout()">
        <span class="material-icons-round">logout</span>
        Sair da conta
      </button>

    </div>
  `,
  styles: [`
    :host { display: flex; flex-direction: column; flex: 1; min-height: 0; }

    .profile-page {
      flex: 1;
      max-width: 560px;
      width: 100%;
      margin: 0 auto;
      padding: 24px 16px 32px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    /* ── Page Header ── */
    .page-header {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    h1 {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-bright);
    }

    .btn-back {
      background: none;
      border: none;
      color: var(--muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 13px;
      padding: 4px 8px;
      border-radius: 3px;
      .material-icons-round { font-size: 18px; }
      &:hover { color: var(--text-bright); background: var(--hover); }
    }

    /* ── Profile Card ── */
    .profile-card {
      display: flex;
      align-items: center;
      gap: 20px;
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 24px;
    }

    .avatar-large {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: var(--blue);
      color: #111111;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: 1px;
      flex-shrink: 0;

      @media (max-width: 480px) {
        width: 52px;
        height: 52px;
        font-size: 18px;
      }
    }

    .user-meta {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
    }

    h2 {
      font-size: 18px;
      font-weight: 600;
      color: var(--text-bright);

      @media (max-width: 480px) {
        font-size: 15px;
      }
    }

    .email {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: var(--muted);
      .material-icons-round { font-size: 14px; }
    }

    .role-badge {
      display: inline-block;
      padding: 2px 8px;
      background: var(--hover);
      border: 1px solid var(--border);
      border-radius: 12px;
      font-size: 11px;
      color: var(--text);
      align-self: flex-start;
    }

    /* ── Settings Section ── */
    .settings-section {
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      overflow: hidden;
    }

    h3 {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-bright);
      padding: 16px 20px 12px;
      border-bottom: 1px solid var(--border);
      .material-icons-round { font-size: 18px; color: var(--blue); }
    }

    .settings-list { display: flex; flex-direction: column; }

    .settings-item {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px 20px;
      border-bottom: 1px solid var(--border);
      cursor: pointer;
      transition: background 0.12s;

      &:last-child { border-bottom: none; }
      &:hover { background: var(--hover); }
    }

    .icon-accent {
      font-size: 20px;
      color: var(--blue);
      flex-shrink: 0;
    }

    .settings-text {
      flex: 1;
      min-width: 0;

      strong {
        display: block;
        font-size: 13px;
        color: var(--text-bright);
        font-weight: 500;
      }
      p {
        font-size: 11px;
        color: var(--muted);
        margin-top: 2px;
      }
    }

    .arrow {
      font-size: 18px;
      color: var(--muted);
    }

    /* ── Logout ── */
    .btn-logout {
      align-self: flex-start;
      background: none;
      border: 1px solid var(--border);
      color: var(--muted);
      cursor: pointer;
      padding: 8px 16px;
      border-radius: 3px;
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      .material-icons-round { font-size: 16px; }
      &:hover { color: var(--red); border-color: var(--red); background: rgba(239,68,68,0.06); }
    }
  `],
})
export class ProfileComponent implements OnInit {
  profile = signal<UserProfile>({ name: '', email: '', role: '', joinedAt: '' });
  initials = signal('U');

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    if (!localStorage.getItem('user')) {
      this.router.navigate(['/login']);
      return;
    }

    this.api.getUserProfile().subscribe({
      next: (p: UserProfile) => {
        this.profile.set(p);
        this.updateInitials(p.name);
      },
      error: () => {
        // Fallback to localStorage data
        const raw = localStorage.getItem('user');
        if (raw) {
          try {
            const user = JSON.parse(raw);
            const fallback: UserProfile = {
              name: user.name || 'Admin',
              email: 'admin@hellotrello.dev',
              role: 'Administrador',
              joinedAt: '',
            };
            this.profile.set(fallback);
            this.updateInitials(fallback.name);
          } catch { /* noop */ }
        }
      },
    });
  }

  private updateInitials(name: string): void {
    const parts = name.trim().split(/\s+/);
    const ini =
      parts.length >= 2
        ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
        : parts[0].substring(0, 2).toUpperCase();
    this.initials.set(ini);
  }

  goBack(): void {
    this.router.navigate(['/todos']);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
