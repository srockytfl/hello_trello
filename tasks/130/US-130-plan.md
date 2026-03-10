# US-130 — Implementation Plan: Nova tela de Login

## Context

US-130 redesigns the Login page to match the Figma layout (node-id=48-721).
A previous attempt (US-128) created `frontend/src/pages/login/` (lowercase).
This story creates the canonical `frontend/src/pages/Login/` directory (uppercase, per CLAUDE.md
convention) and wires it to a new `/auth/login` backend route.

---

## Technical Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Page location | `frontend/src/pages/Login/` | CLAUDE.md convention: one dir per page, capital L |
| Component file | `Login.tsx` | Matches directory name |
| Styles file | `Login.scss` | CLAUDE.md: SCSS per page |
| Auth service | `frontend/src/services/auth.ts` (update) | Reuse existing service file |
| Types | `frontend/src/types/auth.ts` (new) | Shared LoginRequest/LoginResponse types |
| Token storage | `localStorage` key `auth_token` | Consistent with existing `auth.ts` service |
| Route guard | Inside `App.tsx` using `useEffect` + `useNavigate` | No external auth library needed |
| Backend route | Add `POST /auth/login` alongside existing `POST /api/login` | Backward compat |
| Error field | `error` (not `message`) | Align with API contract |
| Loading state | `isLoading` boolean in local state | Disable button + show spinner during request |

---

## Files to Create

```
frontend/src/pages/Login/
├── Login.tsx       ← main page component
└── Login.scss      ← page-scoped styles

frontend/src/types/
└── auth.ts         ← LoginRequest, LoginResponse, AuthError interfaces
```

---

## Files to Modify

```
server/index.js                          ← add POST /auth/login route
frontend/src/services/auth.ts            ← update to use /auth/login, align response shape
frontend/src/App.tsx                     ← register /login route pointing to Login page
```

---

## backend: Server Changes

### server/index.js

Add a new route `/auth/login` that mirrors the existing `/api/login` logic but:
- Returns `{ token, user: { id, email, name } }` on success (adds `id` field)
- Returns `{ error: "..." }` on failure (field name `error` not `message`)
- Validates both fields present, otherwise responds 400

```javascript
// POST /auth/login — canonical auth endpoint (US-130)
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
  }
  if (email === 'admin@example.com' && password === '123') {
    return res.json({
      token: 'fake-token-abc123',
      user: { id: 1, name: 'Admin', email }
    });
  }
  res.status(401).json({ error: 'Credenciais inválidas' });
});
```

The old `/api/login` route remains intact for backward compatibility.

---

## frontend: TypeScript Types

### frontend/src/types/auth.ts (create)

```typescript
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginUser {
  id: number;
  email: string;
  name: string;
}

export interface LoginResponse {
  token: string;
  user: LoginUser;
}

export interface AuthError {
  error: string;
}
```

---

## frontend: Auth Service

### frontend/src/services/auth.ts (update)

Update the login function to point to `/auth/login` and type it with the new interfaces.

```typescript
import axios from 'axios';
import type { LoginRequest, LoginResponse } from '../types/auth';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const { data } = await axios.post<LoginResponse>(
    `${API_URL}/auth/login`,
    credentials
  );
  return data;
}

export function saveToken(token: string): void {
  localStorage.setItem('auth_token', token);
}

export function getToken(): string | null {
  return localStorage.getItem('auth_token');
}

export function clearToken(): void {
  localStorage.removeItem('auth_token');
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
```

---

## frontend: Login Page Component

### frontend/src/pages/Login/Login.tsx (create)

Key responsibilities:
1. Render email + password fields
2. Client-side validation (non-empty email format, non-empty password)
3. Call `login()` from auth service on submit
4. Show loading state during request (disable button)
5. On success: save token, redirect to `/board`
6. On error: display inline error message
7. If already authenticated, redirect to `/board` on mount

```typescript
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, saveToken, isAuthenticated } from '../../services/auth';
import type { LoginRequest } from '../../types/auth';
import './Login.scss';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginRequest>({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated()) navigate('/board', { replace: true });
  }, [navigate]);

  const validate = (): string => {
    if (!form.email) return 'E-mail é obrigatório';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'E-mail inválido';
    if (!form.password) return 'Senha é obrigatória';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) { setError(validationError); return; }

    setIsLoading(true);
    setError('');

    try {
      const response = await login(form);
      saveToken(response.token);
      navigate('/board', { replace: true });
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Erro ao conectar com o servidor');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Entrar</h1>
        <form onSubmit={handleSubmit} noValidate className="login-form">
          <div className="login-field">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              disabled={isLoading}
              autoComplete="email"
            />
          </div>
          <div className="login-field">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>
          {error && <p className="login-error" role="alert">{error}</p>}
          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
```

