import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  imports: [ReactiveFormsModule],
  template: `
    <!-- Page Header -->
    <header class="page-header">
      <div class="header-left">
        <button class="btn-back" (click)="goBack()" title="Voltar para Tarefas">
          <span class="material-icons-round">arrow_back</span>
        </button>
        <div class="page-icon">
          <span class="material-icons-round">account_circle</span>
        </div>
        <div class="page-title-group">
          <h1 class="page-title">Meu Perfil</h1>
          <p class="page-subtitle">Gerencie suas informações pessoais</p>
        </div>
      </div>
    </header>

    <!-- Content -->
    <main class="content-area">

      <!-- Profile Card -->
      <div class="profile-card">
        <div class="avatar-wrap">
          <div class="avatar-ring">
            <div class="avatar-large">{{ initials() }}</div>
          </div>
        </div>
        <div class="user-meta">
          <h2 class="user-name">{{ profile().name }}</h2>
          <p class="user-email">
            <span class="material-icons-round" aria-hidden="true">alternate_email</span>
            {{ profile().email }}
          </p>
          @if (profile().role) {
            <span class="role-badge">
              <span class="material-icons-round" aria-hidden="true">work_outline</span>
              {{ profile().role }}
            </span>
          }
        </div>
      </div>

      <!-- Edit Form -->
      <div class="form-card">
        <div class="form-header">
          <span class="form-header-icon material-icons-round" aria-hidden="true">edit_note</span>
          <h3>Editar Informações</h3>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate class="form-body">

          <!-- Name -->
          <div class="field" [class.has-error]="isInvalid('name')">
            <label for="name">
              Nome <span class="required">*</span>
            </label>
            <div class="input-wrap">
              <span class="material-icons-round field-icon">badge</span>
              <input
                id="name"
                type="text"
                formControlName="name"
                placeholder="Seu nome completo"
                autocomplete="name"
              />
            </div>
            @if (isInvalid('name')) {
              <span class="field-error">
                @if (form.get('name')?.errors?.['required']) { Nome é obrigatório. }
                @else if (form.get('name')?.errors?.['minlength']) { Mínimo de 2 caracteres. }
              </span>
            }
          </div>

          <!-- Email -->
          <div class="field" [class.has-error]="isInvalid('email')">
            <label for="email">
              E-mail <span class="required">*</span>
            </label>
            <div class="input-wrap">
              <span class="material-icons-round field-icon">alternate_email</span>
              <input
                id="email"
                type="email"
                formControlName="email"
                placeholder="seu@email.com"
                autocomplete="email"
              />
            </div>
            @if (isInvalid('email')) {
              <span class="field-error">
                @if (form.get('email')?.errors?.['required']) { E-mail é obrigatório. }
                @else if (form.get('email')?.errors?.['email']) { Informe um e-mail válido. }
              </span>
            }
          </div>

          <!-- Role -->
          <div class="field">
            <label for="role">Cargo</label>
            <div class="input-wrap">
              <span class="material-icons-round field-icon">work_outline</span>
              <input
                id="role"
                type="text"
                formControlName="role"
                placeholder="Ex: Administrador"
                autocomplete="organization-title"
              />
            </div>
          </div>

          <!-- Feedback -->
          @if (successMsg()) {
            <div class="msg msg-success" role="status" aria-live="polite">
              <span class="material-icons-round" aria-hidden="true">check_circle_outline</span>
              {{ successMsg() }}
            </div>
          }
          @if (errorMsg()) {
            <div class="msg msg-error" role="alert" aria-live="assertive">
              <span class="material-icons-round" aria-hidden="true">error_outline</span>
              {{ errorMsg() }}
            </div>
          }

          <div class="form-actions">
            <button type="submit" class="btn-save" [disabled]="saving()">
              <span class="material-icons-round" aria-hidden="true">{{ saving() ? 'sync' : 'save' }}</span>
              {{ saving() ? 'Salvando...' : 'Salvar Alterações' }}
            </button>
          </div>

        </form>
      </div>

    </main>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: hidden;
      min-height: 0;
    }

    /* ── Page Header ── */
    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      height: var(--header-height, 62px);
      background: var(--bg2);
      border-bottom: 1px solid var(--border);
      flex-shrink: 0;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .btn-back {
      background: none;
      border: none;
      color: var(--muted);
      cursor: pointer;
      padding: 7px;
      border-radius: var(--radius-md, 10px);
      display: flex;
      align-items: center;
      transition: background var(--transition-fast), color var(--transition-fast);

      .material-icons-round { font-size: 20px; }

      &:hover {
        color: var(--text-bright);
        background: var(--hover);
      }
    }

    .page-icon {
      width: 38px;
      height: 38px;
      border-radius: var(--radius-md, 10px);
      background: linear-gradient(135deg, rgba(255, 105, 180, 0.2), rgba(167, 139, 250, 0.12));
      border: 1px solid rgba(255, 105, 180, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;

      .material-icons-round { font-size: 20px; color: var(--blue); }
    }

    .page-title-group {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }

    .page-title {
      font-size: 15px;
      font-weight: 700;
      color: var(--text-bright);
      letter-spacing: -0.3px;
    }

    .page-subtitle {
      font-size: 11px;
      color: var(--muted);
    }

    /* ── Content Area ── */
    .content-area {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-width: 620px;
      width: 100%;
      margin: 0 auto;
    }

    /* ── Profile Card ── */
    .profile-card {
      display: flex;
      align-items: center;
      gap: 20px;
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg, 14px);
      padding: 24px;
      box-shadow: var(--shadow-card);
    }

    .avatar-wrap {
      flex-shrink: 0;
    }

    .avatar-ring {
      padding: 3px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--blue), var(--purple));
      box-shadow: 0 4px 16px rgba(255, 105, 180, 0.35);
    }

    .avatar-large {
      width: 68px;
      height: 68px;
      border-radius: 50%;
      background: var(--bg3);
      border: 3px solid var(--bg2);
      color: var(--text-bright);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: 800;
      letter-spacing: 1px;
    }

    .user-meta {
      display: flex;
      flex-direction: column;
      gap: 7px;
      min-width: 0;
    }

    .user-name {
      font-size: 20px;
      font-weight: 700;
      color: var(--text-bright);
      letter-spacing: -0.4px;
    }

    .user-email {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: var(--muted);

      .material-icons-round { font-size: 15px; }
    }

    .role-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 12px;
      background: rgba(255, 105, 180, 0.1);
      border: 1px solid rgba(255, 105, 180, 0.2);
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
      color: var(--blue);
      align-self: flex-start;

      .material-icons-round { font-size: 13px; }
    }

    /* ── Form Card ── */
    .form-card {
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg, 14px);
      overflow: hidden;
      box-shadow: var(--shadow-card);
    }

    .form-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 16px 20px;
      border-bottom: 1px solid var(--border);
      background: linear-gradient(135deg, rgba(255, 105, 180, 0.06), transparent);

      .form-header-icon { font-size: 20px; color: var(--blue); }

      h3 {
        font-size: 13px;
        font-weight: 700;
        color: var(--text-bright);
        letter-spacing: -0.2px;
      }
    }

    .form-body {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 7px;
    }

    label {
      font-size: 12px;
      font-weight: 600;
      color: var(--text);
      display: flex;
      align-items: center;
      gap: 3px;
    }

    .required { color: var(--red); }

    .input-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--bg3);
      border: 1.5px solid var(--border-emphasis);
      border-radius: var(--radius-md, 10px);
      padding: 0 14px;
      transition: border-color var(--transition-base), box-shadow var(--transition-base);

      &:focus-within {
        border-color: var(--blue);
        box-shadow: var(--shadow-blue);
      }
    }

    .field.has-error .input-wrap {
      border-color: var(--red);

      &:focus-within {
        border-color: var(--red);
        box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.15);
      }
    }

    .field-icon {
      font-size: 18px;
      color: var(--muted);
      flex-shrink: 0;
    }

    input[type="text"],
    input[type="email"] {
      flex: 1;
      padding: 12px 0;
      background: none;
      border: none;
      color: var(--text-bright);
      font-size: 13px;
      outline: none;

      &::placeholder { color: var(--muted); }
    }

    .field-error {
      font-size: 11px;
      color: var(--red);
    }

    /* ── Feedback ── */
    .msg {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      border-radius: var(--radius-md, 10px);
      font-size: 13px;
      font-weight: 500;

      .material-icons-round { font-size: 18px; }
    }

    .msg-success {
      background: rgba(52, 211, 153, 0.08);
      border: 1px solid rgba(52, 211, 153, 0.2);
      color: var(--green);
    }

    .msg-error {
      background: rgba(248, 113, 113, 0.08);
      border: 1px solid rgba(248, 113, 113, 0.2);
      color: var(--red);
    }

    /* ── Actions ── */
    .form-actions {
      display: flex;
      justify-content: flex-end;
      padding-top: 4px;
    }

    .btn-save {
      padding: 11px 24px;
      background: linear-gradient(135deg, var(--blue) 0%, var(--blue-dark) 100%);
      border: none;
      border-radius: var(--radius-md, 10px);
      color: #1a1a1a;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: opacity var(--transition-fast), box-shadow var(--transition-fast), transform var(--transition-fast);

      .material-icons-round { font-size: 18px; }

      &:hover {
        opacity: 0.9;
        box-shadow: 0 4px 16px rgba(255, 105, 180, 0.4);
      }

      &:active { transform: scale(0.98); }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
      }

      @media (max-width: 480px) {
        width: 100%;
        justify-content: center;
      }
    }

    /* ── Responsive ── */
    @media (max-width: 600px) {
      .content-area { padding: 16px; }
      .page-header { padding: 0 16px; }
      .profile-card { gap: 14px; padding: 16px; flex-direction: column; align-items: flex-start; }
      .avatar-large { width: 56px; height: 56px; font-size: 20px; }
      .user-name { font-size: 17px; }
      .page-subtitle { display: none; }
    }
  `],
})
export class ProfileComponent implements OnInit {
  profile = signal<UserProfile>({ name: '', email: '', role: '', joinedAt: '' });
  initials = signal('U');
  saving = signal(false);
  successMsg = signal('');
  errorMsg = signal('');

  form: FormGroup;

  constructor(
    private router: Router,
    private api: ApiService,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      name:  ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      role:  [''],
    });
  }

  ngOnInit(): void {
    // Proteção de rota garantida pelo authGuard na configuração de rotas
    this.api.getUserProfile().subscribe({
      next: (p: UserProfile) => {
        this.profile.set(p);
        this.updateInitials(p.name);
        this.form.patchValue({ name: p.name, email: p.email, role: p.role });
      },
      error: () => {
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
            this.form.patchValue({ name: fallback.name, email: fallback.email, role: fallback.role });
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

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.successMsg.set('');
    this.errorMsg.set('');

    this.api.updateUserProfile(this.form.value).subscribe({
      next: (updated: UserProfile) => {
        this.profile.set(updated);
        this.updateInitials(updated.name);
        this.successMsg.set('Perfil atualizado com sucesso!');
        this.saving.set(false);
        setTimeout(() => this.successMsg.set(''), 4000);
      },
      error: () => {
        this.errorMsg.set('Erro ao atualizar perfil. Tente novamente.');
        this.saving.set(false);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/todos']);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
