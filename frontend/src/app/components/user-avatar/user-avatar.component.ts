import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  template: `
    <button
      class="avatar"
      (click)="goToProfile()"
      [title]="'Perfil de ' + userName()"
      aria-label="Perfil do usuário"
    >
      <span class="avatar-initials">{{ initials() }}</span>
      <span class="avatar-ring" aria-hidden="true"></span>
    </button>
  `,
  styles: [`
    .avatar {
      position: relative;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--blue), var(--purple));
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: transform var(--transition-fast), box-shadow var(--transition-fast);

      &:hover {
        transform: scale(1.1);
        box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.25), 0 4px 12px rgba(0, 0, 0, 0.4);

        .avatar-ring {
          opacity: 1;
        }
      }

      &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.35);
      }

      @media (max-width: 480px) {
        width: 30px;
        height: 30px;
      }
    }

    .avatar-initials {
      font-size: 11px;
      font-weight: 700;
      color: #fff;
      letter-spacing: 0.5px;
      line-height: 1;
      position: relative;
      z-index: 1;
    }

    .avatar-ring {
      position: absolute;
      inset: -3px;
      border-radius: 50%;
      background: conic-gradient(var(--blue), var(--purple), var(--teal), var(--blue));
      opacity: 0;
      transition: opacity var(--transition-fast);
      z-index: 0;
      mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 2px));
      -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 2px));
    }
  `],
})
export class UserAvatarComponent implements OnInit {
  userName = signal('');
  initials = signal('U');

  constructor(private router: Router) {}

  ngOnInit(): void {
    const raw = localStorage.getItem('user');
    if (raw) {
      try {
        const user = JSON.parse(raw);
        const name: string = user.name || 'User';
        this.userName.set(name);
        const parts = name.trim().split(/\s+/);
        const ini =
          parts.length >= 2
            ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
            : parts[0].substring(0, 2).toUpperCase();
        this.initials.set(ini);
      } catch {
        this.initials.set('U');
      }
    }
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
