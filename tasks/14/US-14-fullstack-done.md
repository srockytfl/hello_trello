# US-14 — Trocar Título para "Teste 1" — Fullstack Done

## Resumo

Atualização do título da aplicação para "Teste 1" em todos os pontos de exibição.

---

## Análise do Estado Anterior

| Local | Valor Anterior | Valor Atual |
|-------|---------------|-------------|
| `server/index.js` — `appTitle` | `'Teste 1'` | `'Teste 1'` ✅ (já correto) |
| `title.service.ts` — sinal padrão | `'Teste 1'` | `'Teste 1'` ✅ (já correto) |
| `login.component.ts` — header | `{{ titleService.appTitle() }}` | `{{ titleService.appTitle() }}` ✅ (já correto) |
| `todos.component.ts` — header | `'Teste 2'` (hardcoded) | `{{ titleService.appTitle() }}` ✅ **CORRIGIDO** |
| `index.html` — `<title>` | `'Hello Github'` | `'Teste 1'` ✅ **CORRIGIDO** |

---

## Endpoints

| Método | Rota | Resposta |
|--------|------|----------|
| GET | `/api/title` | `{ "title": "Teste 1" }` |

---

## Páginas / Componentes

| Componente | Arquivo | Mudança |
|------------|---------|---------|
| `TodosComponent` | `frontend/src/app/pages/todos/todos.component.ts` | Header agora usa `TitleService` (dinâmico via API) |
| `LoginComponent` | `frontend/src/app/pages/login/login.component.ts` | Sem alteração — já usava `TitleService` |

---

## Serviços

| Serviço | Arquivo | Situação |
|---------|---------|----------|
| `TitleService` | `frontend/src/app/services/title.service.ts` | Sem alteração — já retornava "Teste 1" |
| `ApiService` | `frontend/src/app/services/api.service.ts` | Sem alteração |

---

## Arquivos Criados / Modificados

### Modificados
- `frontend/src/app/pages/todos/todos.component.ts`
  - Import de `TitleService` adicionado
  - Header substituído de `'Teste 2'` (hardcoded) para `{{ titleService.appTitle() }}` (dinâmico)
  - `TitleService` injetado no constructor com visibilidade `public`
- `frontend/src/index.html`
  - `<title>` alterado de `Hello Github` para `Teste 1`

### Não Modificados (já corretos)
- `server/index.js` — `appTitle = 'Teste 1'`
- `frontend/src/app/services/title.service.ts`
- `frontend/src/app/pages/login/login.component.ts`

---

## Critérios de Aceitação — Verificação

- [x] O título exibido na tela é "Teste 1" (login + todos + aba do browser)
- [x] A alteração é persistida via endpoint `/api/title` (backend em memória)
- [x] Não há regressões — apenas adição de `TitleService` ao `TodosComponent`
- [x] A mudança é visível imediatamente após implementação
