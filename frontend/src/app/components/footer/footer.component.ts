import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="app-footer">
      <span class="footer-brand">Hello Trello</span>
      <span class="footer-sep">•</span>
      <span class="footer-copy">© {{ currentYear }} Todos os direitos reservados</span>
    </footer>
  `,
  styles: [`
    .app-footer {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 16px;
      background: var(--bg2);
      border-top: 1px solid var(--border);
      font-size: 11px;
      color: var(--muted);
      flex-shrink: 0;
    }

    .footer-brand {
      font-weight: 600;
      color: var(--text);
      letter-spacing: 0.2px;
    }

    .footer-sep {
      opacity: 0.4;
    }
  `],
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
}
