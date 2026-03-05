# CLAUDE.md

## Filosofia do Projeto

**Hello SDD — Sistema simplificado de desenvolvimento com histórias estruturadas.**

Regras que se aplicam a TODOS os agentes, sem exceção:
- **Mantenha simples** — prefira soluções diretas e claras
- **Sem over-engineering** — sem abstrações desnecessárias
- **Pragmatismo** — foque em entregar valor real
- **Qualidade** — trate erros relevantes, valide inputs em boundaries

## Comandos

- `npm start` — inicia o servidor Express (porta configurada em server/)
- `npm run build` — instala dependências e faz build do frontend + backend
- `cd frontend && npm start` — inicia Angular dev server (ng serve)
- `cd frontend && npm run build` — gera build de produção do frontend
- `cd frontend && npm test` — roda testes Karma + Jasmine

## Stack

- **Runtime:** Node.js
- **Frontend:** Angular 17.3 (TypeScript, SCSS, Karma + Jasmine)
- **Backend:** Express 5.2
- **Proxy:** Configurado em `frontend/proxy.conf.json`
- **Deploy:** Vercel

## Estrutura

```
frontend/
├── src/
│   ├── app/            # componentes e serviços Angular
│   ├── assets/         # arquivos estáticos
│   ├── index.html      # template HTML
│   ├── main.ts         # entry point
│   └── styles.scss     # estilos globais
├── angular.json        # config Angular CLI
├── tsconfig.json       # config TypeScript
└── proxy.conf.json     # proxy para API

server/
└── index.js            # entry point Express

api/
└── index.js            # (verificar propósito)

tasks/
├── 1/
│   ├── US-1-trocar-cor-azul.txt       # história em linguagem livre
│   └── US-1-fullstack-done.md         # resultado da implementação
└── 85/
    ├── US-85-tema-azul.txt            # história
    └── US-85-fullstack-done.md        # resultado

CLAUDE.md                # este arquivo
```

## Convenções

- Histórias em `tasks/NNN/US-NNN-*.txt` (requisitos em linguagem livre)
- Resultado da implementação em `tasks/NNN/US-NNN-fullstack-done.md`
- **Sem separação backend/frontend** — todas as histórias são fullstack
- Frontend comunica com backend via proxy configurado em `frontend/proxy.conf.json`
- Serviços Angular sempre em `frontend/src/app/services/` com `providedIn: 'root'`
- Variáveis de ambiente do servidor em `.env` (nunca commitar)

## Fluxo de Trabalho

1. **Escrever requisitos** em `tasks/NNN/US-NNN-<nome>.txt` (linguagem livre)
2. **Implementar** — modificar frontend e backend conforme necessário
3. **Registrar resultado** em `tasks/NNN/US-NNN-fullstack-done.md` com o que foi feito
4. **Testar** — rodar `npm test` (frontend) ou testes manuais

## Restrições

- Não instalar o Angular CLI globalmente
- Proxy do frontend aponta para o servidor — nunca hardcodar URLs de API
- Deploy em Vercel — verificar compatibilidade antes de commit

## Workflow da Squad

A squad executa os agentes na seguinte ordem:

1. **SDD Spec**
2. **SDD Plan**
3. **SDD Execute**
4. **SDD Review**

Fluxo: SDD Spec → SDD Plan → SDD Execute → SDD Review

### Resumo de tempo

Ao final do fluxo, exibir tabela com tempos de cada agente:

| Agente | Duracao (mm:ss) |
|--------|------------------|
| SDD Spec | XX:XX |
| SDD Plan | XX:XX |
| SDD Execute | XX:XX |
| SDD Review | XX:XX |
| **Total** | **XX:XX** |
