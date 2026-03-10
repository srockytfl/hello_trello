# US-130 — API Contract: Nova tela de Login

## Overview

This contract defines the authentication endpoint consumed by the Login page redesign.
The existing backend already exposes `POST /api/login` which covers the required behaviour.
US-130 aligns the route path to `/auth/login` as specified in the story and PRD, and standardises
the response shape to include a `user.id` field that was absent in the previous implementation.

---

## Endpoint

### POST /auth/login

Authenticates a user with email and password credentials.

**URL:** `/auth/login`
**Method:** `POST`
**Auth required:** No

#### Request

```
Content-Type: application/json
```

```json
{
  "email": "admin@example.com",
  "password": "123456"
}
```

| Field    | Type   | Required | Validation                              |
|----------|--------|----------|-----------------------------------------|
| email    | string | yes      | Valid e-mail format (RFC 5322 subset)   |
| password | string | yes      | Non-empty, minimum 1 character          |

#### Response — 200 OK (success)

```json
{
  "token": "fake-token-abc123",
  "user": {
    "id": 1,
    "email": "admin@example.com",
    "name": "Admin"
  }
}
```

| Field      | Type   | Description                                  |
|------------|--------|----------------------------------------------|
| token      | string | Opaque session token stored client-side      |
| user.id    | number | Unique user identifier                       |
| user.email | string | Authenticated user email                     |
| user.name  | string | Display name                                 |

#### Response — 400 Bad Request (missing fields)

```json
{
  "error": "E-mail e senha são obrigatórios"
}
```

#### Response — 401 Unauthorized (invalid credentials)

```json
{
  "error": "Credenciais inválidas"
}
```

---

## Data Models

### LoginRequest

```typescript
interface LoginRequest {
  email: string;
  password: string;
}
```

### LoginResponse

```typescript
interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}
```

### AuthError

```typescript
interface AuthError {
  error: string;
}
```

---

## Authentication Flow

```
Browser                         Server
  |                               |
  |  POST /auth/login             |
  |  { email, password }          |
  |------------------------------>|
  |                               |  Validate fields
  |                               |  Check credentials
  |  200 { token, user }          |
  |<------------------------------|
  |                               |
  |  Store token in localStorage  |
  |  Redirect to /board           |
```

**Token storage:** `localStorage.setItem('auth_token', token)`

**Route protection:** If a valid token already exists in `localStorage` when the user
visits `/login`, redirect to `/board` immediately (protected route guard).

---

## Migration Note

The existing route `POST /api/login` in `server/index.js` must be kept or aliased to
`POST /auth/login` for backward compatibility if other parts of the application reference it.
The recommended approach is to add the new route `/auth/login` alongside the old `/api/login`
and standardise the response field `message` → `error` per this contract.

---

## Test Credentials (development only)

| Email               | Password | Result  |
|---------------------|----------|---------|
| admin@example.com   | 123      | Success |
| any other           | any      | 401     |

---

## Error Handling Summary

| Scenario                      | HTTP Status | Response field |
|-------------------------------|-------------|----------------|
| Missing email or password     | 400         | `error`        |
| Wrong credentials             | 401         | `error`        |
| Server crash / unavailable    | 500 / 0     | Network error  |

Frontend must handle all three cases and display a user-friendly message in the form.
