import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { forgotPassword } from '../../services/api'
import '../login/login.scss'
import './forgot-password.scss'

type PageState = 'idle' | 'loading' | 'success' | 'error-server'

export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [pageState, setPageState] = useState<PageState>('idle')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/todos')
    }
    inputRef.current?.focus()
  }, [navigate])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!username.trim()) {
      setUsernameError('Usuário é obrigatório')
      return
    }
    setPageState('loading')
    try {
      await forgotPassword(username.trim())
      setPageState('success')
    } catch {
      setPageState('error-server')
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
          <h2 className="login-brand__headline">Recupere seu acesso com facilidade</h2>
          <p className="login-brand__desc">
            Informe seu usuário e enviaremos as instruções para recuperar sua senha.
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

      {/* Painel direito */}
      <section className="login-form-panel">
        <div className="login-card" aria-label="Recuperação de senha">
          {pageState === 'success' ? (
            <div className="forgot-success">
              <div className="forgot-success__icon" aria-hidden="true">✓</div>
              <h1 className="login-title">Instruções enviadas!</h1>
              <p className="login-subtitle">
                Se esse usuário existir em nossa base, você receberá instruções de recuperação.
              </p>
              <Link to="/login" className="btn-submit forgot-success__btn">
                Voltar ao login
              </Link>
            </div>
          ) : (
            <>
              <div className="login-card__header">
                <h1 className="login-title">Esqueci minha senha</h1>
                <p className="login-subtitle">Informe seu usuário para recuperar o acesso</p>
              </div>

              <form
                className="login-form"
                onSubmit={handleSubmit}
                aria-label="Recuperação de senha"
                noValidate
              >
                {pageState === 'error-server' && (
                  <div className="api-error" role="alert" aria-live="assertive">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                      <line x1="7" y1="4" x2="7" y2="7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                      <circle cx="7" cy="10" r="0.7" fill="currentColor"/>
                    </svg>
                    Erro ao processar. Tente novamente.
                  </div>
                )}

                <div className="form-field">
                  <label htmlFor="forgot-username" className="field-label">
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
                      id="forgot-username"
                      ref={inputRef}
                      type="text"
                      className={`field-input field-input--icon${usernameError ? ' field-input--error' : ''}`}
                      value={username}
                      onChange={e => {
                        setUsername(e.target.value)
                        if (usernameError) setUsernameError('')
                        if (pageState === 'error-server') setPageState('idle')
                      }}
                      placeholder="usuário"
                      autoComplete="username"
                      aria-describedby={usernameError ? 'username-error' : undefined}
                      aria-invalid={!!usernameError}
                      disabled={pageState === 'loading'}
                    />
                  </div>
                  {usernameError && (
                    <span id="username-error" className="field-error" role="alert">
                      {usernameError}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-submit"
                  disabled={pageState === 'loading'}
                  aria-busy={pageState === 'loading'}
                >
                  {pageState === 'loading' ? (
                    <>
                      <span className="btn-spinner" aria-hidden="true" />
                      Enviando...
                    </>
                  ) : (
                    'Enviar'
                  )}
                </button>
              </form>

              <p className="register-link">
                Lembrei minha senha → <Link to="/login">Entrar</Link>
              </p>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
