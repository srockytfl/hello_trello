import { Component, OnInit, signal, computed } from '@angular/core';
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
      <div class="header-inner">
        <div class="header-left">
          <div class="page-icon">
            <span class="material-icons-round">checklist_rtl</span>
          </div>
          <div class="page-title-group">
            <h1 class="page-title">{{ titleService.appTitle() }}</h1>
            <p class="page-subtitle">Gerencie suas tarefas do dia</p>
          </div>
        </div>

        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-value stat-pending-val">{{ pendingCount() }}</span>
            <span class="stat-label">Pendentes</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value stat-done-val">{{ doneCount() }}</span>
            <span class="stat-label">Concluídas</span>
          </div>
        </div>

        <div class="header-right">
          <app-user-avatar />
        </div>
      </div>

      <!-- Progress Bar -->
      @if (todos().length > 0) {
        <div
          class="progress-bar-wrap"
          role="progressbar"
          [attr.aria-valuenow]="progressPercent()"
          aria-valuemin="0"
          aria-valuemax="100"
          [attr.aria-label]="progressPercent() + '% das tarefas concluídas'"
        >
          <div
            class="progress-bar-fill"
            [style.width.%]="progressPercent()"
          ></div>
        </div>
      }
    </header>

    <!-- Main Content -->
    <main class="content-area">

      <!-- Add Task Bar -->
      <div class="add-section">
        <div class="add-input-wrap">
          <span class="material-icons-round add-icon" aria-hidden="true">edit_note</span>
          <input
            type="text"
            [(ngModel)]="newText"
            placeholder="Escreva uma nova tarefa..."
            aria-label="Nova tarefa"
            (keyup.enter)="add()"
            autofocus
            class="add-input"
          />
          <button class="btn-add" (click)="add()" [disabled]="!newText.trim()" aria-label="Adicionar tarefa">
            <span class="material-icons-round" aria-hidden="true">add</span>
            <span class="btn-add-label">Adicionar</span>
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="filters-bar">
        @for (f of filters; track f.key) {
          <button
            class="filter-btn"
            [class.active]="filter() === f.key"
            (click)="filter.set(f.key)"
          >
            <span class="filter-icon material-icons-round" aria-hidden="true">{{ f.icon }}</span>
            {{ f.label }}
            <span class="filter-count">{{ getCount(f.key) }}</span>
          </button>
        }
      </div>

      <!-- Task List -->
      <div class="task-list">
        @for (todo of filtered(); track todo.id) {
          <div class="task-card" [class.done]="todo.done">
            <div class="task-accent" [class.done]="todo.done"></div>
            <button
              class="task-check"
              [class.checked]="todo.done"
              (click)="toggle(todo)"
              [attr.aria-label]="todo.done ? 'Marcar como pendente' : 'Marcar como concluída'"
            >
              @if (todo.done) {
                <span class="material-icons-round check-icon">check</span>
              }
            </button>
            <div class="task-content">
              <span class="task-text">{{ todo.text }}</span>
              @if (todo.done) {
                <span class="task-badge done-badge">
                  <span class="material-icons-round" aria-hidden="true">task_alt</span>
                  Concluída
                </span>
              } @else {
                <span class="task-badge pending-badge">
                  <span class="material-icons-round" aria-hidden="true">pending</span>
                  Pendente
                </span>
              }
            </div>
            <button class="btn-del" (click)="remove(todo.id)" aria-label="Remover tarefa">
              <span class="material-icons-round">delete_outline</span>
            </button>
          </div>
        } @empty {
          <div class="empty-state">
            <div class="empty-icon-wrap">
              <span class="material-icons-round empty-icon" aria-hidden="true">
                {{ filter() === 'done' ? 'task_alt' : filter() === 'pending' ? 'pending_actions' : 'inbox' }}
              </span>
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
      background: var(--bg2);
      border-bottom: 1px solid var(--border);
      flex-shrink: 0;
    }

    .header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      height: var(--header-height, 62px);
      gap: 16px;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
      flex: 1;
    }

    .page-icon {
      width: 38px;
      height: 38px;
      border-radius: var(--radius-md, 10px);
      background: linear-gradient(135deg, rgba(255, 149, 0, 0.2), rgba(167, 139, 250, 0.12));
      border: 1px solid rgba(255, 149, 0, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      .material-icons-round {
        font-size: 20px;
        color: var(--blue);
      }
    }

    .page-title-group {
      display: flex;
      flex-direction: column;
      gap: 1px;
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

    .page-subtitle {
      font-size: 11px;
      color: var(--muted);
      white-space: nowrap;
    }

    .header-stats {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 8px 20px;
      background: var(--bg3);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg, 14px);
      flex-shrink: 0;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }

    .stat-value {
      font-size: 18px;
      font-weight: 700;
      line-height: 1;
    }

    .stat-pending-val { color: var(--yellow); }
    .stat-done-val    { color: var(--green); }

    .stat-label {
      font-size: 10px;
      color: var(--muted);
      font-weight: 500;
      white-space: nowrap;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .stat-divider {
      width: 1px;
      height: 28px;
      background: var(--border-emphasis);
      flex-shrink: 0;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }

    /* ── Progress Bar ── */
    .progress-bar-wrap {
      height: 3px;
      background: var(--border);
      overflow: hidden;
    }

    .progress-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--blue), var(--green));
      transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      border-radius: 0 2px 2px 0;
    }

    /* ── Content Area ── */
    .content-area {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
      background: var(--bg);
    }

    /* ── Add Section ── */
    .add-section {
      margin-bottom: 20px;
    }

    .add-input-wrap {
      display: flex;
      align-items: center;
      gap: 12px;
      background: var(--bg2);
      border: 1.5px solid var(--border-emphasis);
      border-radius: var(--radius-lg, 14px);
      padding: 0 6px 0 16px;
      transition: border-color var(--transition-base), box-shadow var(--transition-base);

      &:focus-within {
        border-color: var(--blue);
        box-shadow: var(--shadow-blue);
      }
    }

    .add-icon {
      font-size: 20px;
      color: var(--muted);
      flex-shrink: 0;
    }

    .add-input {
      flex: 1;
      padding: 14px 0;
      background: none;
      border: none;
      color: var(--text-bright);
      font-size: 14px;
      outline: none;

      &::placeholder { color: var(--muted); }
    }

    .btn-add {
      padding: 0 18px;
      height: 38px;
      background: var(--blue);
      border: none;
      border-radius: var(--radius-md, 10px);
      color: #fff;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
      flex-shrink: 0;
      transition: background var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast);

      .material-icons-round { font-size: 18px; }

      &:hover {
        background: var(--blue-dark);
        box-shadow: 0 4px 16px rgba(255, 149, 0, 0.45);
      }
      &:active { transform: scale(0.97); }
      &:disabled {
        opacity: 0.35;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
      }
    }

    /* ── Filters ── */
    .filters-bar {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
    }

    .filter-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 7px 14px;
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg, 14px);
      color: var(--muted);
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: background var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast);

      .filter-icon { font-size: 14px; }

      &:hover {
        color: var(--text-bright);
        background: var(--hover);
        border-color: var(--border-emphasis);
      }

      &.active {
        background: rgba(255, 149, 0, 0.12);
        border-color: rgba(255, 149, 0, 0.35);
        color: var(--blue);

        .filter-count {
          background: var(--blue);
          color: #fff;
        }
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
      gap: 10px;
    }

    .task-card {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 0 16px 0 0;
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg, 14px);
      overflow: hidden;
      transition:
        border-color var(--transition-fast),
        box-shadow var(--transition-fast),
        transform var(--transition-fast);
      box-shadow: var(--shadow-card);

      &:hover {
        border-color: var(--border-emphasis);
        box-shadow: 0 6px 24px rgba(0, 0, 0, 0.5);
        transform: translateY(-2px);

        .btn-del { opacity: 1; }
        .task-badge { opacity: 1; }
      }

      &.done {
        opacity: 0.65;

        .task-text {
          text-decoration: line-through;
          color: var(--muted);
        }
      }
    }

    .task-accent {
      width: 5px;
      align-self: stretch;
      background: linear-gradient(180deg, var(--blue), var(--purple));
      flex-shrink: 0;
      border-radius: 0;
      transition: background var(--transition-base);

      &.done {
        background: linear-gradient(180deg, var(--green), var(--teal));
      }
    }

    .task-check {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid var(--border-emphasis);
      background: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition:
        background var(--transition-fast),
        border-color var(--transition-fast),
        transform var(--transition-fast),
        box-shadow var(--transition-fast);
      padding: 0;
      margin-left: 14px;

      .check-icon { font-size: 12px; color: #fff; }

      &:hover {
        border-color: var(--blue);
        transform: scale(1.15);
        box-shadow: 0 0 0 3px rgba(255, 149, 0, 0.15);
      }

      &.checked {
        background: linear-gradient(135deg, var(--green), var(--teal));
        border-color: transparent;
        box-shadow: 0 2px 8px rgba(52, 211, 153, 0.3);
      }
    }

    .task-content {
      flex: 1;
      padding: 16px 0;
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }

    .task-text {
      flex: 1;
      font-size: 14px;
      line-height: 1.4;
      color: var(--text-bright);
      word-break: break-word;
      transition: color var(--transition-fast);
    }

    .task-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 8px;
      border-radius: 20px;
      font-size: 10px;
      font-weight: 600;
      white-space: nowrap;
      flex-shrink: 0;
      opacity: 0;
      transition: opacity var(--transition-fast);

      .material-icons-round { font-size: 12px; }
    }

    .done-badge {
      background: rgba(52, 211, 153, 0.12);
      border: 1px solid rgba(52, 211, 153, 0.25);
      color: var(--green);
    }

    .pending-badge {
      background: rgba(251, 191, 36, 0.1);
      border: 1px solid rgba(251, 191, 36, 0.25);
      color: var(--yellow);
    }

    .btn-del {
      background: none;
      border: none;
      color: var(--muted);
      cursor: pointer;
      padding: 6px;
      border-radius: var(--radius-md, 10px);
      display: flex;
      align-items: center;
      opacity: 0;
      transition: opacity var(--transition-fast), color var(--transition-fast), background var(--transition-fast);
      flex-shrink: 0;

      .material-icons-round { font-size: 18px; }

      &:hover {
        color: var(--red);
        background: rgba(248, 113, 113, 0.12);
        opacity: 1;
      }
    }

    /* ── Empty State ── */
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 72px 16px;
      gap: 12px;
    }

    .empty-icon-wrap {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: var(--bg2);
      border: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 4px;
      box-shadow: var(--shadow-md);
    }

    .empty-icon {
      font-size: 36px;
      color: var(--muted);
      opacity: 0.5;
    }

    .empty-title {
      font-size: 16px;
      font-weight: 700;
      color: var(--text-bright);
      letter-spacing: -0.2px;
    }

    .empty-sub {
      font-size: 13px;
      color: var(--muted);
      text-align: center;
      max-width: 280px;
      line-height: 1.5;
    }

    /* ── Responsive ── */
    @media (max-width: 768px) {
      .header-stats { display: none; }
    }

    @media (max-width: 600px) {
      .content-area { padding: 16px; }
      .header-inner { padding: 0 16px; }
      .add-input-wrap { border-radius: var(--radius-md, 10px); }
      .btn-add-label { display: none; }
      .btn-add {
        padding: 0 12px;
        .material-icons-round { font-size: 20px; }
      }
      .page-subtitle { display: none; }
    }
  `]
})
export class TodosComponent implements OnInit {
  todos = signal<any[]>([]);
  filter = signal('all');
  newText = '';

  filters = [
    { key: 'all',     label: 'Todas',     icon: 'format_list_bulleted' },
    { key: 'pending', label: 'Pendentes', icon: 'pending_actions'      },
    { key: 'done',    label: 'Concluídas',icon: 'task_alt'             },
  ];

  progressPercent = computed(() => {
    const total = this.todos().length;
    if (total === 0) return 0;
    return Math.round((this.todos().filter(t => t.done).length / total) * 100);
  });

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
    if (key === 'all')     return this.todos().length;
    if (key === 'done')    return this.todos().filter(t =>  t.done).length;
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
