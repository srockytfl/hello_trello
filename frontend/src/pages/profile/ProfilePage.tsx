import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from '../../services/api'
import type { UserProfile } from '../../types'
import UserMenuPopup from '../../components/UserMenuPopup'
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
  const [popupOpen, setPopupOpen] = useState(false)

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

  const header = (
    <header className="board-header">
      <div className="board-header__left">
        <span className="board-project-name">Meu Perfil</span>
      </div>
      <div className="board-header__right">
        {profile && (
          <div className="board-user-wrap">
            <div
              className="board-user"
              onClick={() => setPopupOpen(o => !o)}
              title="Menu do usuário"
            >
              <span className="board-avatar">{profile.name.charAt(0).toUpperCase()}</span>
              <span className="board-user__name">{profile.name}</span>
            </div>
            {popupOpen && <UserMenuPopup onClose={() => setPopupOpen(false)} />}
          </div>
        )}
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
