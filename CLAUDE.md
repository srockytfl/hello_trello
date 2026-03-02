```markdown
# Hello Trello - System Prompt para Agentes de IA

## Stack & Tecnologias

- **Frontend:** Angular 17.3.0, TypeScript 5.4.2, RxJS 7.8.0, SCSS
- **Backend:** Node.js, Express 5.2.1, CORS
- **Testes:** Jasmine 5.1.0, Karma 6.4.0
- **Build:** Angular CLI 17.3.17, npm
- **Deploy:** Vercel (vercel.json configurado)

## Estrutura do Projeto

```
hello-trello/
├── frontend/              # Aplicação Angular SPA
│   ├── src/
│   │   ├── app/          # Componentes e lógica
│   │   ├── assets/       # Recursos estáticos
│   │   ├── styles.scss   # Estilos globais
│   │   └── main.ts       # Entry point
│   ├── angular.json      # Configuração Angular
│   ├── tsconfig.json     # TypeScript config
│   └── proxy.conf.json   # Proxy para API
├── server/                # Servidor Express
│   └── index.js          # Entrada do backend
├── api/                   # Utilitários/helpers API
│   └── index.js
├── tasks/                 # Documentação de User Stories
│   └── {US-number}/      # PRD, specs, fullstack-done
└── package.json          # Scripts raiz
```

## Scripts Principais

```bash
npm run build    # Instala deps e builda frontend + server
npm start        # Inicia servidor (cd server && node index.js)

# Frontend (em frontend/):
npm start        # ng serve (desenvolvimento)
npm run build    # ng build (produção)
npm run watch    # Build com watch mode
npm test         # Testes com Karma/Jasmine
```

## Convenções do Projeto

- **User Stories:** Organizadas em `tasks/{US-number}/` com:
  - `US-{number}-prd.md` - Requisitos
  - `US-{number}-spec.md` - Especificação técnica
  - `US-{number}-fullstack-done.md` - Checklist de conclusão
  - Arquivos `.txt` com tarefas específicas
- **Naming:** Componentes Angular em kebab-case
- **Estilos:** SCSS com arquivos globais em `src/styles.scss`

## Padrões & Boas Práticas

1. **Separação Frontend/Backend:**
   - Frontend comunica com backend via proxy (`proxy.conf.json`)
   - Backend expõe API em Express

2. **TypeScript:** Usado em produção no frontend

3. **Documentação:** Cada US inclui PRD e spec antes da implementação

4. **Deploy:** Configurado para Vercel

5. **Dependencies:** Lock files (`package-lock.json`) versionados

## Fluxo de Desenvolvimento

1. US criada em `tasks/{número}/` com PRD e spec
2. Implementação no frontend (`src/app/`) e/ou backend (`server/`)
3. Testes e build via `npm run build`
4. Marcação como completa em `fullstack-done.md`

## Informações Úteis

- **Versão atual:** 1.0.0
- **Node/npm:** Necessário para instalar e rodar
- **TypeScript:** Configurado tanto para app quanto para specs
- **CORS habilitado** no servidor para requisições frontend
```

## Workflow da Squad

Spec-Driven Development (SDD):

1. **SDD Spec** — Define O QUE fazer
2. **SDD Plan** — Define COMO fazer
3. **SDD Execute** — Implementa o codigo
4. **SDD Review** — Revisa e abre PR

Fluxo: SDD Spec → SDD Plan → SDD Execute → SDD Review
