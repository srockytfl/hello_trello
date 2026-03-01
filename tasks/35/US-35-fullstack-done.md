# US-35 — Layout com Ícone de Usuário no Header — Fullstack Done

## Resumo

Implementação do avatar circular de usuário no header da aplicação, com página de perfil e seção de Settings.

---

## Backend

### Novo endpoint

| Método | Rota              | Descrição                         |
|--------|-------------------|-----------------------------------|
| GET    | `/api/user/profile` | Retorna dados do perfil do usuário (name, email, role, joinedAt) |

**Arquivo modificado:** `server/index.js`
- Adicionado objeto `userProfile` em memória com: `name`, `email`, `role`, `joinedAt`
- Adicionada rota `GET /api/user/profile`

---

## Frontend

### Arquivos criados

| Arquivo | Descrição |
|---------|-----------|
| `frontend/src/app/components/user-avatar/user-avatar.component.ts` | Avatar circular com iniciais do usuário, clicável, leva para `/profile` |
| `frontend/src/app/pages/profile/profile.component.ts` | Página de perfil do usuário com card de dados e seção Settings |

### Arquivos modificados

| Arquivo | Alteração |
|---------|-----------|
| `frontend/src/app/services/api.service.ts` | Adicionado método `getUserProfile()` → `GET /api/user/profile` |
| `frontend/src/app/pages/todos/todos.component.ts` | Importado e adicionado `<app-user-avatar />` ao header (lado direito) |
| `frontend/src/app/app.routes.ts` | Adicionada rota lazy `{ path: 'profile', ... ProfileComponent }` |

---

## Critérios de Aceitação atendidos

1. ✅ **Avatar circular no header (lado direito)** — `UserAvatarComponent` exibido ao lado do botão Sair, com `border-radius: 50%`
2. ✅ **Clicar no avatar abre tela de perfil** — clique navega para `/profile` via `Router.navigate`
3. ✅ **Tela de perfil possui acesso a seção de Settings** — `ProfileComponent` contém bloco Settings com 4 itens (Notificações, Aparência, Segurança, Idioma)
4. ✅ **Avatar responsivo** — media queries para mobile (`max-width: 480px`) ajustam tamanhos
5. ✅ **Visualmente consistente com design system** — usa variáveis CSS do projeto (`--blue`, `--bg2`, `--border`, `--radius`, Material Icons Round)

## Regras Técnicas atendidas

- `border-radius: 50%` no avatar circular
- Hover com `opacity` + `transform: scale(1.08)` e `focus` com `box-shadow`
- Integrado com `localStorage` (dados do usuário logado) + fallback para API `/api/user/profile`
- Padrões CSS/HTML do projeto seguidos (variáveis CSS, SCSS nesting, standalone components)
- Sem dependências externas adicionais
