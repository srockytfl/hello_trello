import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar" [class.collapsed]="collapsed()">

      <!-- Brand -->
      <div class="sidebar-brand">
        <div class="brand-logo">
          <span class="material-icons-round">view_kanban</span>
        </div>
        @if (!collapsed()) {
          <span class="brand-name">Hello Trello</span>
        }
        <button
          class="btn-collapse"
          (click)="toggleCollapse()"
          [title]="collapsed() ? 'Expandir menu' : 'Recolher menu'"
        >
          <span class="material-icons-round">{{ collapsed() ? 'chevron_right' : 'chevron_left' }}</span>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="sidebar-nav">
        @if (!collapsed()) {
          <span class="nav-section-label">Principal</span>
        }

        <a
          class="nav-link"
          routerLink="/todos"
          routerLinkActive="active"
          [title]="collapsed() ? 'Tarefas' : ''"
        >
          <span class="nav-icon material-icons-round">check_circle_outline</span>
          @if (!collapsed()) {
            <span class="nav-label">Tarefas</span>
            <span class="nav-badge" *ngIf="false">3</span>
          }
        </a>

        <a
          class="nav-link"
          routerLink="/profile"
          routerLinkActive="active"
          [title]="collapsed() ? 'Perfil' : ''"
        >
          <span class="nav-icon material-icons-round">person_outline</span>
          @if (!collapsed()) {
            <span class="nav-label">Perfil</span>
          }
        </a>
      </nav>

      <!-- Divider -->
      <div class="sidebar-divider"></div>

      <!-- User Footer -->
      <div class="sidebar-footer" [class.collapsed]="collapsed()">
        <button class="user-chip" (click)="logout()" [title]="collapsed() ? 'Sair' : ''">
          <div class="user-avatar">{{ initials() }}</div>
          @if (!collapsed()) {
            <div class="user-info">
              <span class="user-name">{{ userName() }}</span>
              <span class="user-role">Administrador</span>
            </div>
            <span class="material-icons-round logout-icon">logout</span>
          }
        </button>
      </div>

    </aside>
  `,
  styles: [`
    .sidebar {
      width: var(--sidebar-width, 240px);
      min-width: var(--sidebar-width, 240px);
      height: 100vh;
      background: var(--sidebar-bg, #0d1117);
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      transition: width var(--transition-slow), min-width var(--transition-slow);
      flex-shrink: 0;
      overflow: hidden;
      position: sticky;
      top: 0;
    }

    .sidebar.collapsed {
      width: var(--sidebar-width-collapsed, 56px);
      min-width: var(--sidebar-width-collapsed, 56px);
    }

    /* ── Brand ── */
    .sidebar-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0 14px;
      height: var(--header-height, 56px);
      border-bottom: 1px solid var(--border);
      flex-shrink: 0;
    }

    .brand-logo {
      width: 30px;
      height: 30px;
      border-radius: var(--radius, 6px);
      background: linear-gradient(135deg, var(--blue), var(--blue-darker));
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: var(--shadow-blue);

      .material-icons-round {
        font-size: 18px;
        color: #fff;
      }
    }

    .brand-name {
      font-size: 14px;
      font-weight: 700;
      color: var(--text-bright);
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      letter-spacing: -0.3px;
    }

    .btn-collapse {
      background: none;
      border: none;
      color: var(--muted);
      cursor: pointer;
      padding: 4px;
      border-radius: var(--radius-sm, 4px);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-left: auto;
      transition: background var(--transition-fast), color var(--transition-fast);

      .material-icons-round { font-size: 18px; }

      &:hover {
        color: var(--text-bright);
        background: var(--hover);
      }
    }

    /* ── Navigation ── */
    .sidebar-nav {
      flex: 1;
      padding: 16px 8px 8px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      overflow-y: auto;
    }

    .nav-section-label {
      font-size: 10px;
      font-weight: 600;
      color: var(--muted);
      letter-spacing: 0.8px;
      text-transform: uppercase;
      padding: 0 8px 8px;
      display: block;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: var(--radius, 6px);
      color: var(--text);
      text-decoration: none;
      font-size: 13px;
      font-weight: 500;
      transition: background var(--transition-fast), color var(--transition-fast);
      white-space: nowrap;
      overflow: hidden;
      position: relative;

      .nav-icon {
        font-size: 18px;
        flex-shrink: 0;
        transition: color var(--transition-fast);
      }

      &:hover {
        background: var(--hover);
        color: var(--text-bright);
      }

      &.active {
        background: rgba(47, 129, 247, 0.15);
        color: var(--blue);

        .nav-icon { color: var(--blue); }

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 6px;
          bottom: 6px;
          width: 3px;
          background: var(--blue);
          border-radius: 0 2px 2px 0;
        }
      }
    }

    .sidebar.collapsed .nav-link {
      padding: 10px;
      justify-content: center;
      gap: 0;

      &::before { display: none; }
    }

    .nav-label { flex: 1; }

    .nav-badge {
      min-width: 18px;
      height: 18px;
      padding: 0 5px;
      background: var(--blue);
      color: #fff;
      border-radius: 10px;
      font-size: 10px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* ── Divider ── */
    .sidebar-divider {
      height: 1px;
      background: var(--border);
      margin: 0 12px;
      flex-shrink: 0;
    }

    /* ── Footer ── */
    .sidebar-footer {
      padding: 10px 8px;
      flex-shrink: 0;

      &.collapsed {
        display: flex;
        justify-content: center;
      }
    }

    .user-chip {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: var(--radius, 6px);
      background: none;
      border: none;
      cursor: pointer;
      transition: background var(--transition-fast);
      text-align: left;
      overflow: hidden;

      &:hover {
        background: var(--hover);

        .logout-icon { color: var(--red); }
      }
    }

    .sidebar-footer.collapsed .user-chip {
      width: auto;
      padding: 8px;
      justify-content: center;
    }

    .user-avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--blue), var(--purple));
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 700;
      flex-shrink: 0;
      letter-spacing: 0.5px;
    }

    .user-info {
      flex: 1;
      min-width: 0;
      overflow: hidden;
    }

    .user-name {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-bright);
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-role {
      font-size: 11px;
      color: var(--muted);
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .logout-icon {
      font-size: 16px;
      color: var(--muted);
      flex-shrink: 0;
      transition: color var(--transition-fast);
    }

    /* ── Responsive ── */
    @media (max-width: 768px) {
      .sidebar {
        width: var(--sidebar-width-collapsed, 56px);
        min-width: var(--sidebar-width-collapsed, 56px);
      }

      .sidebar .nav-link {
        padding: 10px;
        justify-content: center;
        gap: 0;
        &::before { display: none; }
      }

      .sidebar-footer { display: flex; justify-content: center; }
      .sidebar-footer .user-chip { width: auto; padding: 8px; justify-content: center; }

      .brand-name,
      .nav-label,
      .nav-section-label,
      .user-info,
      .logout-icon { display: none; }
    }
  `],
})
export class SidebarComponent implements OnInit {
  collapsed = signal(false);
  userName = signal('');
  initials = signal('U');

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    const raw = localStorage.getItem('user');
    if (!raw) return;
    try {
      const user = JSON.parse(raw);
      const name: string = user.name || 'Admin';
      this.userName.set(name);
      const parts = name.trim().split(/\s+/);
      const ini =
        parts.length >= 2
          ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
          : parts[0].substring(0, 2).toUpperCase();
      this.initials.set(ini);
    } catch {
      this.initials.set('A');
    }
  }

  toggleCollapse(): void {
    this.collapsed.update(v => !v);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
