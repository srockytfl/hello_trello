import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [FormsModule],
  template: `
    <!-- Header -->
    <header>
      <div class="logo">
        <span class="material-icons-round">check_circle</span>
        TODO List
      </div>
      <div class="header-right">
        <div class="stats">
          <span><span class="dot dot-pending"></span>{{ pendingCount() }} pendentes</span>
          <span><span class="dot dot-done"></span>{{ doneCount() }} concluídas</span>
        </div>
        <button class="btn-logout" (click)="logout()">
          <span class="material-icons-round">logout</span> Sair
        </button>
      </div>
    </header>

    <!-- Content -->
    <main>
      <div class="add-bar">
        <input type="text" [(ngModel)]="newText" placeholder="Nova tarefa..." (keyup.enter)="add()" autofocus />
        <button class="btn-add" (click)="add()" [disabled]="!newText.trim()">
          <span class="material-icons-round">add</span> Adicionar
        </button>
      </div>

      <div class="filters">
        @for (f of filters; track f.key) {
          <button class="filter-btn" [class.active]="filter() === f.key" (click)="filter.set(f.key)">
            {{ f.label }}
          </button>
        }
      </div>

      <div class="todo-list">
        @for (todo of filtered(); track todo.id) {
          <div class="todo-item" [class.done]="todo.done">
            <div class="checkbox" [class.checked]="todo.done" (click)="toggle(todo)">
              <span class="material-icons-round">check</span>
            </div>
            <span class="todo-text">{{ todo.text }}</span>
            <button class="btn-del" (click)="remove(todo.id)">
              <span class="material-icons-round">close</span>
            </button>
          </div>
        } @empty {
          <div class="empty">
            <span class="material-icons-round">inbox</span>
            <p>{{ emptyMessage() }}</p>
          </div>
        }
      </div>
    </main>
  `,
  styles: [`
    :host { display: flex; flex-direction: column; height: 100vh; }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      height: 48px;
      background: var(--bg2);
      border-bottom: 1px solid var(--border);
      flex-shrink: 0;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-bright);
      .material-icons-round { color: var(--blue); font-size: 20px; }
    }

    .header-right { display: flex; align-items: center; gap: 14px; }

    .stats {
      display: flex;
      gap: 14px;
      font-size: 12px;
      color: var(--muted);
      span { display: flex; align-items: center; gap: 5px; }
    }

    .dot { width: 7px; height: 7px; border-radius: 50%; }
    .dot-pending { background: var(--yellow); }
    .dot-done { background: var(--green); }

    .btn-logout {
      background: none;
      border: none;
      color: var(--muted);
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 3px;
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      .material-icons-round { font-size: 16px; }
      &:hover { color: var(--text-bright); background: var(--hover); }
    }

    main {
      flex: 1;
      max-width: 560px;
      width: 100%;
      margin: 0 auto;
      padding: 24px 16px;
      overflow-y: auto;
    }

    .add-bar {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;

      input {
        flex: 1;
        padding: 9px 12px;
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 3px;
        color: var(--text-bright);
        font-size: 13px;
        outline: none;
        &:focus { border-color: var(--blue); }
        &::placeholder { color: var(--muted); }
      }
    }

    .btn-add {
      padding: 0 14px;
      background: var(--blue);
      border: none;
      border-radius: 3px;
      color: white;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      .material-icons-round { font-size: 18px; }
      &:hover { background: var(--blue-dark); }
      &:disabled { opacity: 0.5; cursor: not-allowed; }
    }

    .filters {
      display: flex;
      gap: 4px;
      margin-bottom: 16px;
      border-bottom: 1px solid var(--border);
    }

    .filter-btn {
      padding: 8px 14px;
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      color: var(--muted);
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      &:hover { color: var(--text); }
      &.active { color: var(--text-bright); border-bottom-color: var(--blue); }
    }

    .todo-list { display: flex; flex-direction: column; gap: 2px; }

    .todo-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      background: var(--bg2);
      border: 1px solid transparent;
      border-radius: var(--radius);
      transition: background 0.15s;
      &:hover { background: var(--bg3); border-color: var(--border); }
    }

    .checkbox {
      width: 18px;
      height: 18px;
      border: 1px solid var(--muted);
      border-radius: 3px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      .material-icons-round { font-size: 14px; color: white; display: none; }
      &:hover { border-color: var(--blue); }
      &.checked {
        background: var(--blue);
        border-color: var(--blue);
        .material-icons-round { display: block; }
      }
    }

    .todo-text { flex: 1; font-size: 13px; line-height: 1.4; }

    .todo-item.done .todo-text {
      text-decoration: line-through;
      color: var(--muted);
    }

    .btn-del {
      background: none;
      border: none;
      color: var(--muted);
      cursor: pointer;
      padding: 2px;
      border-radius: 3px;
      display: flex;
      opacity: 0;
      .material-icons-round { font-size: 16px; }
      &:hover { color: var(--red); }
    }

    .todo-item:hover .btn-del { opacity: 1; }

    .empty {
      text-align: center;
      padding: 48px 16px;
      color: var(--muted);
      .material-icons-round { font-size: 36px; margin-bottom: 8px; opacity: 0.3; }
      p { font-size: 13px; }
    }
  `]
})
export class TodosComponent implements OnInit {
  todos = signal<any[]>([]);
  filter = signal('all');
  newText = '';
  filters = [
    { key: 'all', label: 'Todas' },
    { key: 'pending', label: 'Pendentes' },
    { key: 'done', label: 'Concluídas' },
  ];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem('user')) { this.router.navigate(['/login']); return; }
    this.load();
  }

  load() {
    this.api.getTodos().subscribe(todos => this.todos.set(todos));
  }

  filtered() {
    const f = this.filter();
    return this.todos().filter(t =>
      f === 'all' ? true : f === 'done' ? t.done : !t.done
    );
  }

  pendingCount() { return this.todos().filter(t => !t.done).length; }
  doneCount() { return this.todos().filter(t => t.done).length; }

  emptyMessage() {
    const f = this.filter();
    if (f === 'done') return 'Nenhuma tarefa concluída';
    if (f === 'pending') return 'Nenhuma tarefa pendente';
    return 'Adicione sua primeira tarefa!';
  }

  add() {
    if (!this.newText.trim()) return;
    this.api.addTodo(this.newText).subscribe(() => {
      this.newText = '';
      this.load();
    });
  }

  toggle(todo: any) {
    this.api.updateTodo(todo.id, { done: !todo.done }).subscribe(() => this.load());
  }

  remove(id: number) {
    this.api.deleteTodo(id).subscribe(() => this.load());
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
