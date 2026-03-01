import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class TitleService {
  appTitle = signal('Hello Github');

  constructor(private api: ApiService) {
    this.load();
  }

  load() {
    this.api.getTitle().subscribe({
      next: (res) => this.appTitle.set(res.title),
      error: () => this.appTitle.set('Hello Github'),
    });
  }
}
