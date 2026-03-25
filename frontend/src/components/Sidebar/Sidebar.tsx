import { useNavigate, useLocation } from 'react-router-dom'
import './Sidebar.scss'

export default function Sidebar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  function logout() {
    localStorage.removeItem('user')
    navigate('/login', { replace: true })
  }

  return (
    <aside className="sidebar" aria-label="Navegação principal">
      <button
        className="sidebar-logo"
        onClick={() => navigate('/todos')}
        aria-label="Ir para o início"
        title="FusionRun"
      >
        <svg width="26" height="26" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <rect width="40" height="40" rx="8" fill="rgba(255,255,255,0.2)" />
          <rect x="6" y="6" width="11" height="26" rx="3" fill="white" />
          <rect x="23" y="6" width="11" height="17" rx="3" fill="white" />
        </svg>
      </button>

      <nav className="sidebar-nav" aria-label="Menu principal">
        <button
          className={`sidebar-item${pathname === '/todos' ? ' sidebar-item--active' : ''}`}
          onClick={() => navigate('/todos')}
          title="Início"
          aria-label="Início"
          aria-current={pathname === '/todos' ? 'page' : undefined}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </nav>

      <div className="sidebar-bottom">
        <button
          className="sidebar-item sidebar-item--disabled"
          disabled
          title="Configurações (em breve)"
          aria-label="Configurações (em breve)"
          aria-disabled="true"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="1.6"/>
          </svg>
        </button>

        <button
          className="sidebar-item sidebar-item--logout"
          onClick={logout}
          title="Sair"
          aria-label="Sair"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </aside>
  )
}
