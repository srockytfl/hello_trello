import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
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
  const [showPassword, setShowPassword] = useState(false)
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
    } else if (password.length < 3) {
      newErrors.password = 'Senha deve ter ao menos 3 caracteres'
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
      {/* Painel esquerdo — apresentação da marca */}
      <aside className="login-brand" aria-hidden="true">
        <div className="login-brand__content">
          <div className="login-brand__logo">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <rect width="40" height="40" rx="8" fill="rgba(255,255,255,0.15)" />
              <rect x="6" y="6" width="11" height="26" rx="3" fill="white" />
              <rect x="23" y="6" width="11" height="17" rx="3" fill="white" />
            </svg>
            <span className="login-brand__name">FusionRun</span>
          </div>
          <h2 className="login-brand__headline">Organize sua equipe com facilidade</h2>
          <p className="login-brand__desc">
            Gerencie projetos, colabore em tempo real e entregue resultados com sua equipe — tudo em um só lugar.
          </p>
          <ul className="login-brand__features" aria-label="Funcionalidades">
            <li>
              <span className="feature-icon" aria-hidden="true">✓</span>
              Quadros Kanban intuitivos
            </li>
            <li>
              <span className="feature-icon" aria-hidden="true">✓</span>
              Colaboração em tempo real
            </li>
            <li>
              <span className="feature-icon" aria-hidden="true">✓</span>
              Relatórios e métricas
            </li>
          </ul>
        </div>
      </aside>

      {/* Painel direito — formulário de login */}
      <section className="login-form-panel">
        <div className="login-card" aria-label="Formulário de login">
          <div className="login-card__header">
            <h1 className="login-title">Bem-vindo de volta</h1>
            <p className="login-subtitle">Entre com sua conta para continuar</p>
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
              <div className="field-input-wrapper">
                <span className="field-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                    <path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
                  </svg>
                </span>
                <input
                  id="username"
                  ref={usernameRef}
                  type="text"
                  className={`field-input field-input--icon${errors.username ? ' field-input--error' : ''}`}
                  value={username}
                  onChange={e => {
                    setUsername(e.target.value)
                    if (errors.username) setErrors(prev => ({ ...prev, username: undefined }))
                    if (apiError) setApiError('')
                  }}
                  placeholder="usuário"
                  autoComplete="username"
                  aria-describedby={errors.username ? 'username-error' : undefined}
                  aria-invalid={!!errors.username}
                  disabled={loading}
                />
              </div>
              {errors.username && (
                <span id="username-error" className="field-error" role="alert">
                  {errors.username}
                </span>
              )}
            </div>

            <div className="form-field">
              <div className="field-label-row">
                <label htmlFor="password" className="field-label">
                  Senha
                </label>
                <Link
                  to="/forgot-password"
                  className="forgot-link"
                  aria-label="Esqueci minha senha"
                >
                  Esqueci minha senha
                </Link>
              </div>
              <div className="field-input-wrapper">
                <span className="field-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                    <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className={`field-input field-input--icon field-input--icon-right${errors.password ? ' field-input--error' : ''}`}
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value)
                    if (errors.password) setErrors(prev => ({ ...prev, password: undefined }))
                    if (apiError) setApiError('')
                  }}
                  placeholder="••••••"
                  autoComplete="current-password"
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  aria-invalid={!!errors.password}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="field-toggle-password"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                      <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <span id="password-error" className="field-error" role="alert">
                  {errors.password}
                </span>
              )}
            </div>

            {apiError && (
              <div className="api-error" role="alert" aria-live="assertive">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                  <line x1="7" y1="4" x2="7" y2="7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  <circle cx="7" cy="10" r="0.7" fill="currentColor"/>
                </svg>
                {apiError}
              </div>
            )}

            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <span className="btn-spinner" aria-hidden="true" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          <p className="login-hint">
            Use <strong>admin</strong> / <strong>123</strong> para testar
          </p>

          <p className="login-hint" style={{ marginTop: 12 }}>
            Não tem conta? <Link to="/register" style={{ color: 'var(--blue)', fontWeight: 500, textDecoration: 'none' }}>Criar conta</Link>
          </p>
        </div>
      </section>
    </main>
  )
}
