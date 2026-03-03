import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { TitleService } from '../../services/title.service';
import { UserAvatarComponent } from '../../components/user-avatar/user-avatar.component';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [FormsModule, UserAvatarComponent],
  template: `
    <!-- Page Header -->
    <header class="page-header">
      <div class="header-left">
        <div class="page-icon">
          <span class="material-icons-round">check_circle_outline</span>
        </div>
        <div class="page-title-group">
          <h1 class="page-title">{{ titleService.appTitle() }}</h1>
          <div class="stats-row">
            <span class="stat-chip stat-pending">
              <span class="stat-dot"></span>
              {{ pendingCount() }} pendentes
            </span>
            <span class="stat-chip stat-done">
              <span class="stat-dot"></span>
              {{ doneCount() }} concluídas
            </span>
          </div>
        </div>
      </div>
      <div class="header-right">
        <app-user-avatar />
      </div>
    </header>

    <!-- Main Content -->
    <main class="content-area">

      <!-- Add Task Bar -->
      <div class="add-bar">
        <div class="add-input-wrap">
          <span class="material-icons-round add-icon">add_task</span>
          <input
            type="text"
            [(ngModel)]="newText"
            placeholder="Adicionar nova tarefa..."
            (keyup.enter)="add()"
            autofocus
            class="add-input"
          />
        </div>
        <button class="btn-add" (click)="add()" [disabled]="!newText.trim()">
          <span class="material-icons-round">add</span>
          Adicionar
        </button>
      </div>

      <!-- Filters -->
      <div class="filters-bar">
        @for (f of filters; track f.key) {
          <button
            class="filter-btn"
            [class.active]="filter() === f.key"
            (click)="filter.set(f.key)"
          >
            {{ f.label }}
            <span class="filter-count">{{ getCount(f.key) }}</span>
          </button>
        }
      </div>

      <!-- Task List -->
      <div class="task-list">
        @for (todo of filtered(); track todo.id) {
          <div class="task-card" [class.done]="todo.done">
            <div class="task-status-bar" [class.done]="todo.done"></div>
            <button
              class="task-check"
              [class.checked]="todo.done"
              (click)="toggle(todo)"
              [attr.aria-label]="todo.done ? 'Marcar como pendente' : 'Marcar como concluída'"
            >
              @if (todo.done) {
                <span class="material-icons-round">check</span>
              }
            </button>
            <span class="task-text">{{ todo.text }}</span>
            <button class="btn-del" (click)="remove(todo.id)" aria-label="Remover tarefa">
              <span class="material-icons-round">delete_outline</span>
            </button>
          </div>
        } @empty {
          <div class="empty-state">
            <div class="empty-icon-wrap">
              <span class="material-icons-round empty-icon">inbox</span>
            </div>
            <p class="empty-title">{{ emptyTitle() }}</p>
            <p class="empty-sub">{{ emptyMessage() }}</p>
          </div>
        }
      </div>

    </main>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: hidden;
      min-height: 0;
    }

    /* ── Page Header ── */
    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      height: var(--header-height, 56px);
      background: var(--bg2);
      border-bottom: 1px solid var(--border);
      flex-shrink: 0;
      gap: 12px;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }

    .page-icon {
      width: 34px;
      height: 34px;
      border-radius: var(--radius-md, 8px);
      background: linear-gradient(135deg, rgba(47, 129, 247, 0.2), rgba(47, 129, 247, 0.08));
      border: 1px solid rgba(47, 129, 247, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      .material-icons-round {
        font-size: 18px;
        color: var(--blue);
      }
    }

    .page-title-group {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }

    .page-title {
      font-size: 15px;
      font-weight: 700;
      color: var(--text-bright);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: -0.3px;
    }

    .stats-row {
      display: flex;
      gap: 10px;
    }

    .stat-chip {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 11px;
      font-weight: 500;
      color: var(--muted);
    }

    .stat-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }

    .stat-pending .stat-dot { background: var(--yellow); }
    .stat-done .stat-dot { background: var(--green); }

    .header-right {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }

    /* ── Content Area ── */
    .content-area {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
      background: var(--bg);
    }

    /* ── Add Bar ── */
    .add-bar {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .add-input-wrap {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: var(--radius-md, 8px);
      padding: 0 14px;
      transition: border-color var(--transition-base), box-shadow var(--transition-base);

      &:focus-within {
        border-color: var(--blue);
        box-shadow: var(--shadow-blue);
      }
    }

    .add-icon {
      font-size: 18px;
      color: var(--muted);
      flex-shrink: 0;
    }

    .add-input {
      flex: 1;
      padding: 12px 0;
      background: none;
      border: none;
      color: var(--text-bright);
      font-size: 13px;
      outline: none;

      &::placeholder { color: var(--muted); }
    }

    .btn-add {
      padding: 0 18px;
      height: 44px;
      background: var(--blue);
      border: none;
      border-radius: var(--radius-md, 8px);
      color: #fff;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
      transition: background var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast);

      .material-icons-round { font-size: 18px; }

      &:hover {
        background: var(--blue-dark);
        box-shadow: 0 4px 12px rgba(47, 129, 247, 0.4);
      }
      &:active { transform: scale(0.97); }
      &:disabled { opacity: 0.4; cursor: not-allowed; transform: none; box-shadow: none; }
    }

    /* ── Filters ── */
    .filters-bar {
      display: flex;
      gap: 6px;
      margin-bottom: 20px;
    }

    .filter-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: 20px;
      color: var(--muted);
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: background var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast);

      &:hover {
        color: var(--text-bright);
        background: var(--hover);
        border-color: var(--border-emphasis);
      }

      &.active {
        background: rgba(47, 129, 247, 0.12);
        border-color: rgba(47, 129, 247, 0.4);
        color: var(--blue);

        .filter-count { background: var(--blue); color: #fff; }
      }
    }

    .filter-count {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 18px;
      height: 18px;
      padding: 0 5px;
      background: var(--bg3);
      border-radius: 10px;
      font-size: 10px;
      font-weight: 700;
      color: var(--muted);
      transition: background var(--transition-fast), color var(--transition-fast);
    }

    /* ── Task List ── */
    .task-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .task-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 16px 0 0;
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: var(--radius-md, 8px);
      overflow: hidden;
      transition: border-color var(--transition-fast), box-shadow var(--transition-fast), transform var(--transition-fast);

      &:hover {
        border-color: var(--border-emphasis);
        box-shadow: var(--shadow-md);
        transform: translateY(-1px);

        .btn-del { opacity: 1; }
      }

      &.done {
        opacity: 0.6;
        .task-text {
          text-decoration: line-through;
          color: var(--muted);
        }
        .task-status-bar { background: var(--green); }
      }
    }

    .task-status-bar {
      width: 4px;
      align-self: stretch;
      background: var(--blue);
      flex-shrink: 0;
      border-radius: 0;
      transition: background var(--transition-base);

      &.done { background: var(--green); }
    }

    .task-check {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 2px solid var(--border-emphasis);
      background: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background var(--transition-fast), border-color var(--transition-fast), transform var(--transition-fast);
      padding: 0;
      margin-left: 12px;

      .material-icons-round { font-size: 12px; color: #fff; }

      &:hover {
        border-color: var(--blue);
        transform: scale(1.1);
      }

      &.checked {
        background: var(--green);
        border-color: var(--green);
      }
    }

    .task-text {
      flex: 1;
      padding: 14px 0;
      font-size: 13.5px;
      line-height: 1.5;
      color: var(--text-bright);
      word-break: break-word;
      transition: color var(--transition-fast);
    }

    .btn-del {
      background: none;
      border: none;
      color: var(--muted);
      cursor: pointer;
      padding: 5px;
      border-radius: var(--radius-sm, 4px);
      display: flex;
      align-items: center;
      opacity: 0;
      transition: opacity var(--transition-fast), color var(--transition-fast), background var(--transition-fast);
      flex-shrink: 0;

      .material-icons-round { font-size: 16px; }

      &:hover {
        color: var(--red);
        background: rgba(248, 81, 73, 0.1);
        opacity: 1;
      }
    }

    /* ── Empty State ── */
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 72px 16px;
      gap: 10px;
    }

    .empty-icon-wrap {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: var(--bg2);
      border: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;
    }

    .empty-icon {
      font-size: 32px;
      color: var(--muted);
      opacity: 0.5;
    }

    .empty-title {
      font-size: 15px;
      font-weight: 600;
      color: var(--text-bright);
    }

    .empty-sub {
      font-size: 12px;
      color: var(--muted);
      text-align: center;
      max-width: 260px;
    }

    /* ── Responsive ── */
    @media (max-width: 600px) {
      .content-area { padding: 16px; }
      .add-bar { flex-direction: column; }
      .btn-add { height: 42px; justify-content: center; }
      .page-header { padding: 0 16px; }
      .stats-row { display: none; }
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

  constructor(
    private api: ApiService,
    private router: Router,
    public titleService: TitleService,
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('user')) {
      this.router.navigate(['/login']);
      return;
    }
    this.load();
  }

  load(): void {
    this.api.getTodos().subscribe(todos => this.todos.set(todos));
  }

  filtered(): any[] {
    const f = this.filter();
    return this.todos().filter(t =>
      f === 'all' ? true : f === 'done' ? t.done : !t.done,
    );
  }

  getCount(key: string): number {
    if (key === 'all') return this.todos().length;
    if (key === 'done') return this.todos().filter(t => t.done).length;
    return this.todos().filter(t => !t.done).length;
  }

  pendingCount(): number { return this.todos().filter(t => !t.done).length; }
  doneCount(): number    { return this.todos().filter(t =>  t.done).length; }

  emptyTitle(): string {
    const f = this.filter();
    if (f === 'done')    return 'Nenhuma tarefa concluída';
    if (f === 'pending') return 'Nenhuma tarefa pendente';
    return 'Nenhuma tarefa por aqui';
  }

  emptyMessage(): string {
    const f = this.filter();
    if (f === 'all') return 'Adicione sua primeira tarefa usando o campo acima.';
    return 'Tente mudar o filtro ou adicionar novas tarefas.';
  }

  add(): void {
    if (!this.newText.trim()) return;
    this.api.addTodo(this.newText).subscribe(() => {
      this.newText = '';
      this.load();
    });
  }

  toggle(todo: any): void {
    this.api.updateTodo(todo.id, { done: !todo.done }).subscribe(() => this.load());
  }

  remove(id: number): void {
    this.api.deleteTodo(id).subscribe(() => this.load());
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
