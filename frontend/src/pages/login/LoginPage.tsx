import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../services/api'
import './login.scss'

interface FormErrors {
  email?: string
  password?: string
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/todos')
    }
    emailRef.current?.focus()
  }, [navigate])

  function validate(): boolean {
    const newErrors: FormErrors = {}
    if (!email.trim()) {
      newErrors.email = 'E-mail é obrigatório'
    } else if (!validateEmail(email)) {
      newErrors.email = 'E-mail inválido'
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
      const res = await login(email, password)
      localStorage.setItem('user', JSON.stringify(res.user))
      navigate('/todos')
    } catch (err: unknown) {
      if (
        err &&
        typeof err === 'object' &&
        'response' in err &&
        (err as { response?: { status?: number } }).response?.status === 401
      ) {
        setApiError('E-mail ou senha inválidos')
      } else {
        setApiError('Erro de conexão. Tente novamente.')
      }
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      handleSubmit(e as unknown as React.FormEvent)
    }
  }

  return (
    <main className="login-page" role="main">
      <div className="login-card" aria-label="Formulário de login">
        <h1 className="login-title">Entrar</h1>
        <p className="login-subtitle">Acesse sua conta</p>

        <form
          className="login-form"
          onSubmit={handleSubmit}
          aria-label="Login"
          noValidate
        >
          <div className="form-field">
            <label htmlFor="email" className="field-label">
              E-mail
            </label>
            <input
              id="email"
              ref={emailRef}
              type="email"
              className={`field-input${errors.email ? ' field-input--error' : ''}`}
              value={email}
              onChange={e => {
                setEmail(e.target.value)
                if (errors.email) setErrors(prev => ({ ...prev, email: undefined }))
              }}
              onKeyDown={handleKeyDown}
              placeholder="seu@email.com"
              autoComplete="email"
              aria-describedby={errors.email ? 'email-error' : undefined}
              aria-invalid={!!errors.email}
              disabled={loading}
            />
            {errors.email && (
              <span id="email-error" className="field-error" role="alert">
                {errors.email}
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
              onKeyDown={handleKeyDown}
              placeholder="••••••"
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
