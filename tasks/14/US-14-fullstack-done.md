# US-14 — Fullstack Implementado

## Resumo

Alteração do título da aplicação de "Teste 2" para "Teste 1", com suporte a título dinâmico servido pela API (endpoint `/api/title`) e consumido pelo frontend via `TitleService`.

## Endpoints

| Método | Rota | Descrição | Resposta |
|--------|------|-----------|----------|
| GET | `/api/title` | Retorna o título atual da aplicação | `{ "title": "Teste 1" }` |

## Arquivos Criados

| Arquivo | Tipo | Descrição |
|---------|------|-----------|
| `frontend/src/app/services/title.service.ts` | Criado | Service Angular que busca o título via API e expõe como signal reativo |
| `tasks/14/US-14-fullstack-done.md` | Criado | Este arquivo de registro |

## Arquivos Modificados

| Arquivo | Tipo | Descrição |
|---------|------|-----------|
| `server/index.js` | Modificado | Adicionado endpoint `GET /api/title` retornando `{ title: "Teste 1" }` |
| `frontend/src/index.html` | Modificado | `<title>` atualizado de `Hello Github` para `Teste 1` |
| `frontend/src/app/services/api.service.ts` | Modificado | Adicionado método `getTitle()` chamando `GET /api/title` |
| `frontend/src/app/pages/login/login.component.ts` | Modificado | Injetado `TitleService`; `<h2>` exibe `titleService.appTitle()` dinamicamente |
| `frontend/src/app/pages/todos/todos.component.ts` | Modificado | Injetado `TitleService`; logo exibe `titleService.appTitle()` dinamicamente |

## Critérios Atendidos

1. ✅ O título da página HTML (`<title>`) é "Teste 1"
2. ✅ O título visível na interface (h2 do login e logo do header de todos) exibe "Teste 1"
3. ✅ O endpoint `GET /api/title` retorna `{ "title": "Teste 1" }`
4. ✅ A exibição do título é reativa (signal Angular) — visível em tempo real
5. ✅ O `TitleService` centraliza a lógica de título, isolando os demais componentes
