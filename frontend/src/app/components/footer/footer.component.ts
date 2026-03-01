import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="app-footer">
      <p class="footer-brand">Trelo by AI</p>
      <span>© {{ currentYear }} - Todos os direitos reservados</span>
    </footer>
  `,
  styles: [`
    .app-footer {
      width: 100%;
      padding: 12px 16px;
      text-align: center;
      background: #1e1e2e;
      color: #a0a0b0;
      font-size: 0.85rem;
      border-top: 1px solid #2e2e3e;
      box-sizing: border-box;
    }

    .footer-brand {
      margin: 0 0 4px;
      font-size: 0.95rem;
      font-weight: 600;
      color: #c0c0d0;
      letter-spacing: 0.03em;
    }
  `],
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
}