Note: The Figma design (node-id=48-721) should be consulted for exact visual details.
The SCSS file must faithfully replicate colors, spacing, and typography from the design.

---

## frontend: SCSS Styles

### frontend/src/pages/Login/Login.scss (create)

Structure (values to be confirmed against Figma node-id=48-721):

```scss
// Login page — US-130
// Colors derived from Figma design (node-id=48-721)

$color-primary:    #0052CC;
$color-bg:         #F4F5F7;
$color-card-bg:    #FFFFFF;
$color-text:       #172B4D;
$color-label:      #5E6C84;
$color-error:      #DE350B;
$color-border:     #DFE1E6;
$color-border-focus: #4C9AFF;

$border-radius-card:  8px;
$border-radius-input: 4px;
$border-radius-btn:   4px;

.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: $color-bg;
  padding: 1rem;
}

.login-card {
  background: $color-card-bg;
  border-radius: $border-radius-card;
  box-shadow: 0 2px 8px rgba(9, 30, 66, 0.15);
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 400px;
}

.login-title {
  color: $color-text;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login-field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  label {
    color: $color-label;
    font-size: 0.875rem;
    font-weight: 600;
  }

  input {
    border: 2px solid $color-border;
    border-radius: $border-radius-input;
    color: $color-text;
    font-size: 1rem;
    padding: 0.625rem 0.75rem;
    transition: border-color 0.15s ease;

    &:focus {
      border-color: $color-border-focus;
      outline: none;
    }

    &:disabled {
      background-color: $color-bg;
      cursor: not-allowed;
      opacity: 0.7;
    }

    &::placeholder {
      color: $color-border;
    }
  }
}

.login-error {
  color: $color-error;
  font-size: 0.875rem;
  margin: 0;
}

.login-button {
  background-color: $color-primary;
  border: none;
  border-radius: $border-radius-btn;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 0.5rem;
  padding: 0.75rem 1rem;
  transition: background-color 0.15s ease, opacity 0.15s ease;
  width: 100%;

  &:hover:not(:disabled) {
    background-color: darken($color-primary, 8%);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

// Responsive
@media (max-width: 480px) {
  .login-card {
    box-shadow: none;
    padding: 2rem 1.25rem;
  }
}
```

---

## frontend: App.tsx Route Registration

### App.tsx (update)

Add the `/login` route pointing to the new `Login` component:

```typescript
import Login from './pages/Login/Login';

// Inside <Routes>:
<Route path="/login" element={<Login />} />
```

Ensure the existing `/board` route is also registered so post-login redirect works.

---

## Acceptance Criteria Checklist

| Criterion | Implementation |
|---|---|
| Layout from Figma | Login.scss values confirmed against node-id=48-721 |
| Email field validated | Regex + empty check in `validate()` |
| Password field validated | Non-empty check in `validate()` |
| Submit calls backend | `login()` service → `POST /auth/login` |
| Auth errors displayed | `setError()` from catch block, `role="alert"` for a11y |
| Responsive mobile | SCSS breakpoint at 480px |
| Redirect after login | `navigate('/board', { replace: true })` |
| Already logged in | `useEffect` guard → redirect if token present |

---

## QA Test Scenarios

Refer to `US-130-story.txt` QA section. Key scenarios:

1. `POST /auth/login` with `admin@example.com` / `123` → 200 + token
2. `POST /auth/login` with wrong credentials → 401 + `{ error: "Credenciais inválidas" }`
3. Submit with empty email → inline error, no network request
4. Submit with invalid email format → inline error, no network request
5. Submit with valid email, empty password → inline error, no network request
6. Successful login → redirected to `/board`
7. Mobile viewport 375px → form fully usable, no overflow

---

## Dependencies & Risks

| Item | Risk | Mitigation |
|---|---|---|
| Figma access | Design not publicly accessible | Request read token from PO; use node-id=48-721 |
| Existing `/api/login` route | Conflict with new `/auth/login` | Keep both routes; update only frontend to use new path |
| `App.tsx` structure unknown | Route conflict possible | Read App.tsx before modifying |
| Token already stored from US-128 | Stale token may bypass login | `clearToken()` on logout; guard checks validity |

---

## Sequence of Implementation (Dev Fullstack)

1. `backend:` Add `POST /auth/login` to `server/index.js`
2. `frontend:` Create `frontend/src/types/auth.ts`
3. `frontend:` Update `frontend/src/services/auth.ts`
4. `frontend:` Create `frontend/src/pages/Login/Login.tsx`
5. `frontend:` Create `frontend/src/pages/Login/Login.scss` (verify against Figma)
6. `frontend:` Register `/login` route in `App.tsx`
7. Manual smoke test: start both servers, open `/login`, attempt login
