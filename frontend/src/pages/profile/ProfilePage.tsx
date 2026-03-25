import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from '../../services/api'
import type { UserProfile } from '../../types'
import '../board.scss'
import './profile.scss'

export function getInitials(name: string): string {
  const trimmed = name.trim()
  if (!trimmed) return '?'
  const parts = trimmed.split(' ').filter(Boolean)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return parts[0].slice(0, 2).toUpperCase()
}

export default function ProfilePage() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [editName, setEditName] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [saveError, setSaveError] = useState('')
  const [saving, setSaving] = useState(false)

  function loadFromStorage() {
    const raw = localStorage.getItem('user')
    if (!raw) {
      navigate('/login', { replace: true })
      return
    }
    try {
      const user: UserProfile = JSON.parse(raw)
      setProfile(user)
      setLoadError('')
    } catch {
      setLoadError('Não foi possível carregar os dados do perfil.')
    }
  }

  useEffect(() => {
    loadFromStorage()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function handleEdit() {
    if (!profile) return
    setEditName(profile.name)
    setSaveError('')
    setIsEditing(true)
  }

  function handleCancel() {
    setIsEditing(false)
    setSaveError('')
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!editName.trim() || !profile) return
    setSaving(true)
    setSaveError('')
    try {
      const res = await updateProfile({ name: editName.trim() })
      const updated: UserProfile = { ...profile, name: res.user.name }
      localStorage.setItem('user', JSON.stringify(updated))
      setProfile(updated)
      setIsEditing(false)
    } catch {
      setSaveError('Erro ao salvar. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  function logout() {
    localStorage.removeItem('user')
    navigate('/login')
  }

  const header = (
    <header className="board-header">
      <div className="board-header__left">
        <div className="board-logo" onClick={() => navigate('/todos')} style={{ cursor: 'pointer' }}>
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <rect width="40" height="40" rx="8" fill="rgba(255,255,255,0.2)" />
            <rect x="6" y="6" width="11" height="26" rx="3" fill="white" />
            <rect x="23" y="6" width="11" height="17" rx="3" fill="white" />
          </svg>
          <span className="board-logo__name">FusionRun</span>
        </div>
        <span className="board-separator" aria-hidden="true">/</span>
        <span className="board-project-name">Meu Perfil</span>
      </div>
      <div className="board-header__right">
        {profile && (
          <div className="board-user">
            <span className="board-avatar">{profile.name.charAt(0).toUpperCase()}</span>
            <span className="board-user__name">{profile.name}</span>
          </div>
        )}
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
  )

  if (loadError) {
    return (
      <div className="board-page">
        {header}
        <main className="profile-page">
          <div className="profile-error" role="alert">
            <p>{loadError}</p>
            <button className="profile-btn profile-btn--primary" onClick={loadFromStorage}>
              Tentar novamente
            </button>
          </div>
        </main>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="board-page">
        {header}
        <main className="profile-page">
          <div className="profile-loading" aria-label="Carregando perfil">
            <span className="profile-spinner" aria-hidden="true" />
            <span>Carregando...</span>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="board-page">
      {header}
      <main className="profile-page">
      <div className="profile-card">
        <div className="profile-card__header">
          <h1 className="profile-card__title">Meu Perfil</h1>
        </div>

        <div className="profile-avatar" aria-hidden="true">
          {getInitials(profile.name)}
        </div>

        {isEditing ? (
          <form className="profile-form" onSubmit={handleSave} noValidate>
            <div className="profile-field">
              <label htmlFor="profile-name" className="profile-field__label">
                Nome
              </label>
              <input
                id="profile-name"
                type="text"
                className="profile-field__input"
                value={editName}
                onChange={e => {
                  setEditName(e.target.value)
                  if (saveError) setSaveError('')
                }}
                disabled={saving}
                autoFocus
              />
            </div>

            <div className="profile-field">
              <span className="profile-field__label">Usuário</span>
              <span className="profile-field__value profile-field__value--muted">
                {profile.username}
              </span>
            </div>

            {saveError && (
              <div className="profile-save-error" role="alert">
                {saveError}
              </div>
            )}

            <div className="profile-actions">
              <button
                type="submit"
                className="profile-btn profile-btn--primary"
                disabled={saving || !editName.trim()}
                aria-busy={saving}
              >
                {saving ? (
                  <>
                    <span className="profile-spinner profile-spinner--sm" aria-hidden="true" />
                    Salvando...
                  </>
                ) : (
                  'Salvar'
                )}
              </button>
              <button
                type="button"
                className="profile-btn profile-btn--secondary"
                onClick={handleCancel}
                disabled={saving}
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-info">
            <div className="profile-field">
              <span className="profile-field__label">Nome</span>
              <span className="profile-field__value">{profile.name}</span>
            </div>

            <div className="profile-field">
              <span className="profile-field__label">Usuário</span>
              <span className="profile-field__value profile-field__value--muted">
                {profile.username}
              </span>
            </div>

            <div className="profile-actions">
              <button
                type="button"
                className="profile-btn profile-btn--primary"
                onClick={handleEdit}
              >
                Editar
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
    </div>
  )
}
