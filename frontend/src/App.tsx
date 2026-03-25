import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Footer from './components/Footer/Footer'

const Login = lazy(() => import('./pages/login/LoginPage'))
const Todos = lazy(() => import('./pages/Todos'))
const Profile = lazy(() => import('./pages/profile/ProfilePage'))

function RequireAuth({ children }: { children: React.ReactNode }) {
  if (!localStorage.getItem('user')) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/todos" element={<RequireAuth><Todos /></RequireAuth>} />
            <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
