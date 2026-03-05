# CLAUDE.md

## Filosofia do Projeto

**Squad Simples — Hello Trello**

Sistema simples para gerenciamento de tarefas. Foco em entregar valor real com máxima simplicidade.

Regras:
- **Mantenha simples** — sem over-engineering
- **Separação clara** — frontend e backend desacoplados via API
- **Qualidade** — trate erros e valide inputs nos boundaries
- **Consistência** — todas as histórias seguem o padrão US-N

## Stack

- **Runtime:** Node.js (específico: check `.nvmrc` ou documentação)
- **Frontend:** Angular 17.3 (standalone components) — porta 4200
- **Backend:** Express 5.2 — porta 3000
- **Linguagem:** TypeScript + SCSS
- **Testes:** Karma + Jasmine (Angular)
- **Deploy:** Vercel (vercel.json presente)

## Comandos Principais

```bash
# Instalar dependências (frontend + server)
npm run build

# Iniciar servidor (backend)
npm start

# Desenvolver frontend
cd frontend && npm start

# Testes frontend
cd frontend && npm test

# Build produção frontend
cd frontend && npm run build
```

## Estrutura

```
server/
├── index.js              # Express app — endpoints da API
└── package.json

frontend/
├── src/
│   ├── app/              # componentes Angular
│   ├── assets/           # imagens, ícones, etc.
│   ├── styles.scss       # estilos globais
│   ├── index.html        # HTML principal
│   └── main.ts           # entry point
├── angular.json          # config Angular
├── proxy.conf.json       # proxy para /api → http://localhost:3000
└── package.json

tasks/
├── 1/                    # artefatos da US-1
│   ├── US-1-spec.md
│   ├── US-1-plan.md
│   ├── US-1-prd.md
│   ├── US-1-execute-done.md
│   ├── US-1-review.md
│   └── US-1-fullstack-done.md
└── N/                    # pasta por história

CLAUDE.md                 # este arquivo
vercel.json              # config deploy Vercel
```

## Convenções

- **Histórias:** todo trabalho é organizado em `tasks/N/US-N-<nome>.txt` (N = número)
- **Artefatos:** cada história gera `spec.md`, `plan.md`, `prd.md`, `execute-done.md`, `review.md`, `fullstack-done.md`
- **Backend:** todos os endpoints retornam JSON (sucesso ou erro)
- **Frontend:** sempre usar `proxy.conf.json` para chamar `/api` (nunca hardcodar `http://localhost:3000`)
- **Componentes:** um diretório por página/componente (TypeScript + HTML + SCSS)
- **Serviços Angular:** prefixo `*.service.ts` e usar `providedIn: 'root'`

## Fluxo de Trabalho

1. **Requisitos** → arquivo `tasks/N/requisitos-N-<nome>.txt` ou GitHub Issue
2. **PO transforma em história** → `tasks/N/US-N-<nome>.txt` (contexto, critérios, escopo)
3. **TL define contrato** → `tasks/N/US-N-plan.md` (endpoints, payloads, responses)
4. **Backend implementa** → endpoints no Express seguindo o contrato
5. **Frontend implementa** → componentes/páginas Angular chamando `/api`
6. **QA testa** → validação E2E com Karma ou testes manuais
7. **Registra conclusão** → `tasks/N/US-N-fullstack-done.md`

## Proxy para Desenvolvimento

O arquivo `frontend/proxy.conf.json` redireciona chamadas `/api/*` para o servidor backend.

**Ao desenvolver:**
- Inicie o backend (`npm start` na raiz ou `node server/index.js`)
- Inicie o frontend (`cd frontend && npm start`)
- Chamadas de API usam `this.http.get('/api/...')` automaticamente redirecionadas para `http://localhost:3000/api/...`

## Deploy

- **Vercel:** `vercel.json` presente — deploy automático via CI/CD
- **Build:** `npm run build` prepara frontend + server
- **Start:** `npm start` executa o servidor

## Boas Práticas

- **Um agente por história** — evita conflitos e mantém rastreabilidade
- **Commits explicativos** — referencia a US (ex: `feat: US-14 trocar título`)
- **Testes manuais aceitáveis** — projeto simples, Karma/Jasmine para casos críticos
- **Valide no backend** — nunca confie apenas em validação do frontend
- **CORS habilitado** — Express está configurado para aceitar requisições cross-origin

## Workflow da Squad

A squad executa os agentes na seguinte ordem:

1. **PO**
2. **Fullstack**
3. **PR**

Fluxo: PO → Fullstack → PR

### Resumo de tempo

Ao final do fluxo, exibir tabela com tempos de cada agente:

| Agente | Duracao (mm:ss) |
|--------|------------------|
| PO | XX:XX |
| Fullstack | XX:XX |
| PR | XX:XX |
| **Total** | **XX:XX** |
