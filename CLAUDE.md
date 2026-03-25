# CLAUDE.md — hello_trello

## Stack

- **Frontend:** React 18 + TypeScript + Vite + Sass + React Router DOM 6
- **Backend:** Node.js + Express 5 + CORS
- **HTTP Client:** Axios
- **Testes:** Vitest
- **Portas:** Backend 3000 · Frontend 5173

## Estrutura

```
frontend/
  src/
    pages/        # Páginas React (uma pasta por página)
    services/     # Clientes HTTP com Axios
    types/        # Definições TypeScript
    App.tsx
    main.tsx
    styles.scss   # Estilos globais
  index.html
  vite.config.ts

server/
  index.js        # Express API

api/
  index.js        # Utilitários de cliente reutilizáveis
```

## Comandos

```bash
# Raiz
npm run dev       # Frontend dev (Vite)
npm run build     # Build de produção
npm run start     # Inicia server em produção
./start.sh        # Script customizado

# Frontend
cd frontend && npm start      # Vite dev
cd frontend && npm run build  # Build
cd frontend && npm test       # Vitest

# Server
cd server && node index.js
```

## Convenções de Código

- **Páginas React** — `frontend/src/pages/<nome>/` com componentes standalone
- **Serviços HTTP** — `frontend/src/services/` com AxiosInstance
- **Tipos TypeScript** — `frontend/src/types/`
- **Estilos** — SCSS global ou por componente
- **Roteamento** — React Router DOM v6 (configurado em `App.tsx`)
- **Naming** — `camelCase` para funções/variáveis/hooks · `PascalCase` para componentes/tipos
- **URLs** — nunca hardcodar; usar variáveis de ambiente para API endpoint
- **Validação** — apenas nos boundaries (controllers Express, formulários React)

## Template de Tela (OBRIGATÓRIO)

**Toda página do app DEVE seguir este template.** Sem exceção — o PO, Tech Spec e Code devem garantir isso.

### Estrutura obrigatória

```tsx
<div className="board-page">          {/* wrapper raiz — flex column, height 100vh */}
  <header className="board-header">   {/* header fixo do app */}
    <div className="board-header__left">
      {/* logo FusionRun clicável → navega para /todos */}
      {/* separador "/" */}
      {/* nome da página atual */}
    </div>
    <div className="board-header__right">
      {/* avatar + nome do usuário (clicável → /profile) */}
      {/* botão Sair */}
    </div>
  </header>
  <main className="[page]-page">      {/* conteúdo da página */}
    ...
  </main>
</div>
```

### Referência de implementação

- **CSS do header:** `frontend/src/pages/board.scss` (classes `.board-header`, `.board-logo`, `.board-user`, `.board-btn-logout`)
- **Exemplo completo:** `frontend/src/pages/Todos.tsx` — copiar o bloco `<header>` como base
- **Rota `/todos`** é o ponto de entrada após login — o logo sempre volta para lá

### Checklist para qualquer nova tela

- [ ] Usa `<div className="board-page">` como wrapper raiz
- [ ] Tem `<header className="board-header">` com logo + nome da página + avatar + botão Sair
- [ ] Logo navega para `/todos` ao clicar
- [ ] Avatar do usuário navega para `/profile` ao clicar
- [ ] Importa `../board.scss` (ou caminho relativo correto) para herdar os estilos do header
- [ ] Tem SCSS próprio para o conteúdo interno da página

---

## Boas Práticas

- Types TypeScript sempre atualizados em `frontend/src/types/`
- `useCallback`/`useMemo` apenas com ganho real de performance
- Extrair para hooks/utils só quando reduzir complexidade real
- Não inventar APIs, endpoints ou componentes sem evidência no repositório

## Deployment

- Projeto usa `vercel.json` — validar configuração antes de deploy
- Express serve a API · Vite é dev server do frontend

---

## Jira

- **MCP:** Atlassian MCP (use sempre para ler/comentar tickets)
- **Projeto:** `LK` — https://rlecheta-gmail.atlassian.net/jira/software/projects/LK/
- **Formato de ticket:** `LK-<número>` (ex: `LK-16`)

---

## Squad Workflow (Skills)

O projeto usa skills do Claude Code para o ciclo completo de entrega.

### Fluxo completo

```
/fusion-feature-builder PROJ-123
```

Orquestra as 4 fases em sequência **sem pausas** — executa tudo automaticamente até o código estar escrito.

```
[1] Fusion PO        → refina AC no Jira
    ↓ (automático)
[2] Fusion Stitch    → cria screens por estado
    ↓ (automático)
[3] Fusion Tech Spec → gera spec técnica no Jira
    ↓ (automático)
[4] Fusion Code      → escreve os arquivos no projeto
```

### Fases isoladas

```bash
/fusion-po PROJ-123          # Só refinar o ticket
/fusion-stitch PROJ-123      # Só o design
/fusion-tech-spec PROJ-123   # Só a spec técnica
/fusion-code PROJ-123        # Só o código
```

### Regras do pipeline

- Executar todas as fases em sequência sem pedir confirmação humana
- Publicar no Jira e escrever arquivos diretamente — sem gates
- Cada fase depende da anterior — não gerar código sem tech spec no Jira
- Perguntas ao dev: máximo 1 rodada no início, só se faltar info impossível de inferir
