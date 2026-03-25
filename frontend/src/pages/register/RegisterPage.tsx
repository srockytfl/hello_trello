import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../../services/api'
import '../login/login.scss'
import './register.scss'

interface FormErrors {
  name?: string
  username?: string
  password?: string
  confirmPassword?: string
}

export default function RegisterPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/todos', { replace: true })
    }
    nameRef.current?.focus()
  }, [navigate])

  function validate(): boolean {
    const newErrors: FormErrors = {}
    if (!name.trim()) newErrors.name = 'Nome é obrigatório'
    if (!username.trim()) newErrors.username = 'Usuário é obrigatório'
    if (!password) {
      newErrors.password = 'Senha é obrigatória'
    } else if (password.length < 3) {
      newErrors.password = 'Senha deve ter ao menos 3 caracteres'
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória'
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem'
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
      const res = await register(name.trim(), username.trim(), password)
      localStorage.setItem('user', JSON.stringify(res.user))
      navigate('/todos')
    } catch (err: unknown) {
      if (
        err &&
        typeof err === 'object' &&
        'response' in err &&
        (err as { response?: { status?: number } }).response?.status === 409
      ) {
        setApiError('Usuário já cadastrado. Tente outro nome de usuário.')
      } else {
        setApiError('Erro ao cadastrar. Tente novamente.')
      }
    } finally {
      setLoading(false)
    }
  }

  function clearError(field: keyof FormErrors) {
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
    if (apiError) setApiError('')
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
          <h2 className="login-brand__headline">Crie sua conta e comece agora</h2>
          <p className="login-brand__desc">
            Junte-se a times que já organizam projetos, colaboram em tempo real e entregam resultados com o FusionRun.
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

      {/* Painel direito — formulário de cadastro */}
      <section className="login-form-panel">
        <div className="login-card" aria-label="Formulário de cadastro">
          <div className="login-card__header">
            <h1 className="login-title">Criar conta</h1>
            <p className="login-subtitle">Preencha os dados abaixo para se cadastrar</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit} aria-label="Cadastro" noValidate>
            <div className="form-field">
              <label htmlFor="register-name" className="field-label">Nome</label>
              <div className="field-input-wrapper">
                <input
                  id="register-name"
                  ref={nameRef}
                  type="text"
                  className={`field-input${errors.name ? ' field-input--error' : ''}`}
                  value={name}
                  onChange={e => { setName(e.target.value); clearError('name') }}
                  placeholder="Seu nome completo"
                  autoComplete="name"
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  aria-invalid={!!errors.name}
                  disabled={loading}
                />
              </div>
              {errors.name && (
                <span id="name-error" className="field-error" role="alert">{errors.name}</span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="register-username" className="field-label">Usuário</label>
              <div className="field-input-wrapper">
                <input
                  id="register-username"
                  type="text"
                  className={`field-input${errors.username ? ' field-input--error' : ''}`}
                  value={username}
                  onChange={e => { setUsername(e.target.value); clearError('username') }}
                  placeholder="nome de usuário"
                  autoComplete="username"
                  aria-describedby={errors.username ? 'username-error' : undefined}
                  aria-invalid={!!errors.username}
                  disabled={loading}
                />
              </div>
              {errors.username && (
                <span id="username-error" className="field-error" role="alert">{errors.username}</span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="register-password" className="field-label">Senha</label>
              <div className="field-input-wrapper">
                <input
                  id="register-password"
                  type="password"
                  className={`field-input${errors.password ? ' field-input--error' : ''}`}
                  value={password}
                  onChange={e => { setPassword(e.target.value); clearError('password') }}
                  placeholder="••••••"
                  autoComplete="new-password"
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  aria-invalid={!!errors.password}
                  disabled={loading}
                />
              </div>
              {errors.password && (
                <span id="password-error" className="field-error" role="alert">{errors.password}</span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="register-confirm-password" className="field-label">Confirmar Senha</label>
              <div className="field-input-wrapper">
                <input
                  id="register-confirm-password"
                  type="password"
                  className={`field-input${errors.confirmPassword ? ' field-input--error' : ''}`}
                  value={confirmPassword}
                  onChange={e => { setConfirmPassword(e.target.value); clearError('confirmPassword') }}
                  placeholder="••••••"
                  autoComplete="new-password"
                  aria-describedby={errors.confirmPassword ? 'confirm-error' : undefined}
                  aria-invalid={!!errors.confirmPassword}
                  disabled={loading}
                />
              </div>
              {errors.confirmPassword && (
                <span id="confirm-error" className="field-error" role="alert">{errors.confirmPassword}</span>
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

            <button type="submit" className="btn-submit" disabled={loading} aria-busy={loading}>
              {loading ? (
                <>
                  <span className="btn-spinner" aria-hidden="true" />
                  Cadastrando...
                </>
              ) : (
                'Criar conta'
              )}
            </button>
          </form>

          <p className="register-link">
            Já tenho conta? <Link to="/login">Entrar</Link>
          </p>
        </div>
      </section>
    </main>
  )
}
