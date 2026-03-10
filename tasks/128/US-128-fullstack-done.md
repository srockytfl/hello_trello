# US-128 — Nova tela de login — Fullstack Done

## Resumo

Implementacao completa da tela de login para a US-128, com novo componente React em diretorio dedicado, servico de autenticacao tipado e endpoint de backend conforme especificado.

---

## Backend

### Arquivos modificados
- `server/index.js`

### Endpoints implementados

| Metodo | Rota | Descricao |
|--------|------|-----------|
| POST | `/auth/login` | Autentica usuario — retorna token e dados do usuario |
| POST | `/api/login` | Mantido por compatibilidade retroativa (mesmo handler) |

### Comportamento do endpoint `/auth/login`

**Request body:**
```json
{ "username": "admin", "password": "123" }
// ou
{ "email": "admin@example.com", "password": "123" }
```

**Response 200:**
```json
{
  "token": "fake-token-1",
  "user": { "id": 1, "name": "Admin", "email": "admin@example.com", "username": "admin" }
}
```

**Response 400** — campos obrigatorios ausentes:
```json
{ "message": "Email/usuario e senha sao obrigatorios" }
```

**Response 401** — credenciais invalidas:
```json
{ "message": "Credenciais invalidas" }
```

### Credenciais de demo
- Username: `admin` | Email: `admin@example.com` | Password: `123`

---

## Frontend

### Arquivos criados
- `frontend/src/pages/login/LoginPage.tsx` — componente principal da tela de login
- `frontend/src/pages/login/login.scss` — estilos SCSS da tela de login
- `frontend/src/pages/login/index.ts` — re-exportacao do componente
- `frontend/src/services/auth.ts` — servico de autenticacao tipado

### Arquivos modificados
- `frontend/src/App.tsx` — rota `/login` agora aponta para o novo `LoginPage`
- `frontend/src/types/index.ts` — `LoginResponse` atualizado com `token`, `id`, `name`, `email`, `username`
- `frontend/vite.config.ts` — proxy `/auth` adicionado para dev local
- `frontend/.env.example` — criado com variavel `VITE_API_URL`

### Componente `LoginPage`

- Functional component com hooks (`useState`, `useEffect`)
- Redireciona para `/todos` se ja autenticado
- Formulario com campos: **E-mail ou usuario** e **Senha**
- Validacao de campos obrigatorios com mensagens inline por campo
- Mensagens de erro diferenciadas: validacao de campo, credenciais invalidas (401), falha de rede
- Estado de loading no botao "Entrar" durante requisicao
- Acessibilidade: `aria-invalid`, `aria-describedby`, `role="alert"`, `htmlFor`/`id` linkados
- Apos login bem-sucedido: salva `token` e `user` no `localStorage`, redireciona para `/todos`
- Responsivo para mobile (max-width: 480px)

### Servico `auth.ts`

```typescript
loginWithCredentials(usernameOrEmail: string, password: string): Promise<LoginResponse>
logout(): void
getStoredUser(): LoginResponse['user'] | null
```

- Detecta automaticamente se o input e email ou username pelo caractere `@`
- Chama `POST /auth/login`
- Usa `VITE_API_URL` como base URL (fallback para string vazia = proxy Vite em dev)

### Rota React Router

```
/login  →  LoginPage  (lazy loaded)
```

A rota `/` redireciona para `/login`. A rota `/todos` requer autenticacao via `RequireAuth`.

---

## Fluxo de autenticacao

1. Usuario acessa `/` → redirecionado para `/login`
2. Preenche credenciais e submete o formulario
3. Frontend chama `POST /auth/login`
4. Em sucesso: token e user salvo no `localStorage`, redireciona para `/todos`
5. Em erro 401: exibe "E-mail ou senha incorretos."
6. Em erro de rede: exibe mensagem de falha de conexao

---

## Criterios de aceitacao atendidos

- [x] Campos para email/username e senha
- [x] Botao "Entrar" com estados (normal, hover, disabled)
- [x] Mensagens de erro ao submeter credenciais invalidas
- [x] Responsivo em mobile e desktop
- [x] Integracao com backend para validacao de credenciais
- [x] Apos login bem-sucedido, redireciona para pagina principal (/todos)
- [x] Persiste token e user em localStorage
- [x] Endpoint POST `/auth/login` retorna token e dados do usuario
- [x] Endpoint retorna 401 para credenciais invalidas
- [x] Endpoint valida presenca de email/username e senha (retorna 400)
