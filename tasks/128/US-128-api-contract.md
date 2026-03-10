# US-128 — Contrato de API

## Endpoint de Login

### POST /api/login

**Descrição:** Autentica o usuário com e-mail e senha.

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "123"
}
```

**Respostas:**

#### 200 OK — Login bem-sucedido
```json
{
  "token": "fake-token",
  "user": {
    "name": "Admin",
    "email": "admin@example.com"
  }
}
```

#### 400 Bad Request — Campos ausentes
```json
{
  "message": "E-mail e senha são obrigatórios"
}
```

#### 401 Unauthorized — Credenciais inválidas
```json
{
  "message": "Credenciais inválidas"
}
```

## Tipo TypeScript (frontend/src/types/index.ts)

```typescript
export interface LoginResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
}
```

## Credenciais de teste

- **E-mail:** `admin@example.com`
- **Senha:** `123`
