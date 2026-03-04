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
        <div class="brand-logo" aria-hidden="true">
          <span class="material-icons-round">view_kanban</span>
        </div>
        @if (!collapsed()) {
          <div class="brand-text">
            <span class="brand-name">Hello Trello</span>
            <span class="brand-tagline">Task Manager</span>
          </div>
        }
        <button
          class="btn-collapse"
          (click)="toggleCollapse()"
          [title]="collapsed() ? 'Expandir menu' : 'Recolher menu'"
          [attr.aria-label]="collapsed() ? 'Expandir menu' : 'Recolher menu'"
          [attr.aria-expanded]="!collapsed()"
        >
          <span class="material-icons-round">{{ collapsed() ? 'menu_open' : 'menu' }}</span>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="sidebar-nav" aria-label="Menu principal">
        @if (!collapsed()) {
          <span class="nav-section-label">Navegação</span>
        }

        <a
          class="nav-link"
          routerLink="/todos"
          routerLinkActive="active"
          [title]="collapsed() ? 'Tarefas' : ''"
        >
          <div class="nav-icon-wrap">
            <span class="nav-icon material-icons-round">checklist_rtl</span>
          </div>
          @if (!collapsed()) {
            <span class="nav-label">Tarefas</span>
            <span class="nav-arrow material-icons-round" aria-hidden="true">chevron_right</span>
          }
        </a>

        <a
          class="nav-link"
          routerLink="/profile"
          routerLinkActive="active"
          [title]="collapsed() ? 'Perfil' : ''"
        >
          <div class="nav-icon-wrap">
            <span class="nav-icon material-icons-round">account_circle</span>
          </div>
          @if (!collapsed()) {
            <span class="nav-label">Meu Perfil</span>
            <span class="nav-arrow material-icons-round" aria-hidden="true">chevron_right</span>
          }
        </a>
      </nav>

      <!-- Spacer -->
      <div class="sidebar-spacer"></div>

      <!-- Divider -->
      <div class="sidebar-divider"></div>

      <!-- User Footer -->
      <div class="sidebar-footer" [class.collapsed]="collapsed()">
        <button class="user-chip" (click)="logout()" [title]="collapsed() ? 'Sair' : 'Clique para sair'" aria-label="Sair da conta">
          <div class="user-avatar">{{ initials() }}</div>
          @if (!collapsed()) {
            <div class="user-info">
              <span class="user-name">{{ userName() }}</span>
              <span class="user-role">Administrador</span>
            </div>
            <span class="logout-icon material-icons-round" aria-hidden="true">logout</span>
          }
        </button>
      </div>

    </aside>
  `,
  styles: [`
    .sidebar {
      width: var(--sidebar-width, 256px);
      min-width: var(--sidebar-width, 256px);
      height: 100vh;
      background: var(--sidebar-bg, #060c18);
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
      width: var(--sidebar-width-collapsed, 60px);
      min-width: var(--sidebar-width-collapsed, 60px);
    }

    /* ── Brand ── */
    .sidebar-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0 14px;
      height: var(--header-height, 62px);
      border-bottom: 1px solid var(--border);
      flex-shrink: 0;
    }

    .brand-logo {
      width: 34px;
      height: 34px;
      border-radius: var(--radius-md, 10px);
      background: linear-gradient(135deg, var(--blue) 0%, var(--purple) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 4px 16px rgba(255, 215, 0, 0.4);

      .material-icons-round {
        font-size: 20px;
        color: #fff;
      }
    }

    .brand-text {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1px;
      min-width: 0;
      overflow: hidden;
    }

    .brand-name {
      font-size: 14px;
      font-weight: 700;
      color: var(--text-bright);
      white-space: nowrap;
      overflow: hidden;
      letter-spacing: -0.3px;
    }

    .brand-tagline {
      font-size: 10px;
      font-weight: 500;
      color: var(--muted);
      white-space: nowrap;
      overflow: hidden;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .btn-collapse {
      background: none;
      border: none;
      color: var(--muted);
      cursor: pointer;
      padding: 5px;
      border-radius: var(--radius-sm, 5px);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-left: auto;
      transition: background var(--transition-fast), color var(--transition-fast);

      .material-icons-round { font-size: 20px; }

      &:hover {
        color: var(--text-bright);
        background: var(--hover);
      }
    }

    /* ── Navigation ── */
    .sidebar-nav {
      padding: 16px 10px 8px;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .nav-section-label {
      font-size: 10px;
      font-weight: 600;
      color: var(--muted);
      letter-spacing: 0.8px;
      text-transform: uppercase;
      padding: 0 8px 10px;
      display: block;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 10px;
      border-radius: var(--radius-md, 10px);
      color: var(--text);
      text-decoration: none;
      font-size: 13px;
      font-weight: 500;
      transition: background var(--transition-fast), color var(--transition-fast);
      white-space: nowrap;
      overflow: hidden;
      position: relative;

      &:hover {
        background: var(--hover);
        color: var(--text-bright);

        .nav-icon-wrap {
          background: rgba(255, 215, 0, 0.15);
        }

        .nav-arrow {
          opacity: 1;
          transform: translateX(2px);
        }
      }

      &.active {
        background: rgba(255, 215, 0, 0.12);
        color: var(--blue);

        .nav-icon-wrap {
          background: rgba(255, 215, 0, 0.2);
          .nav-icon { color: var(--blue); }
        }

        &::after {
          content: '';
          position: absolute;
          left: 0;
          top: 8px;
          bottom: 8px;
          width: 3px;
          background: var(--blue);
          border-radius: 0 3px 3px 0;
        }
      }
    }

    .nav-icon-wrap {
      width: 30px;
      height: 30px;
      border-radius: var(--radius-sm, 5px);
      background: var(--bg3);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background var(--transition-fast);
    }

    .nav-icon {
      font-size: 17px;
      color: var(--text);
      transition: color var(--transition-fast);
    }

    .nav-label { flex: 1; }

    .nav-arrow {
      font-size: 14px;
      color: var(--muted);
      opacity: 0;
      transform: translateX(0);
      transition: opacity var(--transition-fast), transform var(--transition-fast), color var(--transition-fast);
      flex-shrink: 0;
    }

    .sidebar.collapsed .nav-link {
      padding: 10px;
      justify-content: center;
      gap: 0;

      &::after { display: none; }

      .nav-icon-wrap {
        width: 36px;
        height: 36px;
        border-radius: var(--radius-md, 10px);
      }

      .nav-icon { font-size: 18px; }
    }

    /* ── Spacer ── */
    .sidebar-spacer {
      flex: 1;
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
      padding: 10px 10px;
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
      padding: 9px 10px;
      border-radius: var(--radius-md, 10px);
      background: var(--bg3);
      border: 1px solid var(--border);
      cursor: pointer;
      transition: background var(--transition-fast), border-color var(--transition-fast);
      text-align: left;
      overflow: hidden;

      &:hover {
        background: rgba(248, 113, 113, 0.08);
        border-color: rgba(248, 113, 113, 0.2);

        .logout-icon { color: var(--red); }
        .user-name { color: var(--red); }
      }
    }

    .sidebar-footer.collapsed .user-chip {
      width: auto;
      padding: 8px;
      justify-content: center;
    }

    .user-avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--blue), var(--purple));
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
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
      transition: color var(--transition-fast);
    }

    .user-role {
      font-size: 10px;
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
        width: var(--sidebar-width-collapsed, 60px);
        min-width: var(--sidebar-width-collapsed, 60px);
      }

      .sidebar .nav-link {
        padding: 10px;
        justify-content: center;
        gap: 0;
        &::after { display: none; }

        .nav-icon-wrap {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md, 10px);
        }
      }

      .sidebar-footer { display: flex; justify-content: center; }
      .sidebar-footer .user-chip { width: auto; padding: 8px; justify-content: center; }

      .brand-text,
      .brand-tagline,
      .nav-label,
      .nav-arrow,
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
