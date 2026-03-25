import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Sidebar from './components/Sidebar/Sidebar'

const Login = lazy(() => import('./pages/login/LoginPage'))
const Register = lazy(() => import('./pages/register/RegisterPage'))
const ForgotPassword = lazy(() => import('./pages/forgot-password/ForgotPasswordPage'))
const Todos = lazy(() => import('./pages/Todos'))
const Profile = lazy(() => import('./pages/profile/ProfilePage'))

function RequireAuth({ children }: { children: React.ReactNode }) {
  if (!localStorage.getItem('user')) return <Navigate to="/login" replace />
  return <>{children}</>
}

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/todos" element={<RequireAuth><AuthLayout><Todos /></AuthLayout></RequireAuth>} />
            <Route path="/profile" element={<RequireAuth><AuthLayout><Profile /></AuthLayout></RequireAuth>} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
