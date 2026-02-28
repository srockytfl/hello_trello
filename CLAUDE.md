# CLAUDE.md - Sistema de Contexto: Hello Trello (Todo List)

## 📋 Visão Geral
Aplicação Todo List tipo Trello com arquitetura monorepo. Frontend em Angular + Backend em Node.js/Express.

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: Angular 17.3.0
- **Linguagem**: TypeScript 5.4.2
- **Styling**: SCSS
- **Reatividade**: RxJS 7.8.0
- **Testes**: Jasmine 5.1.0 + Karma 6.4.0
- **Build Tool**: Angular CLI 17.3.17

### Backend
- **Runtime**: Node.js
- **Framework**: Express 5.2.1
- **CORS**: Habilitado para requisições cross-origin

### Deployment
- Vercel (configuração presente)

## 📁 Estrutura de Pastas

```
/
├── frontend/          # Aplicação Angular
│   ├── src/
│   │   ├── app/       # Componentes e lógica da aplicação
│   │   ├── assets/    # Recursos estáticos
│   │   ├── styles.scss
│   │   ├── main.ts    # Ponto de entrada
│   │   └── index.html
│   ├── angular.json   # Configuração Angular
│   └── tsconfig.json
├── server/            # Backend Express
│   └── index.js
├── api/               # (pasta presente, conteúdo não mapeado)
├── start.sh           # Script de inicialização
├── vercel.json        # Configuração de deployment
└── package.json       # Scripts raiz
```

## 🚀 Comandos Úteis

| Comando | Descrição |
|---------|-----------|
| `npm run build` | Build frontend + instala dependências do server |
| `npm start` | Inicia servidor (node server/index.js) |
| `cd frontend && npm start` | Dev server Angular (ng serve) |
| `cd frontend && npm run build` | Build produção do Angular |
| `cd frontend && npm test` | Executa testes com Karma |
| `cd frontend && npm run watch` | Watch mode para desenvolvimento |

## 📐 Convenções e Padrões

- **Monorepo**: Frontend e backend em pastas separadas com package.json próprios
- **TypeScript**: Tipagem forte obrigatória no frontend
- **CORS**: Backend configurado para requisições cross-origin
- **Modularidade Angular**: Uso de componentes, serviços e módulos
- **Build integrado**: Script raiz automatiza build frontend + setup server

## ✅ Boas Práticas Detectadas

1. Arquitetura separada (frontend/server) facilita manutenção e deploy independente
2. TypeScript no frontend garante type-safety
3. Testes automatizados configurados (Jasmine/Karma)
4. Configuração de staging (Vercel) pronta
5. Scripts de automatização claros e simples

## 📝 Notas Importantes

- **Deployment**: Usa Vercel - verificar `vercel.json` para configurações
- **Comunicação**: Frontend → Backend via API, CORS habilitado
- **Testes**: Executar `npm test` dentro de `frontend/` antes de deployar
- **Build**: Sempre rodar `npm run build` da raiz antes de `npm start`