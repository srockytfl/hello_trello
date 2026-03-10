# US-128 — Fullstack Done

## Implementação Concluída

### Arquivos criados

- `frontend/src/pages/login/LoginPage.tsx` — componente de login com email/password
- `frontend/src/pages/login/login.scss` — estilos do formulário de login

### Arquivos modificados

- `frontend/src/types/index.ts` — `LoginResponse` atualizado com `token` e `user.email`
- `frontend/src/services/api.ts` — função `login()` agora usa `email` em vez de `username`
- `frontend/src/App.tsx` — rota `/login` aponta para `./pages/login/LoginPage`
- `server/index.js` — endpoint `POST /api/login` aceita `email`/`password`

### Funcionalidades implementadas

**Frontend:**
- Validação client-side de e-mail (obrigatório, formato válido) e senha (obrigatória, min 3 chars)
- Erros inline por campo com `role="alert"` para acessibilidade
- Erro de API (401) → "E-mail ou senha inválidos"
- Erro de rede → "Erro de conexão. Tente novamente."
- Estado de loading com botão desabilitado e texto "Entrando..."
- Redirect automático se já logado
- Labels acessíveis: `htmlFor`, `aria-invalid`, `aria-describedby`, `aria-busy`
- Foco automático no campo e-mail

**Backend:**
- `POST /api/login` aceita `{ email, password }`
- Valida presença dos campos (400 se ausentes)
- Credencial: `admin@example.com` / `123` → retorna `{ token, user: { name, email } }`
- 401 para credenciais inválidas

### Credenciais de teste

- E-mail: `admin@example.com`
- Senha: `123`
