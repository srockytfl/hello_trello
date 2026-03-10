# US-128 — Frontend Done

## Status: CONCLUIDO

## Resumo

Implementação da nova tela de login para a US-128, substituindo o componente legado `Login.tsx` pelo novo `LoginPage.tsx` com suporte a três estados de erro distintos, acessibilidade e estilos dedicados.

## Arquivos alterados

### Criados / atualizados

| Arquivo | Acao |
|---------|------|
| `frontend/src/pages/login/LoginPage.tsx` | Componente principal de login — criado/substituido |
| `frontend/src/pages/login/login.scss` | Estilos dedicados da pagina de login |
| `frontend/src/types/index.ts` | `LoginResponse` atualizado com `token` e `user.name` |
| `frontend/src/App.tsx` | Rota `/login` apontando para `LoginPage` (lazy) |
| `frontend/src/styles.scss` | Estilos legados de login removidos (.login-page, .login-box) |

## Detalhes de implementacao

### `LoginPage.tsx`

- Functional component com hooks (`useState`, `useEffect`, `useNavigate`)
- Form com `noValidate` e `type="submit"` no botao
- Tres estados de erro distintos gerenciados via `ErrorState`:
  - `validation` — campo obrigatorio vazio (por campo: email ou password)
  - `unauthorized` — HTTP 401 retornado pelo backend
  - `network` — falha de conexao ou erro inesperado
- Loading state: botao desabilitado + texto "Entrando..."
- Acessibilidade:
  - Labels com `htmlFor` ligados aos inputs por `id`
  - `aria-invalid` e `aria-describedby` nos inputs com erro
  - `role="alert"` nas mensagens de erro
  - `autoComplete` adequado em cada campo
- Redireciona para `/todos` se usuario ja estiver autenticado (via `localStorage`)
- Persiste `token` e `user` no `localStorage` apos login bem-sucedido
- Integra com `loginWithCredentials` do servico `auth.ts` (suporta email ou username)

### `login.scss`

- Classe raiz: `.login-page` (full-viewport, centered)
- Card centralizado com max-width 400px, responsivo abaixo de 480px
- Modificador `.login-field__input--error` para borda vermelha no campo com erro
- Classe `.login-field__error` para mensagem de erro inline por campo
- Classe `.login-card__error` para o banner de erro global (401 / network)
- Estados do botao: normal, hover, disabled

### `LoginResponse` (types/index.ts)

```typescript
export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    username: string;
  };
}
```

### App.tsx

```tsx
const LoginPage = lazy(() => import('./pages/login/LoginPage'))
// ...
<Route path="/login" element={<LoginPage />} />
```

## Criterios de aceitacao atendidos

- [x] Tela de login com campos de email/usuario e senha
- [x] Botao "Entrar" com estados normal, hover e disabled
- [x] Mensagens de erro distintas: validacao de campo, credenciais invalidas (401), falha de rede
- [x] Responsivo em mobile e desktop
- [x] Integracao com backend POST /api/login e /auth/login
- [x] Redirecionamento para pagina principal apos login bem-sucedido
- [x] Persistencia de token e dados do usuario no localStorage
- [x] Labels acessiveis com ARIA adequado
