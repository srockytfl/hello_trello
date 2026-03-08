import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

const Login = lazy(() => import('./pages/Login'))
const Todos = lazy(() => import('./pages/Todos'))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
