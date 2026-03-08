import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTodos, addTodo, updateTodo, deleteTodo } from '../services/api'
import type { Todo } from '../types'

type FilterKey = 'all' | 'pending' | 'done'

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'pending', label: 'Pendentes' },
  { key: 'done', label: 'Concluídas' },
]

export default function Todos() {
  const navigate = useNavigate()
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<FilterKey>('all')
  const [newText, setNewText] = useState('')

  useEffect(() => {
    if (!localStorage.getItem('user')) { navigate('/login'); return }
    load()
  }, [navigate])

  async function load() {
    const data = await getTodos()
    setTodos(data)
  }

  const filtered = useMemo(() => {
    return todos.filter(t =>
      filter === 'all' ? true : filter === 'done' ? t.done : !t.done
    )
  }, [todos, filter])

  const pendingCount = todos.filter(t => !t.done).length
  const doneCount = todos.filter(t => t.done).length

  function emptyMessage() {
    if (filter === 'done') return 'Nenhuma tarefa concluída'
    if (filter === 'pending') return 'Nenhuma tarefa pendente'
    return 'Adicione sua primeira tarefa!'
  }

  async function add() {
    if (!newText.trim()) return
    await addTodo(newText)
    setNewText('')
    load()
  }

  async function toggle(todo: Todo) {
    await updateTodo(todo.id, { done: !todo.done })
    load()
  }

  async function remove(id: number) {
    await deleteTodo(id)
    load()
  }

  function logout() {
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="todos-page">
      <header>
        <div className="logo">
          <span className="material-icons-round">check_circle</span>
          Rosa
        </div>
        <div className="header-right">
          <div className="stats">
            <span><span className="dot dot-pending"></span>{pendingCount} pendentes</span>
            <span><span className="dot dot-done"></span>{doneCount} concluídas</span>
          </div>
          <button className="btn-logout" onClick={logout}>
            <span className="material-icons-round">logout</span> Sair
          </button>
        </div>
      </header>

      <main>
        <div className="add-bar">
          <input
            type="text"
            value={newText}
            onChange={e => setNewText(e.target.value)}
            placeholder="Nova tarefa..."
            onKeyDown={e => e.key === 'Enter' && add()}
            autoFocus
          />
          <button className="btn-add" onClick={add} disabled={!newText.trim()}>
            <span className="material-icons-round">add</span> Adicionar
          </button>
        </div>

        <div className="filters">
          {filters.map(f => (
            <button
              key={f.key}
              className={`filter-btn${filter === f.key ? ' active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="todo-list">
          {filtered.length === 0 ? (
            <div className="empty">
              <span className="material-icons-round">inbox</span>
              <p>{emptyMessage()}</p>
            </div>
          ) : (
            filtered.map(todo => (
              <div key={todo.id} className={`todo-item${todo.done ? ' done' : ''}`}>
                <div
                  className={`checkbox${todo.done ? ' checked' : ''}`}
                  onClick={() => toggle(todo)}
                >
                  <span className="material-icons-round">check</span>
                </div>
                <span className="todo-text">{todo.text}</span>
                <button className="btn-del" onClick={() => remove(todo.id)}>
                  <span className="material-icons-round">close</span>
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
