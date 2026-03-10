# US-134 — Fullstack Done

## Resumo

Ajuste no formulário de login para utilizar campo de usuário (username) em vez de e-mail.

## Problema

O campo de login estava configurado como `type="email"` e possuía validação de formato de e-mail (`validateEmail` com regex `^[^\s@]+@[^\s@]+\.[^\s@]+$`), impedindo que o usuário entrasse com um username simples como `admin`.

## Alterações realizadas

### Arquivo modificado

**`frontend/src/pages/login/LoginPage.tsx`**

| O que era | O que ficou |
|-----------|-------------|
| Interface `FormErrors { email?: string }` | Interface `FormErrors { username?: string }` |
| Função `validateEmail()` com regex de e-mail | Removida |
| Estado `const [email, setEmail] = useState('')` | `const [username, setUsername] = useState('')` |
| `ref` chamado `emailRef` | `usernameRef` |
| Validação: campo obrigatório + formato de e-mail | Apenas: campo obrigatório |
| Input `id="email"`, `type="email"` | `id="username"`, `type="text"` |
| Label "E-mail" | Label "Usuário" |
| Placeholder `"seu@email.com"` | `"usuário"` |
| `autoComplete="email"` | `autoComplete="username"` |
| `aria-describedby="email-error"` | `aria-describedby="username-error"` |
| Mensagem de erro API: "E-mail ou senha inválidos" | "Usuário ou senha inválidos" |
| Ícone de envelope (e-mail) | Ícone de pessoa (usuário) |
| Hint: `admin@example.com / 123` | `admin / 123` |
| Chamada `login(email, password)` | `login(username, password)` |

## Backend

Nenhuma alteração necessária — o backend já recebia `username` e `password` normalmente.

## Endpoints afetados

Nenhum endpoint alterado.

## Arquivos criados/modificados

- Modificado: `frontend/src/pages/login/LoginPage.tsx`
- Criado: `tasks/134/US-134-fullstack-done.md`
