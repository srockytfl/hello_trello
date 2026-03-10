import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

const Login = lazy(() => import('./pages/login/Login'))
const Todos = lazy(() => import('./pages/Todos'))

function RequireAuth({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('auth_token') || localStorage.getItem('user');
  if (!token) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/board" element={<RequireAuth><Todos /></RequireAuth>} />
          <Route path="/todos" element={<RequireAuth><Todos /></RequireAuth>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
