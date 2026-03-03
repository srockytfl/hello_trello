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
    <!-- Top Bar -->
    <header class="topbar">
      <div class="topbar-brand">
        <div class="brand-icon">
          <span class="material-icons-round">checklist_rtl</span>
        </div>
        <div class="brand-text">
          <span class="brand-title">{{ titleService.appTitle() }}</span>
          <span class="brand-sub">Gerencie suas tarefas do dia</span>
        </div>
      </div>
      <div class="topbar-right">
        <app-user-avatar />
      </div>
    </header>

    <!-- Scrollable Main -->
    <main class="main-area">
      <div class="wrapper">

        <!-- Stats Row -->
        <div class="stats-row">
          <div class="stat-card stat-total">
            <span class="stat-icon material-icons-round">list_alt</span>
            <div class="stat-info">
              <span class="stat-val">{{ todos().length }}</span>
              <span class="stat-key">Total</span>
            </div>
          </div>
          <div class="stat-card stat-pending">
            <span class="stat-icon material-icons-round">pending_actions</span>
            <div class="stat-info">
              <span class="stat-val">{{ pendingCount() }}</span>
              <span class="stat-key">Pendentes</span>
            </div>
          </div>
          <div class="stat-card stat-done">
            <span class="stat-icon material-icons-round">task_alt</span>
            <div class="stat-info">
              <span class="stat-val">{{ doneCount() }}</span>
              <span class="stat-key">Concluídas</span>
            </div>
          </div>
          <div class="stat-card stat-progress">
            <div class="progress-circle">
              <span class="progress-pct">{{ progressPercent() }}%</span>
            </div>
            <div class="stat-info">
              <span class="stat-key stat-key-top">Progresso</span>
              <div class="inline-bar">
                <div class="inline-fill" [style.width.%]="progressPercent()"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Add Task -->
        <div class="add-block">
          <span class="material-icons-round add-icon">add_task</span>
          <input
            class="add-input"
            type="text"
            [(ngModel)]="newText"
            placeholder="Escreva uma nova tarefa..."
            (keyup.enter)="add()"
            autofocus
          />
          <button class="btn-add" (click)="add()" [disabled]="!newText.trim()">
            <span class="material-icons-round">add</span>
            <span class="btn-add-label">Adicionar</span>
          </button>
        </div>

        <!-- Filters -->
        <div class="filter-bar">
          @for (f of filters; track f.key) {
            <button
              class="filter-btn"
              [class.active]="filter() === f.key"
              (click)="filter.set(f.key)"
            >
              <span class="material-icons-round filter-icon">{{ f.icon }}</span>
              <span class="filter-label">{{ f.label }}</span>
              <span class="filter-count">{{ getCount(f.key) }}</span>
            </button>
          }
        </div>

        <!-- Task List -->
        <ul class="task-list" role="list">
          @for (todo of filtered(); track todo.id) {
            <li class="task-card" [class.done]="todo.done">
              <div class="task-side" [class.done]="todo.done"></div>
              <button
                class="task-toggle"
                [class.checked]="todo.done"
                (click)="toggle(todo)"
                [attr.aria-label]="todo.done ? 'Marcar como pendente' : 'Marcar como concluída'"
              >
                @if (todo.done) {
                  <span class="material-icons-round">check</span>
                }
              </button>
              <span class="task-text">{{ todo.text }}</span>
              @if (todo.done) {
                <span class="task-badge badge-done">
                  <span class="material-icons-round">task_alt</span>
                  Concluída
                </span>
              } @else {
                <span class="task-badge badge-pending">
                  <span class="material-icons-round">pending</span>
                  Pendente
                </span>
              }
              <button
                class="btn-remove"
                (click)="remove(todo.id)"
                aria-label="Remover tarefa"
              >
                <span class="material-icons-round">delete_outline</span>
              </button>
            </li>
          } @empty {
            <li class="empty-state" role="listitem">
              <div class="empty-icon-bg">
                <span class="material-icons-round">
                  {{ filter() === 'done' ? 'task_alt' : filter() === 'pending' ? 'pending_actions' : 'inbox' }}
                </span>
              </div>
              <p class="empty-title">{{ emptyTitle() }}</p>
              <p class="empty-sub">{{ emptyMessage() }}</p>
            </li>
          }
        </ul>

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

    /* ── Top Bar ── */
    .topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      height: var(--header-height, 62px);
      background: var(--bg2);
      border-bottom: 1px solid var(--border);
      flex-shrink: 0;
    }

    .topbar-brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .brand-icon {
      width: 38px;
      height: 38px;
      border-radius: var(--radius-md);
      background: linear-gradient(135deg, var(--blue) 0%, var(--purple) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 4px 14px rgba(91, 141, 238, 0.4);

      .material-icons-round {
        font-size: 20px;
        color: #fff;
      }
    }

    .brand-text {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }

    .brand-title {
      font-size: 15px;
      font-weight: 700;
      color: var(--text-bright);
      letter-spacing: -0.3px;
      line-height: 1.2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .brand-sub {
      font-size: 11px;
      color: var(--muted);
      line-height: 1.2;
      white-space: nowrap;
    }

    .topbar-right {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }

    /* ── Main Area ── */
    .main-area {
      flex: 1;
      overflow-y: auto;
      padding: 28px 24px;
      background: var(--bg);
    }

    .wrapper {
      max-width: 760px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    /* ── Stats Row ── */
    .stats-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }

    .stat-card {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 16px 18px;
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-card);
    }

    .stat-icon {
      font-size: 26px;
      flex-shrink: 0;
    }

    .stat-total  .stat-icon { color: var(--blue); }
    .stat-pending .stat-icon { color: var(--yellow); }
    .stat-done   .stat-icon { color: var(--green); }

    .stat-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }

    .stat-val {
      font-size: 22px;
      font-weight: 800;
      color: var(--text-bright);
      line-height: 1;
    }

    .stat-key {
      font-size: 10px;
      font-weight: 500;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
    }

    .stat-key-top {
      margin-bottom: 6px;
    }

    /* Progress stat */
    .stat-progress {
      gap: 12px;
    }

    .progress-circle {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(91, 141, 238, 0.12), rgba(52, 211, 153, 0.12));
      border: 2px solid var(--border-emphasis);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .progress-pct {
      font-size: 10px;
      font-weight: 800;
      color: var(--text-bright);
    }

    .inline-bar {
      width: 100%;
      height: 4px;
      background: var(--border-emphasis);
      border-radius: 2px;
      overflow: hidden;
    }

    .inline-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--blue), var(--green));
      border-radius: 2px;
      transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* ── Add Block ── */
    .add-block {
      display: flex;
      align-items: center;
      gap: 12px;
      background: var(--bg2);
      border: 1.5px solid var(--border-emphasis);
      border-radius: var(--radius-lg);
      padding: 6px 6px 6px 18px;
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
      padding: 10px 0;
      background: none;
      border: none;
      color: var(--text-bright);
      font-size: 14px;
      outline: none;
      min-width: 0;

      &::placeholder { color: var(--muted); }
    }

    .btn-add {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 10px 20px;
      background: var(--blue);
      color: #fff;
      border: none;
      border-radius: var(--radius-md);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      flex-shrink: 0;
      transition: background var(--transition-fast), box-shadow var(--transition-fast), transform var(--transition-fast);

      .material-icons-round { font-size: 18px; }

      &:hover:not(:disabled) {
        background: var(--blue-dark);
        box-shadow: 0 4px 14px rgba(91, 141, 238, 0.45);
      }

      &:active:not(:disabled) { transform: scale(0.97); }

      &:disabled {
        opacity: 0.35;
        cursor: not-allowed;
      }
    }

    /* ── Filter Bar ── */
    .filter-bar {
      display: flex;
      gap: 6px;
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 5px;
    }

    .filter-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 8px 12px;
      background: transparent;
      border: none;
      border-radius: var(--radius-md);
      color: var(--muted);
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: background var(--transition-fast), color var(--transition-fast);

      .filter-icon { font-size: 15px; }

      &:hover {
        background: var(--bg3);
        color: var(--text-bright);
      }

      &.active {
        background: rgba(91, 141, 238, 0.14);
        color: var(--blue);
        font-weight: 600;

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
      border-radius: 9px;
      font-size: 10px;
      font-weight: 700;
      color: var(--muted);
      transition: background var(--transition-fast), color var(--transition-fast);
    }

    /* ── Task List ── */
    .task-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 0;
      margin: 0;
    }

    .task-card {
      display: flex;
      align-items: center;
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-card);
      transition:
        border-color var(--transition-fast),
        box-shadow var(--transition-fast),
        transform var(--transition-fast);

      &:hover {
        border-color: var(--border-emphasis);
        box-shadow: 0 6px 24px rgba(0, 0, 0, 0.5);
        transform: translateY(-1px);

        .btn-remove { opacity: 1; }
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

    .task-side {
      width: 4px;
      align-self: stretch;
      background: linear-gradient(180deg, var(--blue), var(--purple));
      flex-shrink: 0;

      &.done {
        background: linear-gradient(180deg, var(--green), var(--teal));
      }
    }

    .task-toggle {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 2px solid var(--border-emphasis);
      background: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin: 0 14px;
      padding: 0;
      transition:
        background var(--transition-fast),
        border-color var(--transition-fast),
        transform var(--transition-fast),
        box-shadow var(--transition-fast);

      .material-icons-round { font-size: 13px; color: #fff; }

      &:hover {
        border-color: var(--blue);
        transform: scale(1.1);
        box-shadow: 0 0 0 3px rgba(91, 141, 238, 0.15);
      }

      &.checked {
        background: linear-gradient(135deg, var(--green), var(--teal));
        border-color: transparent;
        box-shadow: 0 2px 8px rgba(52, 211, 153, 0.3);
      }
    }

    .task-text {
      flex: 1;
      padding: 16px 10px 16px 0;
      font-size: 14px;
      line-height: 1.5;
      color: var(--text-bright);
      word-break: break-word;
      transition: color var(--transition-fast);
    }

    .task-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 10px;
      border-radius: 20px;
      font-size: 10px;
      font-weight: 600;
      white-space: nowrap;
      flex-shrink: 0;
      margin-right: 10px;
      opacity: 0;
      transition: opacity var(--transition-fast);

      .material-icons-round { font-size: 11px; }
    }

    .badge-done {
      background: rgba(52, 211, 153, 0.1);
      border: 1px solid rgba(52, 211, 153, 0.25);
      color: var(--green);
    }

    .badge-pending {
      background: rgba(251, 191, 36, 0.1);
      border: 1px solid rgba(251, 191, 36, 0.25);
      color: var(--yellow);
    }

    .btn-remove {
      background: none;
      border: none;
      color: var(--muted);
      cursor: pointer;
      padding: 10px 14px;
      display: flex;
      align-items: center;
      opacity: 0;
      transition: opacity var(--transition-fast), color var(--transition-fast), background var(--transition-fast);
      flex-shrink: 0;

      .material-icons-round { font-size: 18px; }

      &:hover {
        color: var(--red);
        background: rgba(248, 113, 113, 0.1);
        opacity: 1;
      }
    }

    /* ── Empty State ── */
    .empty-state {
      list-style: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 64px 24px;
      gap: 14px;
    }

    .empty-icon-bg {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: var(--bg2);
      border: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow-md);
      margin-bottom: 4px;

      .material-icons-round {
        font-size: 36px;
        color: var(--muted);
        opacity: 0.45;
      }
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
      line-height: 1.6;
    }

    /* ── Responsive ── */
    @media (max-width: 900px) {
      .stats-row {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .stats-row {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 600px) {
      .main-area { padding: 16px; }
      .topbar { padding: 0 16px; }
      .brand-sub { display: none; }
      .stats-row { grid-template-columns: repeat(2, 1fr); gap: 8px; }
      .stat-card { padding: 12px 14px; gap: 10px; }
      .stat-val { font-size: 18px; }
      .btn-add-label { display: none; }
      .btn-add { padding: 10px 12px; }
      .filter-label { display: none; }
      .filter-btn { gap: 4px; }
    }
  `]
})
export class TodosComponent implements OnInit {
  todos = signal<any[]>([]);
  filter = signal('all');
  newText = '';

  filters = [
    { key: 'all',     label: 'Todas',      icon: 'format_list_bulleted' },
    { key: 'pending', label: 'Pendentes',  icon: 'pending_actions'      },
    { key: 'done',    label: 'Concluídas', icon: 'task_alt'             },
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
