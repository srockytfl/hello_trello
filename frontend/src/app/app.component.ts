import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, SidebarComponent],
  template: `
    @if (showShell()) {
      <div class="app-shell">
        <app-sidebar />
        <div class="app-main">
          <router-outlet />
          <app-footer />
        </div>
      </div>
    } @else {
      <router-outlet />
    }
  `,
  styles: [`
    .app-shell {
      display: flex;
      height: 100vh;
      overflow: hidden;
    }

    .app-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      min-width: 0;
    }
  `],
})
export class AppComponent implements OnInit {
  showShell = signal(false);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateShell(this.router.url);

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.updateShell((e as NavigationEnd).urlAfterRedirects);
      });
  }

  private updateShell(url: string): void {
    const isLogin = url === '/' || url.startsWith('/login');
    this.showShell.set(!isLogin);
  }
}
