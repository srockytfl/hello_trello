import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTodos, addTodo, updateTodo, deleteTodo } from '../services/api'
import type { Todo, TodoStatus } from '../types'
import './board.scss'

const COLUMNS: { key: TodoStatus; label: string; color: string; accentColor: string }[] = [
  { key: 'todo', label: 'A Fazer', color: '#E91E63', accentColor: '#FCE4EC' },
  { key: 'doing', label: 'Em Andamento', color: '#FF6B00', accentColor: '#FFF3E0' },
  { key: 'done', label: 'Concluido', color: '#00C48C', accentColor: '#E8F5E9' },
]

export default function Todos() {
  const navigate = useNavigate()
  const [todos, setTodos] = useState<Todo[]>([])
  const [addingIn, setAddingIn] = useState<TodoStatus | null>(null)
  const [newText, setNewText] = useState('')
  const [dragId, setDragId] = useState<number | null>(null)
  const [dragOverCol, setDragOverCol] = useState<TodoStatus | null>(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const data = await getTodos()
    setTodos(data)
  }

  async function handleAddCard(status: TodoStatus) {
    if (!newText.trim()) {
      setAddingIn(null)
      return
    }
    await addTodo(newText.trim(), status)
    setNewText('')
    setAddingIn(null)
    load()
  }

  async function handleMoveCard(id: number, newStatus: TodoStatus) {
    await updateTodo(id, { status: newStatus })
    load()
  }

  async function handleDelete(id: number) {
    await deleteTodo(id)
    load()
  }

  function handleDragStart(id: number) {
    setDragId(id)
  }

  function handleDragEnd() {
    setDragId(null)
    setDragOverCol(null)
  }

  function handleDragOver(e: React.DragEvent, status: TodoStatus) {
    e.preventDefault()
    setDragOverCol(status)
  }

  function handleDrop(status: TodoStatus) {
    if (dragId === null) return
    handleMoveCard(dragId, status)
    setDragId(null)
    setDragOverCol(null)
  }

  function getUser(): string {
    try {
      const u = JSON.parse(localStorage.getItem('user') || '{}')
      return u.name || 'Usuario'
    } catch {
      return 'Usuario'
    }
  }

  function getUserInitials(): string {
    const name = getUser()
    return name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  function logout() {
    localStorage.removeItem('user')
    navigate('/login')
  }

  const columnTodos = (status: TodoStatus) => todos.filter(t => t.status === status)
  const totalCount = todos.length
  const doneCount = todos.filter(t => t.status === 'done').length
  const progressPercent = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0

  return (
    <div className="board-page">
      {/* Header */}
      <header className="board-header" role="banner">
        <div className="board-header__left">
          <div className="board-logo" aria-label="FusionRun">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false">
              <rect width="40" height="40" rx="10" fill="rgba(255,255,255,0.18)" />
              <rect x="6" y="6" width="11" height="26" rx="3" fill="white" />
              <rect x="23" y="6" width="11" height="17" rx="3" fill="white" />
            </svg>
            <span className="board-logo__name">FusionRun</span>
          </div>
          <span className="board-separator" aria-hidden="true">/</span>
          <span className="board-project-name">Meu Quadro</span>
        </div>

        <div className="board-header__right">
          <div className="board-progress" aria-label={`Progresso: ${doneCount} de ${totalCount} concluidas`}>
            <span className="board-progress__label">{progressPercent}%</span>
            <div className="board-progress__track" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
              <div
                className="board-progress__fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="board-progress__text">{doneCount}/{totalCount}</span>
          </div>

          <div className="board-user-group">
            <div className="board-avatar" aria-hidden="true" title={getUser()}>
              {getUserInitials()}
            </div>
            <span className="board-user__name">{getUser()}</span>
          </div>

          <button className="board-btn-logout" onClick={logout} title="Sair da conta" aria-label="Sair da conta">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <path d="M5.5 2H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              <path d="M9.5 10.5l3-3-3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12.5 7.5H5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <span className="board-btn-logout__label">Sair</span>
          </button>
        </div>
      </header>

      {/* Board */}
      <main className="board-main" role="main">
        <div className="board-columns" role="list" aria-label="Colunas do quadro Kanban">
          {COLUMNS.map(col => {
            const colTodos = columnTodos(col.key)
            const isDragOver = dragOverCol === col.key

            return (
              <div
                key={col.key}
                className={`board-column${isDragOver ? ' board-column--drag-over' : ''}`}
                role="listitem"
                aria-label={`Coluna ${col.label}, ${colTodos.length} ${colTodos.length === 1 ? 'cartao' : 'cartoes'}`}
                onDragOver={e => handleDragOver(e, col.key)}
                onDragLeave={() => setDragOverCol(null)}
                onDrop={() => handleDrop(col.key)}
              >
                {/* Column header */}
                <div className="column-header">
                  <div className="column-header__meta">
                    <span
                      className="column-status-dot"
                      style={{ background: col.color }}
                      aria-hidden="true"
                    />
                    <h2 className="column-title">{col.label}</h2>
                    <span
                      className="column-count"
                      style={{ background: col.accentColor, color: col.color }}
                      aria-label={`${colTodos.length} cartoes`}
                    >
                      {colTodos.length}
                    </span>
                  </div>
                  <button
                    className="column-add-btn"
                    onClick={() => { setAddingIn(col.key); setNewText('') }}
                    title={`Adicionar cartao em ${col.label}`}
                    aria-label={`Adicionar cartao em ${col.label}`}
                  >
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                      <path d="M6.5 2v9M2 6.5h9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>

                {/* Divider line with column color */}
                <div className="column-divider" style={{ background: col.color }} aria-hidden="true" />

                {/* Cards */}
                <div className="column-cards" role="list" aria-label={`Cartoes em ${col.label}`}>
                  {colTodos.map(todo => (
                    <KanbanCard
                      key={todo.id}
                      todo={todo}
                      col={col}
                      columns={COLUMNS}
                      isDragging={dragId === todo.id}
                      onDragStart={() => handleDragStart(todo.id)}
                      onDragEnd={handleDragEnd}
                      onMove={handleMoveCard}
                      onDelete={handleDelete}
                    />
                  ))}

                  {/* Empty state */}
                  {colTodos.length === 0 && addingIn !== col.key && (
                    <div className="column-empty" aria-label="Nenhum cartao nesta coluna">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                        <rect x="4" y="4" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2"/>
                        <path d="M14 10v8M10 14h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      <span>Arraste cartoes aqui</span>
                    </div>
                  )}

                  {/* Add card inline form */}
                  {addingIn === col.key && (
                    <div className="card-new" role="form" aria-label="Novo cartao">
                      <textarea
                        className="card-new__input"
                        value={newText}
                        onChange={e => setNewText(e.target.value)}
                        placeholder="Titulo do cartao..."
                        rows={3}
                        autoFocus
                        aria-label="Titulo do novo cartao"
                        onKeyDown={e => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            handleAddCard(col.key)
                          }
                          if (e.key === 'Escape') {
                            setAddingIn(null)
                            setNewText('')
                          }
                        }}
                      />
                      <div className="card-new__actions">
                        <button
                          className="card-new__confirm"
                          onClick={() => handleAddCard(col.key)}
                          aria-label="Confirmar adicao do cartao"
                        >
                          Adicionar cartao
                        </button>
                        <button
                          className="card-new__cancel"
                          onClick={() => { setAddingIn(null); setNewText('') }}
                          title="Cancelar"
                          aria-label="Cancelar adicao do cartao"
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Add card button at bottom */}
                  {addingIn !== col.key && (
                    <button
                      className="column-add-card-btn"
                      onClick={() => { setAddingIn(col.key); setNewText('') }}
                      aria-label={`Adicionar cartao em ${col.label}`}
                    >
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                        <path d="M6.5 2v9M2 6.5h9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                      </svg>
                      Adicionar cartao
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}

// ── KanbanCard component ───────────────────────────────────────────────────────

interface KanbanCardProps {
  todo: Todo
  col: { key: TodoStatus; label: string; color: string; accentColor: string }
  columns: { key: TodoStatus; label: string; color: string; accentColor: string }[]
  isDragging: boolean
  onDragStart: () => void
  onDragEnd: () => void
  onMove: (id: number, newStatus: TodoStatus) => void
  onDelete: (id: number) => void
}

function KanbanCard({
  todo,
  col,
  columns,
  isDragging,
  onDragStart,
  onDragEnd,
  onMove,
  onDelete,
}: KanbanCardProps) {
  const isDone = todo.status === 'done'
  const otherCols = columns.filter(c => c.key !== col.key)

  return (
    <article
      className={`kanban-card${isDone ? ' kanban-card--done' : ''}${isDragging ? ' kanban-card--dragging' : ''}`}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      role="listitem"
      aria-label={`Cartao: ${todo.text}${isDone ? ', concluido' : ''}`}
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Delete') onDelete(todo.id)
      }}
    >
      {/* Top accent bar */}
      <div
        className="kanban-card__accent"
        style={{ background: col.color }}
        aria-hidden="true"
      />

      {/* Card body */}
      <div className="kanban-card__body">
        {/* Status tag */}
        <span
          className="kanban-card__tag"
          style={{
            background: col.accentColor,
            color: col.color,
            border: `1px solid ${col.color}33`,
          }}
          aria-label={`Status: ${col.label}`}
        >
          {col.label}
        </span>

        {/* Title */}
        <p className={`kanban-card__title${isDone ? ' kanban-card__title--done' : ''}`}>
          {todo.text}
        </p>

        {/* Footer */}
        <div className="kanban-card__footer">
          {/* Move actions */}
          <div className="kanban-card__moves" role="group" aria-label="Mover cartao para">
            {otherCols.map(target => (
              <button
                key={target.key}
                className="kanban-card__move-btn"
                onClick={() => onMove(todo.id, target.key)}
                title={`Mover para ${target.label}`}
                aria-label={`Mover para ${target.label}`}
                style={{ '--move-color': target.color } as React.CSSProperties}
              >
                <span
                  className="kanban-card__move-dot"
                  style={{ background: target.color }}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>

          {/* Right side: drag hint + delete */}
          <div className="kanban-card__actions">
            <span className="kanban-card__drag-hint" aria-hidden="true" title="Arrastar">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="4" cy="3" r="1" fill="currentColor"/>
                <circle cx="8" cy="3" r="1" fill="currentColor"/>
                <circle cx="4" cy="6" r="1" fill="currentColor"/>
                <circle cx="8" cy="6" r="1" fill="currentColor"/>
                <circle cx="4" cy="9" r="1" fill="currentColor"/>
                <circle cx="8" cy="9" r="1" fill="currentColor"/>
              </svg>
            </span>
            <button
              className="kanban-card__delete-btn"
              onClick={() => onDelete(todo.id)}
              title="Excluir cartao"
              aria-label={`Excluir cartao: ${todo.text}`}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M1.5 1.5l9 9M10.5 1.5l-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
