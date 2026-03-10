# US-130: Fullstack Done

## O que foi implementado

### Backend — `server/index.js`

**Endpoint existente aprimorado: `POST /api/login`**

- Adicionada validação de formato de e-mail via regex (`EMAIL_REGEX`) antes de verificar as credenciais.
- Retorna HTTP 400 com `{ message: 'Formato de e-mail inválido' }` se o e-mail não passar na validação de formato.
- Mantém comportamento anterior:
  - HTTP 400 se e-mail ou senha ausentes
  - HTTP 200 + `{ token, user }` para credenciais válidas (`admin@example.com` / `123`)
  - HTTP 401 + `{ message: 'Credenciais inválidas' }` para credenciais incorretas

**Novo endpoint canônico: `POST /auth/login`**

- Valida presença de email e password (400 se ausentes)
- Retorna HTTP 200 com `{ token, user: { id, name, email } }` para credenciais válidas
- Retorna HTTP 401 com `{ error: 'Credenciais inválidas' }` para credenciais incorretas
- Campo de resposta de erro é `error` (não `message`), alinhado com o contrato da API
- Resposta de sucesso inclui `user.id` (ausente na rota legada)

### Frontend — `frontend/src/types/auth.ts` (novo)

Interfaces TypeScript para autenticação:
- `LoginRequest` — `{ email: string; password: string }`
- `LoginUser` — `{ id: number; email: string; name: string }`
- `LoginResponse` — `{ token: string; user: LoginUser }`
- `AuthError` — `{ error: string }`

### Frontend — `frontend/src/services/auth.ts` (atualizado)

Reescrito para:
- Usar `/auth/login` como endpoint canônico
- Tipado com interfaces de `../types/auth`
- Funções: `login()`, `saveToken()`, `getToken()`, `clearToken()`, `isAuthenticated()`, `logout()`, `getStoredUser()`
- Token salvo em `localStorage` com chave `auth_token`

### Frontend — `frontend/src/pages/login/Login.tsx` (novo)

Componente canônico da página de login per US-130:
- Formulário com campos email e senha
- Validação client-side: email obrigatório + formato válido, senha obrigatória
- Mensagens de erro inline por campo
- Estado de loading: botão desabilitado + texto "Entrando..."
- Erro de API exibido em banner com `role="alert"`
- Redirecionamento para `/board` após login bem-sucedido
- Guard: se já autenticado (`auth_token` em localStorage), redireciona para `/board` no mount
- Token salvo via `saveToken()` + `user` salvo em localStorage
- Acessibilidade: `role="alert"`, `aria-invalid`, `aria-busy`, `aria-describedby`

### Frontend — `frontend/src/pages/login/login.scss` (atualizado)

Adicionadas classes para o componente `Login.tsx`:
- `.login-logo`, `.login-logo-name` — logo e nome da marca
- `.login-field`, `.login-label` — campos de formulário
- `.login-input`, `.login-input--error` — inputs com estados
- `.login-field-error` — mensagem de erro por campo
- `.login-api-error` — banner de erro da API
- `.login-button` — botão de submit com estados hover/disabled

### Frontend — `frontend/src/App.tsx` (atualizado)

- Rota `/login` aponta para novo componente `Login.tsx`
- Rota `/board` adicionada (redirect pós-login) → protegida por `RequireAuth`
- `RequireAuth` verifica `auth_token` ou `user` no localStorage
- Rota `/todos` mantida para retrocompatibilidade

## Arquivos criados/modificados

| Arquivo | Ação |
|--------|------|
| `server/index.js` | Modificado — adicionada rota canônica `POST /auth/login` |
| `frontend/src/types/auth.ts` | Criado — interfaces LoginRequest, LoginUser, LoginResponse, AuthError |
| `frontend/src/services/auth.ts` | Modificado — usa `/auth/login`, tipado com interfaces auth |
| `frontend/src/pages/login/Login.tsx` | Criado — componente canônico da página de login |
| `frontend/src/pages/login/login.scss` | Modificado — classes adicionadas para Login.tsx |
| `frontend/src/pages/login/index.ts` | Modificado — exporta Login.tsx (não LoginPage.tsx) |
| `frontend/src/App.tsx` | Modificado — rota /login usa Login.tsx, rota /board adicionada |
| `tasks/130/US-130-fullstack-done.md` | Atualizado — este arquivo |

## Credenciais de teste

- **E-mail:** `admin@example.com`
- **Senha:** `123`

## Como testar

### Backend

```bash
# Login válido — rota canônica
curl -X POST http://localhost:3001/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@example.com","password":"123"}'
# Esperado: HTTP 200 { token: "fake-token-abc123", user: { id: 1, name: "Admin", email: "..." } }

# Credenciais inválidas
curl -X POST http://localhost:3001/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"outro@email.com","password":"errada"}'
# Esperado: HTTP 401 { error: "Credenciais inválidas" }

# Campos ausentes
curl -X POST http://localhost:3001/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@example.com"}'
# Esperado: HTTP 400 { error: "E-mail e senha são obrigatórios" }
```

### Frontend

1. Acesse `http://localhost:5173/login`
2. Tente submeter sem preencher nada → erros inline devem aparecer
3. Digite um e-mail inválido → erro "E-mail inválido"
4. Preencha `admin@example.com` / `123` → deve redirecionar para `/board`
5. Preencha credenciais erradas → mensagem de erro da API
6. Redimensione a janela para ≤480px → card sem sombra, padding reduzido
