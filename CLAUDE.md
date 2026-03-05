# CLAUDE.md

## O Produto

**Hello Trello** — Aplicação web para gerenciamento de tarefas e quadros estilo Trello.

Funcionalidades principais:
- **Frontend** — aplicação Angular 17 com interface reativa
- **Backend** — servidor Express para gerenciar dados de quadros e tarefas
- **Comunicação** — API REST entre frontend e server com CORS habilitado

## Stack

- **Runtime:** Node.js
- **Frontend:** Angular 17 (standalone components) + RxJS — porta 4200 (default ng serve)
- **Backend:** Express 5.2.1 — porta 3000 (padrão ou configurável)
- **Linguagem:** TypeScript (frontend), JavaScript (server)
- **Testes:** Jasmine + Karma (frontend)
- **Deploy:** Vercel (`vercel.json` configurado)
- **Proxy:** `frontend/proxy.conf.json` para redirecionar requisições locais ao server

## Estrutura

```
frontend/
  src/
    app/              # componentes e lógica Angular
    assets/           # imagens, fontes, etc.
  angular.json        # configuração Angular CLI
  proxy.conf.json     # proxy para desenvolvimento local
  tsconfig.json       # TypeScript config

server/
  index.js            # entry point Express

api/                  # (aparentemente legado/não utilizado)

start.sh              # script de inicialização
CLAUDE.md             # este arquivo
```

## Comandos

### Desenvolvimento

```bash
# Instalar dependências (frontend + server)
npm run build

# Iniciar apenas o frontend (http://localhost:4200)
cd frontend && npm start

# Iniciar apenas o server (http://localhost:3000)
cd server && node index.js

# Watch mode frontend (rebuild on changes)
cd frontend && npm run watch

# Testes frontend
cd frontend && npm test
```

### Produção

```bash
# Build frontend
npm run build

# Iniciar produção
npm start
```

## Convenções

- **Frontend** em `frontend/src/app/` — componentes, serviços, pipes
- **Backend** em `server/index.js` — rotas Express e handlers
- **Porta 4200** — ng serve (frontend)
- **Porta 3000** — server Express (backend)
- **Proxy local** — frontend/proxy.conf.json redireciona `/api/*` para o server durante dev
- **TypeScript** — tipo-safe no frontend; JavaScript simples no server
- **Standalone Components** — Angular 17 moderno, sem NgModules

## Notas

- Arquivo `api/` parece legado — verificar necessidade antes de usar
- CORS habilitado no server — permitir requisições do frontend
- Build automático instala dependências — não commitar `node_modules`
- Vercel configurado — deploy automático possível

## Workflow da Squad

A squad executa os agentes na seguinte ordem:

1. **SDD PRD**
2. **SDD Spec**
3. **SDD Execute**
4. **PR**

Fluxo: SDD PRD → SDD Spec → SDD Execute → PR

### Resumo de tempo

Ao final do fluxo, exibir tabela com tempos de cada agente:

| Agente | Duracao (mm:ss) |
|--------|------------------|
| SDD PRD | XX:XX |
| SDD Spec | XX:XX |
| SDD Execute | XX:XX |
| PR | XX:XX |
| **Total** | **XX:XX** |
