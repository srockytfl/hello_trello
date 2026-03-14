```markdown
# CLAUDE.md — hello_trello

## Stack Tecnológico

- **Frontend:** React 18 + TypeScript + Vite + Sass + React Router DOM 6
- **Backend:** Node.js + Express 5 + CORS
- **Cliente HTTP:** Axios
- **Testes:** Vitest
- **Porta Backend:** Inferido (padrão Express: 3000)
- **Porta Frontend:** Vite dev server (padrão: 5173)

## Estrutura do Projeto

```
frontend/
  ├── src/
  │   ├── pages/          # Páginas React
  │   ├── services/       # Serviços Axios (HTTP client)
  │   ├── types/          # Definições TypeScript
  │   ├── App.tsx         # Componente raiz
  │   ├── main.tsx        # Entry point
  │   └── styles.scss     # Estilos globais
  ├── index.html          # Template HTML
  └── vite.config.ts      # Config Vite

server/
  └── index.js            # Express API

api/
  └── index.js            # Código de cliente/reutilizável (verificar uso)

tasks/
  └── <N>/                # Artefatos de histórias (US-NNN-*.md/txt)
      ├── US-N-spec.md
      ├── US-N-prd.md
      ├── US-N-plan.md
      ├── US-N-fullstack-done.md
      └── US-N-qa-report.md
```

## Comandos

**Raiz:**
```bash
npm run dev            # Inicia frontend em dev (Vite)
npm run build          # Build de produção (instala deps, faz build frontend + prepara server)
npm run start          # Inicia server em produção
./start.sh             # Script customizado de inicialização
```

**Frontend:**
```bash
cd frontend && npm start     # Vite dev server
cd frontend && npm run build # Produção
cd frontend && npm test      # Vitest
```

**Server:**
```bash
cd server && node index.js   # Inicia Express
```

## Convenções

- **Histórias de Usuário** — armazenadas em `tasks/<N>/` com padrão `US-<N>-<tipo>.md`
  - Tipos: `spec`, `prd`, `plan`, `execute-done`, `fullstack-done`, `qa-report`
- **Páginas React** — criar em `frontend/src/pages/<nome>/` com componentes standalone
- **Serviços HTTP** — criar em `frontend/src/services/` com Axios
- **Tipos TypeScript** — manter em `frontend/src/types/`
- **Estilos** — Sass global em `frontend/src/styles.scss` ou SCSS por componente
- **Roteamento** — React Router DOM v6 (verificar `App.tsx` para configuração)

## Padrão de Squad

O projeto segue fluxo de agentes (Fusion AI):
- **PO** → analisa requisitos
- **TL** → define contrato de API
- **Backend/Frontend** → implementação paralela
- **QA** → testes e validação
- **PR** → abertura de pull request

Artefatos são salvos em `tasks/<N>/` para comunicação entre agentes.

## Notas

- Projeto usa `vercel.json` — validar configuração de deployment
- Express é responsável por servir API; Vite é dev server do frontend
- TypeScript em ambos frontend (strict) e package.json version pinned
- Axios configurado para comunicação com backend — verificar baseURL em serviços

## Boas Práticas

- Mantenha types TypeScript atualizados em `frontend/src/types/`
- Serviços de HTTP sempre em `frontend/src/services/` com AxiosInstance
- Evite hardcoding URLs — use variáveis de ambiente para API endpoint
- Validação de entrada em boundaries (controllers Express, formulários React)
- Testes em Vitest para lógica isolada; E2E via Playwright se disponível
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
