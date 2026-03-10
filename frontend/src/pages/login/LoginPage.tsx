import { useState, useEffect, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { loginWithCredentials } from '../../services/auth'
import './login.scss'

type ErrorKind = 'validation' | 'unauthorized' | 'network'

interface ErrorState {
  kind: ErrorKind
  field?: 'email' | 'password'
  message: string
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorState, setErrorState] = useState<ErrorState | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/todos', { replace: true })
    }
  }, [navigate])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorState(null)

    if (!email.trim()) {
      setErrorState({ kind: 'validation', field: 'email', message: 'O e-mail ou usuário é obrigatório.' })
      return
    }
    if (!password.trim()) {
      setErrorState({ kind: 'validation', field: 'password', message: 'A senha é obrigatória.' })
      return
    }

    setLoading(true)
    try {
      const res = await loginWithCredentials(email.trim(), password)
      localStorage.setItem('token', res.token)
      localStorage.setItem('user', JSON.stringify(res.user))
      navigate('/todos', { replace: true })
    } catch (err: unknown) {
      setLoading(false)
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setErrorState({ kind: 'unauthorized', message: 'E-mail ou senha incorretos.' })
        } else if (!err.response) {
          setErrorState({ kind: 'network', message: 'Falha de conexão. Verifique sua internet e tente novamente.' })
        } else {
          setErrorState({ kind: 'network', message: 'Erro inesperado. Tente novamente.' })
        }
      } else {
        setErrorState({ kind: 'network', message: 'Erro inesperado. Tente novamente.' })
      }
    }
  }

  const emailError =
    errorState?.kind === 'validation' && errorState.field === 'email'
      ? errorState.message
      : null

  const passwordError =
    errorState?.kind === 'validation' && errorState.field === 'password'
      ? errorState.message
      : null

  const globalError =
    errorState?.kind === 'unauthorized' || errorState?.kind === 'network'
      ? errorState.message
      : null

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__logo">
          <span className="login-card__logo-icon" aria-hidden="true">&#9642;</span>
          <span className="login-card__logo-text">Trello Clone</span>
        </div>

        <h1 className="login-card__title">Entrar na sua conta</h1>

        {globalError && (
          <p className="login-card__error" role="alert">
            {globalError}
          </p>
        )}

        <form className="login-card__form" onSubmit={handleSubmit} noValidate>
          <div className="login-field">
            <label className="login-field__label" htmlFor="login-email">
              E-mail ou usuário
            </label>
            <input
              id="login-email"
              className={`login-field__input${emailError ? ' login-field__input--error' : ''}`}
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin"
              autoComplete="username"
              autoFocus
              disabled={loading}
              aria-describedby={emailError ? 'login-email-error' : undefined}
              aria-invalid={emailError ? true : undefined}
            />
            {emailError && (
              <span id="login-email-error" className="login-field__error" role="alert">
                {emailError}
              </span>
            )}
          </div>

          <div className="login-field">
            <label className="login-field__label" htmlFor="login-password">
              Senha
            </label>
            <input
              id="login-password"
              className={`login-field__input${passwordError ? ' login-field__input--error' : ''}`}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••"
              autoComplete="current-password"
              disabled={loading}
              aria-describedby={passwordError ? 'login-password-error' : undefined}
              aria-invalid={passwordError ? true : undefined}
            />
            {passwordError && (
              <span id="login-password-error" className="login-field__error" role="alert">
                {passwordError}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="login-card__btn"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="login-card__hint">
          Demo: <strong>admin</strong> / <strong>123</strong>
        </p>
      </div>
    </div>
  )
}
