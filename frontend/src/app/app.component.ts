import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class AppComponent implements OnInit {
  constructor(private titleService: Title, private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getConfig().subscribe({
      next: (config) => this.titleService.setTitle(config.title),
      error: () => this.titleService.setTitle('Teste 1'),
    });
  }
}
