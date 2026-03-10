# CLAUDE.md

## Filosofia do Projeto

**Trello Clone** — Aplicação fullstack para gerenciamento de tarefas com React frontend e Express backend.

O projeto segue arquitetura monorepo com agentes de IA coordenados via arquivos em `tasks/` para implementação de histórias de usuário (US) do backlog.

### Arquitetura

- **Frontend** — React 18 + TypeScript + Vite (porta 5173 por padrão)
- **Backend** — Express 5 com CORS habilitado (porta definido em `server/index.js`)
- **Comunicação** — Axios para chamadas HTTP
- **Estrutura** — Monorepo com `frontend/`, `server/` e `tasks/` para artefatos

### Plataforma

Histórias de usuário são orquestradas via agentes que se comunicam através de arquivos:

- **PO** — Lê requisitos, estrutura a história em `tasks/NNN/US-NNN-*.txt`
- **TL** — Define contrato de API em `US-NNN-api-contract.md` ou `US-NNN-plan.md`
- **Dev Fullstack** — Implementa backend + frontend, registra em `US-NNN-fullstack-done.md`
- **Dev Backend** — Implementa apenas server, registra em `US-NNN-backend-done.md`
- **Dev Frontend** — Implementa apenas React, registra em `US-NNN-frontend-done.md`
- **QA** — Testa e registra em `US-NNN-qa-report.md`

## Regras para todos os agentes

- **Mantenha simples** — soluções diretas e pragmáticas
- **Sem over-engineering** — sem abstrações desnecessárias
- **TypeScript obrigatório** — types explícitos em frontend
- **SCSS para estilos** — arquivo `styles.scss` como base
- **API REST** — endpoints JSON simples, sem GraphQL
- **Validação nas boundaries** — inputs do usuário (frontend) + requests (backend)

## Comandos

- `npm run dev` — inicia frontend Vite (:5173) apenas
- `npm start` — inicia servidor Express apenas
- `npm run build` — build frontend + install dependências do server
- `npm run preview` — preview de build do frontend
- `npm run test` — roda testes Vitest (frontend)

## Stack

- **Runtime:** Node.js v18+
- **Frontend:** React 18, TypeScript 5.6, Vite 5.4, SCSS — porta 5173
- **Backend:** Express 5, CORS habilitado — porta a definir em `server/index.js`
- **HTTP Client:** Axios 1.7.7
- **Roteamento:** React Router 6
- **Testes:** Vitest 2.1.4
- **Build:** Vite + TypeScript

## Estrutura

```
frontend/src/
├── pages/              # páginas React (um diretório por página)
├── services/           # serviços (HttpClient, hooks customizados)
├── types/              # tipos TypeScript compartilhados
├── App.tsx             # componente raiz
├── main.tsx            # entry point
└── styles.scss         # estilos globais

server/
└── index.js            # Express app — rotas e handlers

tasks/
└── NNN/                # artefatos da US-NNN
    ├── US-NNN-*.txt    # requisitos originais
    ├── US-NNN-spec.md  # especificação técnica
    ├── US-NNN-plan.md  # plano de implementação
    ├── US-NNN-api-contract.md  # contrato da API
    ├── US-NNN-prd.md   # requisitos de produto
    └── US-NNN-*-done.md # registro de conclusão (backend/frontend/fullstack/qa)
```

## Convenções

- **Novas páginas React** → criar em `frontend/src/pages/<nome>/` com `<nome>.tsx` + `<nome>.scss`
- **Novos endpoints** → adicionar em `server/index.js` com rota Express clara
- **Tipos reutilizáveis** → em `frontend/src/types/` com sufixo `.ts`
- **Serviços HTTP** → em `frontend/src/services/` (usar Axios, tipado com TypeScript)
- **Variáveis de ambiente** → `.env` no frontend, nunca hardcodar URLs (usar variável `VITE_API_URL`)
- **Estilos** → SCSS em arquivo separado por página, importar em component
- **Arquivos de teste** — `US-NNN-*.spec.ts` em `frontend/src/` para evitar colisões
- **Git: branch por US** — `us-NNN` para cada história
- **Toda US tem contrato de API** — mesmo que mínimo, documentar em `US-NNN-api-contract.md`

## Fluxo de Trabalho

1. **PO** lê requisito → escreve `tasks/NNN/US-NNN-*.txt`
2. **TL** define `US-NNN-api-contract.md` e marca `backend:` e `frontend:`
3. **Dev Backend** OU **Dev Fullstack** implementa server
4. **Dev Frontend** OU **Dev Fullstack** implementa React (pode rodar em paralelo)
5. **QA** testa (rodar `npm run dev` e `npm start` antes) → registra resultado
6. Se OK → PR + merge manual

## Agentes necessários

| Agente | Modelo | Função |
|--------|--------|--------|
| PO | Haiku | Estrutura requisitos |
| TL | Sonnet | Define contrato + decisões de arquitetura |
| Dev Fullstack | Sonnet | Backend + Frontend na mesma passada |
| Dev Backend | Sonnet | Apenas server |
| Dev Frontend | Sonnet | Apenas React |
| QA | Sonnet | Testes + validação |
| PR | Haiku | Push + abre PR |

## Iniciar desenvolvimento

```bash
# Terminal 1 — Frontend
npm run dev

# Terminal 2 — Backend
npm start
```

Frontend estará em `http://localhost:5173`, backend em `http://localhost:<PORTA>` (verificar `server/index.js`).

## Squad Workflow

This workspace is being operated by a squad of AI agents.

Pipeline:
1. Product Owner
2. Dev Fullstack
3. PR

Flow: Product Owner → Dev Fullstack → PR
