import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../services/api'
import './login.scss'

interface FormErrors {
  username?: string
  password?: string
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)
  const usernameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/todos')
    }
    usernameRef.current?.focus()
  }, [navigate])

  function validate(): boolean {
    const newErrors: FormErrors = {}
    if (!username.trim()) {
      newErrors.username = 'Usuário é obrigatório'
    }
    if (!password) {
      newErrors.password = 'Senha é obrigatória'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setApiError('')
    if (!validate()) return

    setLoading(true)
    try {
      const res = await login(username, password)
      localStorage.setItem('user', JSON.stringify(res.user))
      navigate('/todos')
    } catch (err: unknown) {
      if (
        err &&
        typeof err === 'object' &&
        'response' in err &&
        (err as { response?: { status?: number } }).response?.status === 401
      ) {
        setApiError('Usuário ou senha inválidos')
      } else {
        setApiError('Erro de conexão. Tente novamente.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-page" role="main">
      <div className="login-card" aria-label="Formulário de login">

        <div className="login-brand">
          <div className="login-brand__icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.667 5L7.5 14.167 3.333 10" stroke="#60a5fa" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="login-brand__name">TODO LIST</span>
        </div>

        <form
          className="login-form"
          onSubmit={handleSubmit}
          aria-label="Login"
          noValidate
        >
          <div className="form-field">
            <label htmlFor="username" className="field-label">
              Usuário
            </label>
            <input
              id="username"
              ref={usernameRef}
              type="text"
              className={`field-input${errors.username ? ' field-input--error' : ''}`}
              value={username}
              onChange={e => {
                setUsername(e.target.value)
                if (errors.username) setErrors(prev => ({ ...prev, username: undefined }))
              }}
              placeholder="admin"
              autoComplete="username"
              aria-describedby={errors.username ? 'username-error' : undefined}
              aria-invalid={!!errors.username}
              disabled={loading}
            />
            {errors.username && (
              <span id="username-error" className="field-error" role="alert">
                {errors.username}
              </span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="password" className="field-label">
              Senha
            </label>
            <input
              id="password"
              type="password"
              className={`field-input${errors.password ? ' field-input--error' : ''}`}
              value={password}
              onChange={e => {
                setPassword(e.target.value)
                if (errors.password) setErrors(prev => ({ ...prev, password: undefined }))
              }}
              placeholder="123"
              autoComplete="current-password"
              aria-describedby={errors.password ? 'password-error' : undefined}
              aria-invalid={!!errors.password}
              disabled={loading}
            />
            {errors.password && (
              <span id="password-error" className="field-error" role="alert">
                {errors.password}
              </span>
            )}
          </div>

          {apiError && (
            <div className="api-error" role="alert" aria-live="assertive">
              {apiError}
            </div>
          )}

          <button
            type="submit"
            className="btn-submit"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </main>
  )
}
