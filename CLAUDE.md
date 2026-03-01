# System Prompt - Squad Spec (hello_trello)

## Stack Tecnológico
- **Frontend:** Angular 17 + TypeScript 5.4 + SCSS
- **Backend:** Express.js 5.2 + Node.js
- **Build/Runtime:** npm, Angular CLI
- **Comunicação:** HTTP com CORS habilitado

## Estrutura de Projeto

```
squad-spec/
├── frontend/          # Aplicação Angular (port 4200)
│   ├── src/app/       # Componentes e lógica
│   ├── src/assets/    # Recursos estáticos
│   ├── src/styles.scss
│   └── angular.json   # Configuração Angular
├── server/            # Backend Express (port 3000)
│   └── index.js       # Servidor principal
├── api/               # Endpoints adicionais
├── tasks/             # User Stories documentadas
│   └── {US-NUMBER}/   # Cada story em pasta separada
└── vercel.json        # Deploy config
```

## Scripts Úteis

**Raiz:**
```bash
npm run build    # Instala deps frontend, faz build, instala deps server
npm start        # Inicia servidor (node server/index.js)
./start.sh       # Script de inicialização
```

**Frontend (`cd frontend`):**
```bash
ng serve         # Dev server (localhost:4200 com proxy)
ng build         # Build production
npm test         # Testes com Karma/Jasmine
ng watch         # Watch mode
```

**Server (`cd server`):**
```bash
node index.js    # Executa servidor Express
```

## Convenções do Projeto

- **User Stories:** Organizadas em `tasks/{numero}/` com padrão `US-{X}-descricao.{txt|md}`
- **Status:** Arquivo `US-X-fullstack-done.md` marca conclusão
- **Proxy:** Frontend em dev route para `http://localhost:3000` via `proxy.conf.json`
- **CORS:** Habilitado no server para aceitar requisições do frontend
- **TypeScript:** Usado no frontend; `tsconfig.json` com `tsconfig.app.json` e `tsconfig.spec.json` para testes

## Padrões Identificados

- Tarefas tipicamente envolvem mudanças **UI-focused** (cores, títulos, rodapé)
- Estrutura **monorepo** com frontend e backend acoplados em build
- **User Stories numeradas** com documentação de conclusão "fullstack"
- Proxy configurado para desenvolvimento local (frontend comunicando com backend local)

## Boas Práticas Inferidas

1. **Build:** Frontend build é pré-requisito antes de server; instalação automática de deps
2. **Desenvolvimento:** Use `ng serve` para frontend (com hot reload) e `node index.js` para server
3. **Deployment:** Configuração Vercel presente; likely serverless-ready
4. **Documentação:** Cada US tem arquivo markdown/txt com contexto
5. **Testing:** Estrutura Jasmine/Karma pronta no frontend
6. **Organização:** Separação clara entre `frontend/`, `server/` e `api/`

## Workflow da Squad

A squad executa os agentes na seguinte ordem:

1. **PRD**
2. **Spec**
3. **Fullstack**
4. **PR**

Fluxo: PRD → Spec → Fullstack → PR

### Resumo de tempo

Ao final do fluxo, exibir tabela com tempos de cada agente:

| Agente | Duracao (mm:ss) |
|--------|------------------|
| PRD | XX:XX |
| Spec | XX:XX |
| Fullstack | XX:XX |
| PR | XX:XX |
| **Total** | **XX:XX** |
