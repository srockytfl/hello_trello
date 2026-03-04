```markdown
# hello-trello - System Prompt para Agentes IA

## Stack & Tecnologias

- **Frontend**: Angular 17.3.0 + TypeScript 5.4.2 + SCSS
- **Backend**: Node.js + Express 5.2.1
- **Package Manager**: npm
- **Testing**: Jasmine/Karma (frontend)
- **Build/Deploy**: Vercel

## Estrutura do Projeto

```
hello-trello/
├── frontend/              # Aplicação Angular
│   ├── src/
│   │   ├── app/          # Componentes e lógica
│   │   ├── assets/       # Recursos estáticos
│   │   ├── main.ts       # Ponto de entrada
│   │   ├── index.html
│   │   └── styles.scss   # Estilos globais
│   ├── angular.json      # Configuração Angular
│   ├── tsconfig.json     # Configuração TypeScript
│   └── proxy.conf.json   # Proxy para backend em dev
├── server/               # API Express
│   └── index.js          # Servidor principal
├── api/                  # Utilitários/helpers API
├── tasks/                # Documentação de User Stories
│   └── {US-number}/      # Pasta por tarefa
└── package.json          # Root config
```

## Scripts Disponíveis

### Root
- `npm run build` - Instala deps frontend, build frontend, instala deps server
- `npm start` - Inicia servidor Express (production)
- `start.sh` - Script bash de inicialização

### Frontend
- `npm start` - Inicia dev server (ng serve, porta 4200)
- `npm run build` - Build otimizado para produção
- `npm run watch` - Watch mode para desenvolvimento
- `npm test` - Executa testes (Jasmine/Karma)

## Convenções do Projeto

### Nomenclatura
- Tasks: `US-{número}-{descrição}` (ex: `US-14-trocar-titulo-para-teste-1`)
- Versão: 1.0.0

### Estrutura de Tasks
Cada task em `tasks/{numero}/` contém:
- `US-X-fullstack-done.md` - Checklist de conclusão
- `US-X-prd.md` - Product Requirements (quando aplicável)
- `US-X-spec.md` - Especificação técnica (quando aplicável)
- `US-X-*.txt` - Requisitos/descrição da tarefa

### Tipo de Aplicação
Aplicação web estilo Trello com:
- Mudanças de cores e títulos
- Layout com header e footer
- Ícone de usuário no header
- Rodapé com copyright

## Boas Práticas Detectadas

1. **Monorepo**: Frontend e backend separados com dependências isoladas
2. **TypeScript**: Tipagem forte no frontend
3. **Proxy Development**: `proxy.conf.json` redireciona requisições para backend em dev
4. **CI/CD**: Suporte a Vercel (vercel.json)
5. **Documentação**: Tasks documentadas com PRD e specs
6. **CORS**: Express configurado com CORS para requisições cross-origin

## Fluxo Típico de Desenvolvimento

1. Desenvolvimento: `cd frontend && npm start` (dev server com proxy)
2. Backend: `cd server && node index.js` (porta padrão Express)
3. Build: `npm run build` (prepara para produção)
4. Deploy: Vercel (baseado em vercel.json)

## Porta Padrão
- Frontend dev: 4200
- Backend: não especificado no package.json (verificar index.js)

## Notas Importantes

- O build root instala dependências automaticamente
- Arquivo `api/index.js` pode conter utilitários compartilhados
- Tarefas marcadas com `fullstack-done.md` estão completas
- Proxy development permite requisições do frontend ao backend sem CORS durante dev
```

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
