import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="app-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="footer-logo">
            <span class="material-icons-round">view_kanban</span>
          </div>
          <span class="footer-name">Hello Trello</span>
        </div>
        <span class="footer-copy">© {{ currentYear }} Todos os direitos reservados</span>
        <div class="footer-version">
          <span class="version-chip">v1.0.0</span>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .app-footer {
      background: var(--bg2);
      border-top: 1px solid var(--border);
      flex-shrink: 0;
    }

    .footer-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 10px 24px;
    }

    .footer-brand {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .footer-logo {
      width: 22px;
      height: 22px;
      border-radius: var(--radius-sm, 5px);
      background: linear-gradient(135deg, var(--blue), var(--purple));
      display: flex;
      align-items: center;
      justify-content: center;

      .material-icons-round {
        font-size: 13px;
        color: #fff;
      }
    }

    .footer-name {
      font-size: 12px;
      font-weight: 600;
      color: var(--text);
      letter-spacing: -0.2px;
    }

    .footer-copy {
      font-size: 11px;
      color: var(--muted);
      text-align: center;
      flex: 1;
    }

    .footer-version {
      display: flex;
      align-items: center;
    }

    .version-chip {
      font-size: 10px;
      font-weight: 600;
      color: var(--muted);
      background: var(--bg3);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 2px 8px;
      letter-spacing: 0.3px;
    }

    @media (max-width: 600px) {
      .footer-inner { padding: 10px 16px; }
      .footer-version { display: none; }
      .footer-copy { text-align: right; }
    }
  `],
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
}
