import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="app-footer">
      <div class="footer-inner">
        <span class="footer-logo">
          <span class="material-icons-round logo-icon">view_kanban</span>
          <span class="footer-brand">Hello Trello</span>
        </span>
        <span class="footer-sep">·</span>
        <span class="footer-copy">© {{ currentYear }} Todos os direitos reservados</span>
      </div>
    </footer>
  `,
  styles: [`
    .app-footer {
      background: var(--bg);
      border-top: 1px solid var(--border);
      flex-shrink: 0;
    }

    .footer-inner {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 10px 16px;
    }

    .footer-logo {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .logo-icon {
      font-size: 14px;
      color: var(--blue);
    }

    .footer-brand {
      font-size: 12px;
      font-weight: 600;
      color: var(--text);
      letter-spacing: -0.2px;
    }

    .footer-sep {
      color: var(--border-emphasis);
      font-size: 14px;
    }

    .footer-copy {
      font-size: 11px;
      color: var(--muted);
    }
  `],
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
}
