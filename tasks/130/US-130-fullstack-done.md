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

### Frontend — `frontend/src/pages/login/`

**Arquivos modificados:**

#### `LoginPage.tsx`
- Redesenho completo da tela de login com layout **split-panel**:
  - **Painel esquerdo (brand):** gradiente rosa com logo SVG, headline, descrição e lista de funcionalidades
  - **Painel direito (form):** formulário centrado com campos modernos
- Novos recursos:
  - Ícones SVG inline nos campos de e-mail e senha
  - Botão de toggle para mostrar/ocultar senha
  - Link "Esqueci minha senha" (exibe alerta informando que está fora do escopo)
  - Spinner animado no botão de submit durante o carregamento
  - Limpeza automática do erro de API ao editar qualquer campo
  - Hint com credenciais de teste (`admin@example.com` / `123`)
- Mantém:
  - Validação client-side de e-mail e senha com mensagens de erro inline
  - Redirecionamento para `/todos` após login bem-sucedido
  - Tratamento de erro 401 (credenciais inválidas)
  - Tratamento de erro de rede
  - Auto-foco no campo de e-mail
  - Verificação de sessão existente no mount (`useEffect`)
  - Acessibilidade: `aria-label`, `aria-describedby`, `aria-invalid`, `aria-busy`, `role="alert"`

#### `login.scss`
- Estilos completamente reescritos para o novo layout split-panel:
  - `.login-page` — flex row, responsivo (stack vertical em mobile ≤767px)
  - `.login-brand` — painel esquerdo com gradiente `#E91E63 → #C2185B → #880E4F`
  - `.login-brand__*` — logo, headline, descrição, lista de features (oculta em mobile)
  - `.login-form-panel` — painel direito, centrado
  - `.login-card` — container do formulário sem card visual (fundo branco dos inputs)
  - `.field-input-wrapper` — wrapper relativo para ícones posicionados
  - `.field-icon` — ícone à esquerda do input
  - `.field-toggle-password` — botão à direita do campo de senha
  - `.field-input--icon` / `--icon-right` — padding extra para ícones
  - `.btn-spinner` — animação de carregamento no botão
  - `.login-hint` — caixa de dica com credenciais de teste
  - Breakpoints responsivos: mobile (≤767px)

## Arquivos criados/modificados

| Arquivo | Ação |
|--------|------|
| `server/index.js` | Modificado — validação de formato de e-mail no `POST /api/login` |
| `frontend/src/pages/login/LoginPage.tsx` | Modificado — redesenho completo split-panel |
| `frontend/src/pages/login/login.scss` | Modificado — estilos completamente reescritos |
| `tasks/130/US-130-fullstack-done.md` | Criado — este arquivo |

## Como testar

### Backend

```bash
# Login válido
curl -X POST http://localhost:3001/api/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@example.com","password":"123"}'
# Esperado: HTTP 200 { token: "fake-token", user: { name: "Admin", email: "..." } }

# Credenciais inválidas
curl -X POST http://localhost:3001/api/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"outro@email.com","password":"errada"}'
# Esperado: HTTP 401 { message: "Credenciais inválidas" }

# E-mail com formato inválido
curl -X POST http://localhost:3001/api/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"nao-e-email","password":"123"}'
# Esperado: HTTP 400 { message: "Formato de e-mail inválido" }
```

### Frontend

1. Acesse `http://localhost:5173/login`
2. Verifique o layout split-panel: painel rosa à esquerda + formulário à direita
3. Tente submeter sem preencher nada → erros inline devem aparecer
4. Digite um e-mail inválido → erro "E-mail inválido"
5. Preencha `admin@example.com` / `123` → deve redirecionar para `/todos`
6. Preencha credenciais erradas → mensagem de erro "E-mail ou senha inválidos"
7. Clique em "Esqueci minha senha" → alerta informativo
8. Clique no ícone de olho para mostrar/ocultar a senha
9. Redimensione a janela para ≤767px → layout deve empilhar verticalmente

## Credenciais de teste

- **E-mail:** `admin@example.com`
- **Senha:** `123`
