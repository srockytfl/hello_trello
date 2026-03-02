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
        <div class="brand-icon">
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
        <a
          class="nav-link"
          routerLink="/todos"
          routerLinkActive="active"
          [title]="collapsed() ? 'Tarefas' : ''"
        >
          <span class="material-icons-round">check_circle_outline</span>
          @if (!collapsed()) {
            <span class="nav-label">Tarefas</span>
          }
        </a>
        <a
          class="nav-link"
          routerLink="/profile"
          routerLinkActive="active"
          [title]="collapsed() ? 'Perfil' : ''"
        >
          <span class="material-icons-round">person_outline</span>
          @if (!collapsed()) {
            <span class="nav-label">Perfil</span>
          }
        </a>
      </nav>

      <!-- User Footer -->
      <div class="sidebar-footer" [class.collapsed]="collapsed()">
        <div class="user-chip">
          <div class="user-avatar-sm">{{ initials() }}</div>
          @if (!collapsed()) {
            <div class="user-meta">
              <span class="user-name">{{ userName() }}</span>
            </div>
          }
        </div>
        @if (!collapsed()) {
          <button class="btn-logout" (click)="logout()" title="Sair da conta">
            <span class="material-icons-round">logout</span>
          </button>
        }
      </div>

    </aside>
  `,
  styles: [`
    .sidebar {
      width: var(--sidebar-width, 220px);
      min-width: var(--sidebar-width, 220px);
      height: 100vh;
      background: var(--sidebar-bg, #161a1d);
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      transition: width 0.2s ease, min-width 0.2s ease;
      flex-shrink: 0;
      overflow: hidden;
      position: sticky;
      top: 0;
    }

    .sidebar.collapsed {
      width: var(--sidebar-width-collapsed, 60px);
      min-width: var(--sidebar-width-collapsed, 60px);
    }

    /* ── Brand ── */
    .sidebar-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0 12px;
      height: var(--header-height, 52px);
      border-bottom: 1px solid var(--border);
      flex-shrink: 0;
    }

    .brand-icon {
      width: 32px;
      height: 32px;
      border-radius: var(--radius-sm, 4px);
      background: var(--blue);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      .material-icons-round { font-size: 20px; color: #fff; }
    }

    .brand-name {
      font-size: 14px;
      font-weight: 700;
      color: var(--text-bright);
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      letter-spacing: -0.2px;
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
      transition: background 0.15s, color 0.15s;

      .material-icons-round { font-size: 18px; }

      &:hover {
        color: var(--text-bright);
        background: var(--hover);
      }
    }

    /* ── Navigation ── */
    .sidebar-nav {
      flex: 1;
      padding: 12px 8px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      overflow-y: auto;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: var(--radius, 8px);
      color: var(--text);
      text-decoration: none;
      font-size: 13px;
      font-weight: 500;
      transition: background 0.15s, color 0.15s;
      white-space: nowrap;
      overflow: hidden;

      .material-icons-round {
        font-size: 20px;
        flex-shrink: 0;
        transition: color 0.15s;
      }

      &:hover {
        background: var(--hover);
        color: var(--text-bright);
      }

      &.active {
        background: rgba(87, 157, 255, 0.15);
        color: var(--blue);

        .material-icons-round { color: var(--blue); }
      }
    }

    .sidebar.collapsed .nav-link {
      padding: 10px;
      justify-content: center;
      gap: 0;
    }

    .nav-label { flex: 1; }

    /* ── Footer ── */
    .sidebar-footer {
      padding: 10px 8px;
      border-top: 1px solid var(--border);
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;

      &.collapsed {
        justify-content: center;
      }
    }

    .user-chip {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
      min-width: 0;
      overflow: hidden;
    }

    .sidebar-footer.collapsed .user-chip {
      flex: unset;
    }

    .user-avatar-sm {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--blue);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 700;
      flex-shrink: 0;
      letter-spacing: 0.5px;
    }

    .user-meta {
      min-width: 0;
      overflow: hidden;
    }

    .user-name {
      font-size: 12px;
      font-weight: 500;
      color: var(--text-bright);
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .btn-logout {
      background: none;
      border: none;
      color: var(--muted);
      cursor: pointer;
      padding: 6px;
      border-radius: var(--radius-sm, 4px);
      display: flex;
      align-items: center;
      transition: background 0.15s, color 0.15s;
      flex-shrink: 0;

      .material-icons-round { font-size: 18px; }

      &:hover {
        color: var(--red);
        background: rgba(248, 113, 104, 0.12);
      }
    }

    /* ── Responsive ── */
    @media (max-width: 768px) {
      .sidebar {
        width: var(--sidebar-width-collapsed, 60px);
        min-width: var(--sidebar-width-collapsed, 60px);
      }

      .sidebar .nav-link {
        padding: 10px;
        justify-content: center;
        gap: 0;
      }

      .brand-name,
      .nav-label,
      .user-meta,
      .btn-logout { display: none; }

      .sidebar-footer { justify-content: center; }
      .user-chip { flex: unset; }
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
