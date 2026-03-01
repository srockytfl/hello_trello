```markdown
# Hello Trello - System Prompt para Agentes de IA

## Stack Tecnológico

- **Frontend:** Angular 17.3.0, TypeScript 5.4.2, SCSS
- **Backend:** Node.js, Express 5.2.1, CORS
- **Build:** Angular CLI, npm
- **Deploy:** Vercel (vercel.json presente)

## Estrutura do Projeto

```
hello-trello/
├── frontend/          # Aplicação Angular
│   ├── src/
│   │   ├── app/       # Componentes e módulos
│   │   ├── assets/    # Recursos estáticos
│   │   └── styles.scss
│   ├── package.json
│   ├── angular.json
│   ├── tsconfig.json
│   └── proxy.conf.json
├── server/            # Servidor Express
│   ├── index.js
│   └── package.json
├── api/               # API (index.js)
├── tasks/             # User Stories versionadas (US-2, US-4, US-6, US-7)
├── start.sh           # Script de inicialização
├── vercel.json        # Configuração de deploy
└── package.json       # Root scripts
```

## Scripts Úteis

**Root:**
```bash
npm run build   # Build frontend + setup server
npm start       # Inicia servidor
```

**Frontend:**
```bash
npm start       # Serve local (ng serve)
npm run build   # Build produção
npm run watch   # Watch mode
npm test        # Testes Jasmine/Karma
```

## Convenções e Padrões

- **User Stories:** Organizadas em `/tasks/{numero}/` com descrição em markdown
- **Nomenclatura:** Nomes em inglês (ng, build, start), descrições em português
- **Configuração:** proxy.conf.json aponta frontend para backend
- **Linguagem:** TypeScript obrigatório no frontend
- **Testes:** Angular com Jasmine e Karma configurados

## Boas Práticas Observadas

1. Separação clara frontend/backend/api
2. Scripts build automatizados (npm run)
3. User Stories versionadas com documentação
4. Proxy configurado para desenvolvimento local
5. Suporte a deploy automático (Vercel)

## Dependências Principais

**Frontend:**
- @angular/* (core, forms, router, animations)
- rxjs (observables)
- TypeScript (strict typing)

**Backend:**
- express (framework HTTP)
- cors (cross-origin requests)

## Notas para Agentes

- Backend em `server/index.js` e `api/index.js` (verificar qual está ativo)
- Usar proxy.conf.json para rotas de API em desenvolvimento
- Frontend TypeScript: strict mode provável
- Tasks são versionadas - consultar `/tasks/` para histórico de mudanças
```

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
