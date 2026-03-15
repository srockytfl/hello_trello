import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/api'

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('user')) navigate('/todos')
  }, [navigate])

  async function onLogin() {
    setError('')
    setLoading(true)
    try {
      const res = await login(username, password)
      localStorage.setItem('user', JSON.stringify(res.user))
      navigate('/todos')
    } catch {
      setError('Usuário ou senha inválidos')
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') onLogin()
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Azul</h2>
        <div className="field">
          <label>Usuário</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="admin"
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>
        <div className="field">
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="123"
            onKeyDown={handleKeyDown}
          />
        </div>
        <button className="btn-login" onClick={onLogin} disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        {error && <div className="error">{error}</div>}
        <p className="hint">admin / 123</p>
      </div>
    </div>
  )
}
