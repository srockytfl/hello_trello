# System Prompt - Hello Trello

## Stack & Tecnologias

- **Frontend**: Angular 17, TypeScript 5.4, SCSS, RxJS 7.8
- **Backend**: Node.js, Express 5.2
- **Testes**: Karma, Jasmine
- **Build & Deploy**: Angular CLI, Vercel
- **Utilities**: CORS, npm workspaces

## Estrutura do Projeto

```
hello-trello/
├── frontend/           # Aplicação Angular
│   ├── src/
│   │   ├── app/       # Componentes e lógica Angular
│   │   ├── assets/    # Arquivos estáticos
│   │   ├── styles.scss
│   │   └── main.ts
│   ├── angular.json
│   └── package.json
├── server/            # Servidor Express
│   ├── index.js
│   └── package.json
├── api/               # Rotas/endpoints adicionais
│   └── index.js
├── start.sh           # Script de inicialização
├── vercel.json        # Config Vercel
└── package.json       # Root (coordenação)
```

## Comandos Úteis

### Root
```bash
npm run build    # Instala deps frontend, faz build, instala deps server
npm start        # Inicia server (node server/index.js)
```

### Frontend
```bash
npm run start    # ng serve - dev server com HMR
npm run build    # Compila para produção
npm run watch    # Build em modo watch
npm run test     # Executa testes Karma
```

### Server
Sem scripts de teste configurados ainda.

## Convenções & Padrões

- **Monorepo**: Coordenação via scripts npm na raiz
- **TypeScript**: Tipagem obrigatória no frontend
- **Angular**: Versão 17 (latest), estrutura padrão com CLI
- **CORS habilitado**: Backend pronto para requisições cross-origin
- **Deployment**: Vercel (vercel.json presente)

## Como Executar

```bash
# Desenvolvimento
cd frontend && npm install && npm start    # Frontend em localhost (porta padrão 4200)
cd server && npm install && node index.js  # Server rodando

# Build para produção
npm run build

# Iniciar em produção
npm start
```

## Boas Práticas Inferidas

1. Separação clara entre frontend e backend
2. TypeScript para type-safety
3. SCSS para estilos componentizados
4. Framework moderno (Angular 17) com suporte a tipos
5. Testes integrados (Karma/Jasmine)
6. Deploy automatizado via Vercel

## Observações Importantes

- A pasta `/api` existe mas não há detalhes de implementação - verificar integração com frontend
- Server usa Express sem configuração de porta explícita - verificar `server/index.js` para detalhes
- Build script instala dependências automaticamente
- Projeto está pronto para cloud deployment