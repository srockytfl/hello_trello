# CLAUDE.md

## Filosofia do Projeto

**Trello Clone** — Aplicação de gerenciamento de tarefas type-safe com arquitetura fullstack modular.

O projeto utiliza o **Claude Agent SDK** para orquestracao de squads de agentes autonomos que executam o ciclo completo de desenvolvimento — da issue ao PR — seguindo padrões estabelecidos em `tasks/`.

### Arquitetura

- **Frontend:** React 18 + TypeScript + Vite + SASS
- **Backend:** Express.js 5 com CORS
- **HTTP Client:** Axios para comunicação frontend ↔ backend
- **Testes:** Vitest (frontend)
- **Deploy:** Vercel (`vercel.json`)

### Plataforma

Funcionalidades principais:
- **User Stories (US)** — rastreadas em `tasks/N/` com histórico completo
- **Pipelines** — agentes coordenados via arquivos em `tasks/`
- **Desenvolvimento Fullstack** — frontend e backend em paralelo ou sequencial
- **Histórico de Artefatos** — specs, plans, PRDs, relatórios de implementação

## Regras para todos os agentes

Regras que se aplicam a TODOS os agentes, sem exceção:
- **Mantenha simples** — prefira soluções diretas e claras
- **Sem over-engineering** — sem abstrações desnecessárias, sem padrões avançados que não agreguem valor
- **Pragmatismo** — foque em entregar valor real
- **Type safety** — TypeScript obrigatório no frontend, tipos explícitos
- **Qualidade** — trate erros relevantes, valide inputs em boundaries

## Comandos

- `npm run dev` — inicia frontend em dev (Vite :5173)
- `npm start` — inicia server em produção (:3000)
- `npm run build` — gera build de produção do frontend + instala dependências do server
- `cd frontend && npm test` — roda testes Vitest do frontend
- `./start.sh` — script custom para iniciar aplicação (verificar conteúdo)

## Stack

- **Runtime:** Node.js 18+
- **Frontend:** React 18 (Vite) — porta :5173
- **Backend:** Express 5 — porta :3000
- **Linguagem:** TypeScript (frontend), JavaScript (backend)
- **CSS:** SASS (SCSS)
- **Testes:** Vitest 2.1+
- **Modelos LLM:** Sonnet (agentes principais) | Haiku (agentes rápidos)

## Estrutura

```
frontend/src/
├── pages/           # componentes de página (um diretório por rota)
├── services/        # serviços e hooks (HTTP, estado, lógica)
├── types/           # tipos TypeScript globais
├── App.tsx          # componente raiz
├── main.tsx         # entry point
└── styles.scss      # estilos globais

server/
├── index.js         # entry point (Express)
└── package.json

tasks/
├── N/               # uma pasta por US
│   ├── US-N-*.txt   # requisitos em linguagem livre
│   ├── US-N-spec.md # especificação técnica
│   ├── US-N-plan.md # plano de implementação
│   ├── US-N-prd.md  # product requirements document
│   └── US-N-*-done.md # artefatos de conclusão
└── ...
```

## Agentes disponíveis

Cada agente tem um papel definido no fluxo:

| Agente | Modelo | Papel |
|--------|--------|-------|
| Product Owner (PO) | Haiku | Estrutura os requisitos da issue |
| Tech Lead (TL) | Sonnet | Define contrato de API e arquitetura |
| Dev Fullstack | Sonnet | Implementa backend + frontend |
| QA | Sonnet | Escreve e executa testes |
| PR | Haiku | Push da branch + abre PR no GitHub |
| Create Issue | Haiku | Cria issue no GitHub |
| Close Issue | Haiku | Fecha issue, deleta branch, volta ao master |

## Convenções

- Novas páginas React → criar em `frontend/src/pages/<nome>/`
- Novos endpoints Express → registrar em `server/index.js` ou separar em `server/routes/` (conforme crescimento)
- Serviços React sempre com exportação named e tipagem TypeScript
- Variáveis de ambiente backend em `.env` (nunca commitar, usar `.env.example`)
- **Toda US tem backend** — mesmo que seja um stub que retorna `{ success: true }` com HTTP 200
- **URL base do backend** — nunca hardcodar `http://localhost:3000` no frontend. Usar variável de ambiente
- **Arquivos de teste** — sempre com prefixo `US-N-` no nome (ex: `US-123-create-card.spec.ts`)
- **React Components** — usar functional components + hooks, sem class components
- **Styling** — SASS/SCSS modules ou global `styles.scss`, sem CSS-in-JS
- **Routing** — React Router DOM v6, lazy loading quando apropriado

## Fluxo de Trabalho com Agentes

### Como os agentes se comunicam

Agentes não compartilham memória — toda comunicação é feita por **arquivos em `tasks/`**.

```
tasks/
└── N/
    ├── US-N-requisito.txt        ← usuário escreve o requisito
    ├── US-N-spec.md              ← PO/TL estrutura a história
    ├── US-N-api-contract.md      ← TL define o contrato da API
    ├── US-N-plan.md              ← TL define plano de implementação
    ├── US-N-prd.md               ← PO gera Product Requirements
    ├── US-N-fullstack-done.md    ← Dev Fullstack registra o que implementou
    ├── US-N-qa-report.md         ← QA registra resultado dos testes
    └── US-N-review.md            ← Review da implementação
```

### Papéis dos agentes

**PO (Product Owner)**
- Lê os requisitos de um **GitHub Issue** ou de um arquivo local em `tasks/N/`
- Transforma em história estruturada em `tasks/N/US-N-spec.md`
- Formato: contexto, história de usuário, critérios de aceitação, critérios de teste

**TL (Tech Lead)**
- Lê a história em `tasks/N/US-N-spec.md`
- Define o contrato da API em `tasks/N/US-N-api-contract.md` (endpoints, métodos, payloads, respostas)
- Define o plano de implementação em `tasks/N/US-N-plan.md`
- Documenta quais agentes são necessários

**Dev Fullstack**
- Lê a história + contrato de API + plano
- Implementa endpoints Express e componentes/páginas React simultaneamente
- Registra o que foi feito em `tasks/N/US-N-fullstack-done.md`

**QA**
- Lê a história + `*-done.md`
- Escreve testes em `frontend/` (Vitest)
- Testa manualmente ou via testes automatizados
- Registra resultado em `tasks/N/US-N-qa-report.md`
- Se APROVADO: faz push da branch e abre PR

### Fluxo completo

```
PO (cria branch us-N + requisitos)
  → TL (spec + api-contract + plan)
    → Dev Fullstack (implementa backend + frontend)
      → QA (testes + relatório)
        → PR (push + abre PR automaticamente se QA APROVADO)
          → usuário revisa e faz merge no GitHub  ← MANUAL
```

## MCP Servers

Nenhum MCP server configurado neste projeto. Testes rodam via Vitest.

## Skills disponíveis

| Comando | Descrição |
|---------|-----------|
| `/squad <N>` | Executa a squad completa para a US #N |
| `/create-issue <texto>` | Cria nova issue no GitHub |
| `/close-issue <N>` | Fecha issue #N, deleta branch, volta para master |

## Restrições

- Nunca fazer `git push` sem confirmação explícita
- Nunca usar `git add -A` sem revisar o que será commitado
- Agentes de QA só rodam testes E2E se o app estiver no ar (frontend :5173 + server :3000)
- TypeScript obrigatório — sem `any` sem justificativa

## Squad Workflow

This workspace is being operated by a squad of AI agents.

Pipeline:
1. Product Owner
2. Dev Fullstack
3. PR

Flow: Product Owner → Dev Fullstack → PR
