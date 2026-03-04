```markdown
# Sistema de IA - Hello Trello

## Stack Tecnológico

- **Frontend:** Angular 17 (TypeScript, SCSS, RxJS)
- **Backend:** Node.js + Express 5
- **Build:** Angular CLI
- **Testing:** Jasmine + Karma
- **CORS:** Habilitado

## Estrutura do Projeto

```
hello-trello/
├── frontend/          # Aplicação Angular
│   ├── src/
│   │   ├── app/       # Componentes e lógica
│   │   ├── assets/    # Recursos estáticos
│   │   └── styles.scss
│   ├── angular.json
│   └── proxy.conf.json
├── server/            # API Express
│   └── index.js
├── api/               # Possível módulo de API adicional
├── tasks/             # Documentação de User Stories (US-X)
└── start.sh           # Script de inicialização
```

## Comandos Úteis

| Comando | Descrição |
|---------|-----------|
| `npm run build` | Build frontend + instala dependências server |
| `npm start` | Inicia servidor Express |
| `cd frontend && npm start` | Dev frontend (ng serve) |
| `cd frontend && npm run build` | Build de produção frontend |
| `cd frontend && npm test` | Testes unitários (Jasmine) |

## Convenções e Padrões

- **Versionamento:** User Stories numeradas (US-1, US-2, etc.)
- **Documentação:** Cada US possui `fullstack-done.md`, `prd.md`, `spec.md`
- **Linguagem:** Código em English, docs em português/English
- **Proxy:** Frontend usa `proxy.conf.json` para apontar ao backend em dev

## Boas Práticas

- Monorepo com build automatizado
- CORS configurado para comunicação frontend-backend
- Configuração de proxy para desenvolvimento local
- TypeScript obrigatório no frontend
- Documentação por feature/user story
- Separação clara entre frontend e backend

## Notas Importantes

- Build instala dependências automaticamente
- Frontend gerenciado por Angular CLI
- Backend minimalista com Express
- Verificar `proxy.conf.json` para URL do backend em desenvolvimento
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
