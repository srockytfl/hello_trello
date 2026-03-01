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
      {{ initials() }}
    </button>
  `,
  styles: [`
    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--blue);
      color: #111111;
      border: 2px solid transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.5px;
      flex-shrink: 0;
      transition: opacity 0.15s, transform 0.15s, border-color 0.15s;
      line-height: 1;

      &:hover {
        opacity: 0.85;
        transform: scale(1.08);
        border-color: var(--blue-dark);
      }

      &:focus {
        outline: none;
        border-color: var(--blue-dark);
        box-shadow: 0 0 0 2px rgba(255, 105, 180, 0.25);
      }

      @media (max-width: 480px) {
        width: 28px;
        height: 28px;
        font-size: 10px;
      }
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
