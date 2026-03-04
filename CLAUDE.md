# Sistema - hello_trello

## 🏗 Stack & Tecnologias

- **Frontend:** Angular 17.3.0, TypeScript 5.4.2, SCSS
- **Backend:** Node.js, Express 5.2.1, CORS
- **Testes:** Jasmine 5.1.0, Karma, Karma Coverage
- **Build & Deploy:** Angular CLI, Vercel (vercel.json detectado)

## 📁 Estrutura Principal

```
hello_trello/
├── frontend/          # Aplicação Angular
│   ├── src/
│   │   ├── app/       # Componentes e módulos
│   │   ├── assets/    # Recursos estáticos
│   │   └── styles/    # SCSS global
│   ├── angular.json   # Configuração Angular
│   └── package.json   # Dependências frontend
├── server/            # Backend Express
│   ├── index.js       # Servidor principal
│   └── package.json   # Dependências backend
├── api/               # Scripts/utilitários API
├── tasks/             # Documentação de User Stories
│   └── US-{N}/        # (US-1, US-2, etc.)
└── package.json       # Root (scripts de build/start)
```

## 🚀 Comandos Úteis

| Comando | Descrição |
|---------|-----------|
| `npm run build` | Build frontend + instala dependências server |
| `npm start` | Inicia servidor Express |
| `cd frontend && ng serve` | Dev server Angular (porta 4200) |
| `cd frontend && ng build` | Build produção frontend |
| `cd frontend && ng test` | Executa testes Jasmine |
| `node server/index.js` | Inicia backend direto |

## 📋 Convenções do Projeto

- **User Stories:** Numeradas (US-1, US-2, ..., US-36)
- **Documentação por Task:** 
  - `prd.md` - Product Requirements
  - `spec.md` - Especificação técnica
  - `fullstack-done.md` - Checklist de conclusão
  - `execute-done.md` - Execução concluída
  - `review.md` - Revisão de código
  - `.txt` - Descrições de features
- **Proxy de Desenvolvimento:** `proxy.conf.json` para reqs ao backend

## ✅ Boas Práticas Observadas

- Separação clara frontend/backend (monorepo)
- Documentação estruturada por US (PRD → Spec → Review → Done)
- Build automatizado com npm scripts na raiz
- Testes configurados para frontend (Karma + Jasmine)
- CORS habilitado no backend
- TypeScript em todo frontend
- Versionamento (1.0.0)

## 🎨 Features Identificadas

- Sistema de cores configurável (azul, rosa, laranja, amarelo, verde)
- Header com ícone de usuário
- Footer com copyright e título customizável
- Comportamento de responsividade (footer intermitente)
- Integração PO → Dev → PR workflow

## 🔗 Proxy & Desenvolvimento

- Dev server Angular conecta ao backend via `proxy.conf.json`
- Reqs em localhost:4200 são repassadas ao servidor Express
- Certifique-se que server está rodando antes de `ng serve`

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
