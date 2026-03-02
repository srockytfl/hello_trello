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

      <!-- Edit Form -->
      <div class="form-section">
        <h3>
          <span class="material-icons-round">edit</span>
          Editar Perfil
        </h3>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>

          <!-- Name -->
          <div class="field" [class.has-error]="isInvalid('name')">
            <label for="name">
              Nome
              <span class="required">*</span>
            </label>
            <input
              id="name"
              type="text"
              formControlName="name"
              placeholder="Seu nome completo"
              autocomplete="name"
            />
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
              E-mail
              <span class="required">*</span>
            </label>
            <input
              id="email"
              type="email"
              formControlName="email"
              placeholder="seu@email.com"
              autocomplete="email"
            />
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
            <input
              id="role"
              type="text"
              formControlName="role"
              placeholder="Ex: Administrador"
              autocomplete="organization-title"
            />
          </div>

          <!-- Feedback messages -->
          @if (successMsg()) {
            <div class="msg msg-success">
              <span class="material-icons-round">check_circle</span>
              {{ successMsg() }}
            </div>
          }
          @if (errorMsg()) {
            <div class="msg msg-error">
              <span class="material-icons-round">error</span>
              {{ errorMsg() }}
            </div>
          }

          <div class="form-actions">
            <button type="submit" class="btn-save" [disabled]="saving()">
              <span class="material-icons-round">save</span>
              {{ saving() ? 'Salvando...' : 'Salvar Alterações' }}
            </button>
          </div>

        </form>
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

    /* ── Edit Form ── */
    .form-section {
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

    form {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    label {
      font-size: 12px;
      font-weight: 500;
      color: var(--muted);
      display: flex;
      align-items: center;
      gap: 3px;
    }

    .required {
      color: var(--red);
      font-size: 12px;
    }

    input[type="text"],
    input[type="email"] {
      width: 100%;
      padding: 9px 12px;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 3px;
      color: var(--text-bright);
      font-size: 13px;
      outline: none;
      transition: border-color 0.15s;

      &::placeholder { color: var(--muted); opacity: 0.6; }
      &:focus { border-color: var(--blue); }
    }

    .field.has-error input {
      border-color: var(--red);
      &:focus { border-color: var(--red); }
    }

    .field-error {
      font-size: 11px;
      color: var(--red);
      display: flex;
      align-items: center;
      gap: 4px;
    }

    /* ── Feedback messages ── */
    .msg {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      border-radius: 3px;
      font-size: 13px;
      font-weight: 500;
      .material-icons-round { font-size: 18px; }
    }

    .msg-success {
      background: rgba(74, 222, 128, 0.1);
      border: 1px solid rgba(74, 222, 128, 0.3);
      color: var(--green);
    }

    .msg-error {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: var(--red);
    }

    /* ── Actions ── */
    .form-actions {
      display: flex;
      justify-content: flex-end;
      padding-top: 4px;
    }

    .btn-save {
      padding: 9px 20px;
      background: var(--blue);
      border: none;
      border-radius: 3px;
      color: #111111;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      .material-icons-round { font-size: 16px; }
      &:hover { background: var(--blue-dark); }
      &:disabled { opacity: 0.6; cursor: not-allowed; }

      @media (max-width: 480px) {
        width: 100%;
        justify-content: center;
      }
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
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      role: [''],
    });
  }

  ngOnInit(): void {
    if (!localStorage.getItem('user')) {
      this.router.navigate(['/login']);
      return;
    }

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
