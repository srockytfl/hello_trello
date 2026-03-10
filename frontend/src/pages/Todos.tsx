import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTodos, addTodo, updateTodo, deleteTodo } from '../services/api'
import type { Todo, TodoStatus } from '../types'
import './board.scss'

const COLUMNS: { key: TodoStatus; label: string; color: string }[] = [
  { key: 'todo', label: 'A Fazer', color: '#E91E63' },
  { key: 'doing', label: 'Em Andamento', color: '#FF9800' },
  { key: 'done', label: 'Concluído', color: '#4CAF50' },
]

export default function Todos() {
  const navigate = useNavigate()
  const [todos, setTodos] = useState<Todo[]>([])
  const [addingIn, setAddingIn] = useState<TodoStatus | null>(null)
  const [newText, setNewText] = useState('')
  const [dragId, setDragId] = useState<number | null>(null)

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

  function handleDrop(status: TodoStatus) {
    if (dragId === null) return
    handleMoveCard(dragId, status)
    setDragId(null)
  }

  function getUser(): string {
    try {
      const u = JSON.parse(localStorage.getItem('user') || '{}')
      return u.name || 'Usuário'
    } catch {
      return 'Usuário'
    }
  }

  function logout() {
    localStorage.removeItem('user')
    navigate('/login')
  }

  const columnTodos = (status: TodoStatus) => todos.filter(t => t.status === status)
  const totalCount = todos.length
  const doneCount = todos.filter(t => t.status === 'done').length

  return (
    <div className="board-page">
      {/* Header */}
      <header className="board-header">
        <div className="board-header__left">
          <div className="board-logo">
            <svg width="28" height="28" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <rect width="40" height="40" rx="8" fill="rgba(255,255,255,0.2)" />
              <rect x="6" y="6" width="11" height="26" rx="3" fill="white" />
              <rect x="23" y="6" width="11" height="17" rx="3" fill="white" />
            </svg>
            <span className="board-logo__name">FusionRun</span>
          </div>
          <span className="board-separator" aria-hidden="true">/</span>
          <span className="board-project-name">Meu Quadro</span>
        </div>
        <div className="board-header__right">
          <div className="board-progress">
            <span className="board-progress__text">{doneCount}/{totalCount} concluídas</span>
            <div className="board-progress__bar">
              <div
                className="board-progress__fill"
                style={{ width: totalCount > 0 ? `${(doneCount / totalCount) * 100}%` : '0%' }}
              />
            </div>
          </div>
          <div className="board-user">
            <span className="board-avatar">{getUser().charAt(0).toUpperCase()}</span>
            <span className="board-user__name">{getUser()}</span>
          </div>
          <button className="board-btn-logout" onClick={logout} title="Sair">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              <path d="M10 11l3-3-3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 8H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            Sair
          </button>
        </div>
      </header>

      {/* Board */}
      <main className="board-main">
        <div className="board-columns">
          {COLUMNS.map(col => (
            <div
              key={col.key}
              className="board-column"
              onDragOver={e => e.preventDefault()}
              onDrop={() => handleDrop(col.key)}
            >
              {/* Column header */}
              <div className="column-header">
                <div className="column-header__left">
                  <span
                    className="column-dot"
                    style={{ background: col.color }}
                    aria-hidden="true"
                  />
                  <span className="column-title">{col.label}</span>
                  <span className="column-count">{columnTodos(col.key).length}</span>
                </div>
                <button
                  className="column-add-btn"
                  onClick={() => { setAddingIn(col.key); setNewText('') }}
                  title={`Adicionar cartão em ${col.label}`}
                  aria-label={`Adicionar cartão em ${col.label}`}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Cards */}
              <div className="column-cards">
                {columnTodos(col.key).map(todo => (
                  <div
                    key={todo.id}
                    className={`board-card${todo.status === 'done' ? ' board-card--done' : ''}`}
                    draggable
                    onDragStart={() => handleDragStart(todo.id)}
                  >
                    <p className="board-card__text">{todo.text}</p>
                    <div className="board-card__footer">
                      <div className="card-move-btns">
                        {COLUMNS.filter(c => c.key !== col.key).map(target => (
                          <button
                            key={target.key}
                            className="card-move-btn"
                            onClick={() => handleMoveCard(todo.id, target.key)}
                            title={`Mover para ${target.label}`}
                            aria-label={`Mover para ${target.label}`}
                          >
                            <span className="card-move-dot" style={{ background: target.color }} />
                            {target.label}
                          </button>
                        ))}
                      </div>
                      <button
                        className="card-delete-btn"
                        onClick={() => handleDelete(todo.id)}
                        title="Excluir cartão"
                        aria-label="Excluir cartão"
                      >
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M2 2l9 9M11 2l-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add card form */}
                {addingIn === col.key ? (
                  <div className="board-card-new">
                    <textarea
                      className="card-new-input"
                      value={newText}
                      onChange={e => setNewText(e.target.value)}
                      placeholder="Título do cartão..."
                      rows={3}
                      autoFocus
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
                    <div className="card-new-actions">
                      <button
                        className="card-new-confirm"
                        onClick={() => handleAddCard(col.key)}
                      >
                        Adicionar
                      </button>
                      <button
                        className="card-new-cancel"
                        onClick={() => { setAddingIn(null); setNewText('') }}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    className="column-add-card-btn"
                    onClick={() => { setAddingIn(col.key); setNewText('') }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                    </svg>
                    Adicionar cartão
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
