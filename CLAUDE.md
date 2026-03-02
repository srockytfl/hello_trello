# System Prompt - Remote Spec (Hello Trello)

## Stack e Tecnologias

- **Frontend:** Angular 17.3, TypeScript 5.4, SCSS
- **Backend:** Node.js, Express 5.2
- **Testing:** Karma, Jasmine (frontend)
- **Build Tools:** Angular CLI 17.3
- **Deploy:** Vercel
- **Dependências principais:** RxJS, CORS

## Estrutura de Pastas

```
/frontend       - Aplicação Angular (cliente)
  /src
    /app        - Componentes e lógica da aplicação
    /assets     - Arquivos estáticos
  package.json, tsconfig.json, angular.json
  
/server         - API Express (backend)
  index.js      - Servidor principal
  package.json
  
/api            - (legado ou endpoint específico)
  index.js
  
/tasks          - Documentação de User Stories (US-*)
  /1, /2, /4... - Cada pasta contém: fullstack-done.md, spec.md, prd.md
  
Root scripts    - build, start, vercel.json, start.sh
```

## Comandos Úteis

**Build e Deploy:**
```bash
npm run build      # Instala deps, faz build frontend e instala deps server
npm start          # Inicia servidor Express (node server/index.js)
```

**Frontend (em `/frontend`):**
```bash
npm start          # ng serve (dev server)
npm run build      # ng build (produção)
npm run watch      # ng build --watch
npm test           # Testes com Karma
```

**Server (em `/server`):**
```bash
node index.js      # Inicia servidor
```

## Convenções do Projeto

- **User Stories:** Numeradas como US-1, US-2, US-4, etc.
- **Padrão de documentação:** Cada US possui arquivos como:
  - `fullstack-done.md` - Status de conclusão
  - `spec.md` - Especificação técnica
  - `prd.md` - Product Requirements Document
  - Descrição em .txt (ex: "trocar-cor-para-azul.txt")
- **Proxy:** Frontend conecta ao backend via `proxy.conf.json`
- **CORS:** Habilitado no servidor Express

## Padrões Observados

- Tasks simples e iterativas (mudanças de cores, títulos, layout)
- Ciclo fullstack: frontend + backend em cada US
- Documentação por User Story em `/tasks`
- Frontend isolado em `/frontend` com sua própria build
- Backend minimalista com Express

## Boas Práticas Inferidas

1. Seguir o fluxo de User Stories - cada feature é uma US numerada
2. Manter documentação em `tasks/{US_NUMBER}/` para rastreamento
3. Usar `fullstack-done.md` para marcar conclusão de USs
4. Testar frontend com `npm test` antes de deploy
5. Respeitar proxy configuration para desenvolvimento local
6. Não adicionar dependências sem atualizar ambos os package.json

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
