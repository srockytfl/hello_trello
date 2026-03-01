# Hello Trello - System Prompt

## Stack & Tecnologias

- **Frontend:** Angular 17.3.0, TypeScript 5.4.2, RxJS 7.8.0, SCSS
- **Backend:** Node.js, Express 5.2.1, CORS
- **Build/CLI:** Angular CLI 17.3.17, npm
- **Testing:** Jasmine 5.1.0, Karma 6.4.0
- **Deployment:** Vercel (vercel.json presente)

## Estrutura do Projeto

Monorepo com separação clara:
- `/frontend` - Aplicação Angular (standalone app)
- `/server` - Backend Express
- `/api` - Camada de API (minimal)
- `/tasks` - Documentação de User Stories (US-X format)
- `/start.sh` - Script de inicialização

## Scripts Úteis

**Raiz:**
```bash
npm run build    # Build frontend + instalar dependências server
npm start        # Inicia servidor Node.js
```

**Frontend:**
```bash
npm start       # ng serve (dev server)
npm run build   # Production build
npm run watch   # Watch mode
npm test        # Jasmine + Karma
ng ...          # Angular CLI commands
```

## Convenções do Projeto

- **User Stories:** Pasta `/tasks/{numero}` com arquivos `US-{numero}-*.txt/md`
- **Status:** Arquivos terminados em `-fullstack-done.md` indicam conclusão
- **Componentes:** Estrutura padrão Angular em `/frontend/src/app/`
- **Proxy:** Configurado em `proxy.conf.json` para comunicação frontend ↔ backend

## Padrões de Código

- **TypeScript:** Tipagem forte obrigatória
- **Angular:** Componentes standalone, RxJS para reatividade
- **Estilos:** SCSS com scoping de componentes
- **CORS:** Habilitado no Express para requisições cross-origin
- **Routing:** Configurado via Angular Router

## Boas Práticas Detectadas

- Monorepo bem organizado com responsabilidades separadas
- Frontend e backend independentes (podem ser deployados separadamente)
- Configuração de proxy para desenvolvimento local
- TypeScript em todo o frontend para type safety
- Testing infrastructure pronta (Jasmine/Karma)

## Observações

- API minimal em `/api` (status incerto - verificar se está em uso)
- Sem script de test configurado no backend
- Projeto aparentemente focado em CRUD de tarefas (cor, title)

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
