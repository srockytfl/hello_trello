# US-14 Fullstack — Trocar Título para Teste 1

## Resumo

Alteração do título da aplicação de `'Teste Cores'` para `'Teste 1'`, com exposição de endpoints REST e serviço Angular reativo.

---

## Backend

### Arquivos modificados
- `server/index.js`

### Mudanças
- `appTitle` alterado de `'Teste Cores'` para `'Teste 1'`
- Log de inicialização adicionado: `console.log('Título atual: Teste 1')`
- Endpoint `PUT /api/title` adicionado:
  - Valida que `title` não está vazio (400 `{ error: 'Título é obrigatório' }`)
  - Atualiza `appTitle` em memória
  - Retorna `{ title: appTitle }`
  - Logs: sucesso (`Título atualizado para: ...`) e erro de validação

### Endpoints
| Método | Rota        | Descrição                        | Resposta 2xx               |
|--------|-------------|----------------------------------|----------------------------|
| GET    | /api/title  | Retorna título atual             | `{ "title": "Teste 1" }`   |
| PUT    | /api/title  | Atualiza título (body: {title}) | `{ "title": "<novo>" }`    |

---

## Frontend

### Arquivos modificados
- `frontend/src/app/services/api.service.ts`
- `frontend/src/app/services/title.service.ts`

### Mudanças

#### `api.service.ts`
- Adicionado método `updateTitle(title: string)` que faz `PUT /api/title`

#### `title.service.ts`
- Signal `appTitle` inicializado com `'Teste 1'` (antes: `'Teste Cores'`)
- Fallback de erro atualizado para `'Teste 1'`
- Adicionado método `updateTitle(newTitle: string)` que chama `api.updateTitle()` e atualiza o signal reativamente

### Serviços
| Serviço       | Método          | Descrição                            |
|---------------|-----------------|--------------------------------------|
| TitleService  | `load()`        | GET /api/title ao inicializar        |
| TitleService  | `updateTitle()` | PUT /api/title + atualiza signal     |
| ApiService    | `getTitle()`    | GET /api/title                       |
| ApiService    | `updateTitle()` | PUT /api/title                       |

### Exibição
O título `'Teste 1'` é exibido no header da página `/todos` via `{{ titleService.appTitle() }}` (já existia no `TodosComponent`).

---

## Fluxo de Persistência
1. Usuário acessa a aplicação
2. `TitleService` carrega via `GET /api/title` → backend retorna `{ title: "Teste 1" }`
3. Signal `appTitle` é atualizado para `"Teste 1"`
4. `TodosComponent` renderiza `"Teste 1"` no header
5. Após recarregar a página, o ciclo se repete e o título persiste (em memória)

---

## Critérios de Aceitação Atendidos
- [x] Endpoint GET `/api/title` retorna `{ "title": "Teste 1" }`
- [x] Endpoint PUT `/api/title` aceita novo título e retorna conforme contrato
- [x] Validação de título (não vazio) implementada no backend
- [x] Serviço `TitleService` atualizado com fallback `'Teste 1'`
- [x] Método `updateTitle` disponível no `TitleService` e `ApiService`
- [x] Título "Teste 1" exibido na interface (página /todos)
- [x] Título persiste após recarregar a página
- [x] Logs básicos implementados no servidor
