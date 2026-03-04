# Spec — US-14: Trocar Título para Teste 1

## Escopo Técnico
Derivado do PRD:
- Backend necessário: **SIM**
- Frontend necessário: **SIM**

---

## Contratos de API

### GET /api/title
- **Descrição:** Retorna o título atual da aplicação
- **Body:** N/A
- **Resposta 2XX:**
  ```json
  { "title": "Teste 1" }
  ```
- **Resposta 4XX:** N/A (endpoint sempre retorna 2XX)

### PUT /api/title
- **Descrição:** Atualiza o título da aplicação para um novo valor
- **Body:**
  ```json
  { "title": "novo título" }
  ```
- **Resposta 2XX:**
  ```json
  { "title": "novo título" }
  ```
- **Resposta 4XX:**
  ```json
  { "error": "Título é obrigatório" }
  ```

---

## Estrutura de Dados (em memória)

```javascript
// No servidor (server/index.js)
let appTitle = 'Teste 1';  // Valor alterado de 'Teste Cores' para 'Teste 1'
```

---

## Componentes Frontend

### TitleDisplayComponent (ou integração no layout)
- **Rota:** Exibido em todas as páginas relevantes (login, todos, profile)
- **Descrição:** Exibe o título da aplicação carregado via API
- **Elementos:**
  - Texto dinâmico com o título atual
  - Carregamento inicial via `TitleService`
- **Serviço associado:** `services/title.service.ts`

---

## Fluxo Técnico

### Carregamento Inicial
1. Frontend carrega a aplicação
2. Componente raiz (app.component) ou layout-raiz chama `TitleService.getTitle()`
3. Frontend realiza GET `/api/title`
4. Backend retorna `{ title: "Teste 1" }`
5. Frontend renderiza o título em localização visível (header/página)

### Atualização de Título (se necessário)
1. Sistema ou admin chama `TitleService.updateTitle(newTitle)`
2. Frontend realiza PUT `/api/title` com `{ title: "novo título" }`
3. Backend atualiza `appTitle` em memória
4. Backend retorna `{ title: "novo título" }`
5. Frontend atualiza a exibição do título na interface

### Persistência após Recarregamento
1. Usuário recarrega a página
2. Frontend novamente chama GET `/api/title`
3. Backend retorna o título armazenado em memória
4. Título é renderizado conforme passo anterior

---

## Tratamento de Erros

### Erro de Validação (PUT /api/title)
- Se o campo `title` estiver vazio ou ausente
- Resposta: `400 Bad Request`
- Mensagem: `{ "error": "Título é obrigatório" }`
- Frontend: Exibir mensagem de erro ao usuário

### Recurso Não Encontrado
- Não aplicável (GET sempre retorna, PUT atualiza)

### Erro Genérico
- Falha na requisição HTTP
- Frontend: Log de erro no console + fallback para título padrão ou placeholder

---

## Observabilidade Básica

### Logs Importantes
- Log ao iniciar servidor: `"Título atual: Teste 1"`
- Log ao receber PUT: `"Título atualizado para: {newTitle}"`
- Log de erros: `"Erro ao validar título: {motivo}"`

### Erros Visíveis
- Validação falha no PUT (título vazio)
- Falha ao carregar título no frontend (exibir placeholder)

---

## Decisões Técnicas

### Padrões Utilizados
- **Backend:** Express.js (conforme projeto existente)
- **Frontend:** Angular 17 com RxJS (conforme projeto existente)
- **Armazenamento:** Memória em processo (conforme padrão atual do projeto)
- **Comunicação:** HTTP REST via proxy.conf.json (conforme projeto existente)

### Libs Sugeridas
- Nenhuma nova lib necessária
- Usar `HttpClient` do Angular (já disponível)
- Usar `BehaviorSubject` do RxJS para reatividade (já disponível)

### Arquitetura de Integração
- Criar `TitleService` em `frontend/src/app/services/title.service.ts`
- Injetar serviço no componente raiz ou layout
- Usar `AppComponent` ou novo componente de header/layout para exibição

---

## Critérios Técnicos de Pronto

- [ ] Endpoint GET `/api/title` retorna `{ "title": "Teste 1" }`
- [ ] Endpoint PUT `/api/title` aceita novo título e retorna conforme contrato
- [ ] Validação de título (não vazio) implementada no backend
- [ ] Serviço `TitleService` criado e injetado no frontend
- [ ] Título "Teste 1" exibido em localização visível na interface
- [ ] Título persiste após recarregar a página
- [ ] Erros seguem padrão `{ "error": "mensagem" }`
- [ ] Fluxo técnico executa sem dependência externa (apenas em memória)
- [ ] Componentes frontend consomem apenas endpoints definidos
- [ ] Logs básicos implementados no servidor

---

## Suposições Técnicas

1. O título deve ser exibido no header ou layout da aplicação (localização específica será definida na implementação)
2. A persistência é em memória (conforme padrão atual), não há necessidade de banco de dados
3. O título é global para toda a aplicação (não varia por usuário)
4. A alteração do título é imediata (sem recarregar página no frontend após PUT)
5. O componente raiz ou um serviço interceptor fornecerá o título para todas as páginas
6. Não há restrição de acesso ao endpoint PUT (sem autenticação específica além do CORS existente)

---

## Dúvidas Técnicas em Aberto

1. **Localização exata do título na UI:** Em qual componente/header o título "Teste 1" deve ser exibido?
2. **Escopo de visibilidade:** O título deve aparecer em:
   - Todas as 3 páginas (login, todos, profile)?
   - Apenas na página principal (todos)?
   - No title do navegador (`<title>` HTML)?
3. **Trigger de atualização:** Como o título será alterado de "Teste Cores" para "Teste 1"?
   - Hardcoded na inicialização?
   - Via um endpoint de admin?
   - Manualmente no backend code?
4. **Comportamento após PUT:** Após atualizar o título via PUT, o frontend deve recarregar componentes ou usar RxJS para reatividade?
5. **Temporalidade:** A mudança para "Teste 1" é permanente no código ou apenas durante testes (e retorna após restart)?

---

## Observações Finais

- Esta US é simples e não requer over-engineering
- O padrão de dados em memória já está estabelecido no projeto
- A implementação será mínima: alterar `appTitle` e expor um endpoint PUT
- No frontend, basta criar um serviço e exibir o título em um local comum
- Seguir as convenções já existentes em `server/index.js` e `app.routes.ts`
