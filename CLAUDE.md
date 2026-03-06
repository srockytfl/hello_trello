```markdown
# CLAUDE.md

## Filosofia do Projeto

**Hello Trello** — Aplicação de quadro Kanban com frontend Angular e backend Express.

Funcionalidades principais:
- **Frontend** — Interface Angular 17 para gerenciamento de quadro
- **Backend** — API Express para persistência e lógica de negócio
- **Histórias** — Estrutura de tarefas em `tasks/` com artefatos de squad

## Stack

- **Runtime:** Node.js v16+
- **Frontend:** Angular 17 (TypeScript, RxJS, Angular Router, Angular Forms) — porta 4200
- **Backend:** Express 5 (CORS habilitado) — porta 3000
- **Testes:** Karma + Jasmine (frontend)
- **Deploy:** Vercel (vercel.json configurado)
- **Modelos LLM:** Sonnet (agentes principais) | Haiku (agentes rápidos)

## Estrutura

```
frontend/               # Angular 17 app
├── src/
│   ├── app/           # componentes e serviços
│   ├── assets/        # imagens, ícones, etc.
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── angular.json
├── package.json
├── proxy.conf.json    # proxy para /api → localhost:3000
└── tsconfig.json

server/               # Express backend (ou api/)
├── index.js          # entry point
└── package.json

tasks/                # artefatos de histórias de usuário
├── 1/
│   ├── US-1-trocar-cor-azul.txt
│   └── US-1-fullstack-done.md
├── 7/
│   ├── US-7-spec.md
│   ├── US-7-plan.md
│   ├── US-7-prd.md
│   └── US-7-fullstack-done.md
└── NNN/              # uma pasta por user story

CLAUDE.md             # este arquivo
package.json          # scripts da raiz
start.sh              # script de startup
```

## Comandos

- `npm run build` — instala dependências frontend, gera build produção, instala dependências server
- `npm start` — inicia o servidor Express (porta 3000)
- `cd frontend && npm start` — inicia dev server Angular (porta 4200 com proxy.conf.json)
- `cd frontend && npm run build` — gera build otimizado do Angular
- `cd frontend && npm test` — roda testes Karma/Jasmine
- `./start.sh` — script customizado de startup

## Estrutura de Tarefas (tasks/)

Cada história tem seu diretório numerado com artefatos:

```
tasks/NNN/
├── US-NNN-<nome>.txt          # requisitos em linguagem livre
├── US-NNN-spec.md             # especificação técnica (O QUE)
├── US-NNN-plan.md             # plano de implementação (COMO)
├── US-NNN-prd.md              # PRD (Product Requirements Document)
├── US-NNN-fullstack-done.md   # implementação concluída
├── US-NNN-execute-done.md     # resultado da execução (SDD)
├── US-NNN-validate.md         # validação/testes
└── US-NNN-review.md           # revisão final
```

## Convenções

- **Frontend** — componentes em `src/app/`, serviços injetáveis com `providedIn: 'root'`
- **Backend** — endpoints Express em `server/index.js`, CORS habilitado
- **Proxy** — `frontend/proxy.conf.json` redireciona `/api/*` para `localhost:3000`
- **Histórias** — arquivos em `tasks/NNN/` com prefixo `US-NNN`
- **Tipos** — TypeScript strict mode ativado (tsconfig.json)
- **Build** — `npm run build` constrói tudo e prepara para deploy Vercel

## Agentes Disponíveis

| Agente | Modelo | Papel |
|--------|--------|-------|
| PO | Haiku | Lê issue do GitHub, gera história estruturada |
| TL | Sonnet | Define contrato de API, decide agentes necessários |
| Dev Fullstack | Sonnet | Implementa backend + frontend |
| Dev Backend | Sonnet | Implementa endpoints Express |
| Dev Frontend | Sonnet | Implementa componentes Angular |
| QA | Sonnet | Escreve e valida testes |
| PR | Haiku | Push da branch + abre PR no GitHub |

## Fluxo de Trabalho

**Squad automático (`/squad NNN`):**
- PO → TL → Dev (backend/frontend) → QA → PR
- Sem pausas entre agentes
- Se QA APROVADO: PR chamado automaticamente
- Se QA REPROVADO: exibe bugs encontrados e para

**Modo manual (passo a passo):**
- O usuário dispara cada agente individualmente
- Útil para depuração ou refazer etapas específicas

## Restrições

- Nunca fazer `git push` sem confirmação explícita
- Angular CLI sempre via `npx @angular/cli@17` (não instalar globalmente)
- Proxy.conf.json deve estar configurado para dev local
- Todas as histórias devem ter backend (mesmo que stub retorne 200)

## Convenções de Código

- **TypeScript** — strict mode, tipos explícitos
- **Angular** — standalone components, lazy loading de rotas, RxJS observables
- **Express** — middlewares de CORS, validação em boundaries
- **Qualidade** — trate erros relevantes, valide inputs externos
- **Simplicidade** — prefira soluções diretas, sem over-engineering
```

## Squad Workflow

This workspace is being operated by a squad of AI agents.

Pipeline:
1. PO
2. TL
3. Backend + Frontend (parallel)
4. QA
5. PR

Flow: PO → TL → [Backend | Frontend] → QA → PR
