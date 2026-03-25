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

Orquestra as 4 fases em sequência, pausando em cada gate para confirmação:

```
[1] Fusion PO        → refina AC no Jira
    ↓ GATE: confirmar AC
[2] Fusion Stitch    → cria screens por estado
    ↓ GATE: confirmar design
[3] Fusion Tech Spec → gera spec técnica no Jira
    ↓ GATE: confirmar spec
[4] Fusion Code      → gera o código
    ↓ GATE: confirmar código → arquivos escritos
```

### Fases isoladas

```bash
/fusion-po PROJ-123          # Só refinar o ticket
/fusion-stitch PROJ-123      # Só o design
/fusion-tech-spec PROJ-123   # Só a spec técnica
/fusion-code PROJ-123        # Só o código
```

### Regras do pipeline

- Nunca pular uma fase sem confirmação explícita
- Cada fase depende da anterior — não gerar código sem tech spec no Jira
- Nunca publicar no Jira ou escrever arquivos sem gate de confirmação cumprido
- Em caso de dúvida em qualquer fase, parar e perguntar ao dev
