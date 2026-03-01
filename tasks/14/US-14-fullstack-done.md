# US-14 — Trocar Título para "Teste 1" — Fullstack Done

## Resumo

Atualização do título da aplicação de **"Teste Cores"** para **"Teste 1"** em todas as camadas da stack.

---

## Alterações Realizadas

| Local | Valor Anterior | Valor Atual |
|-------|---------------|-------------|
| `server/index.js` — `appTitle` | `'Teste Cores'` | `'Teste 1'` ✅ |
| `frontend/src/index.html` — `<title>` | `'Teste Cores'` | `'Teste 1'` ✅ |
| `title.service.ts` — sinal padrão | `'Teste Cores'` | `'Teste 1'` ✅ |
| `title.service.ts` — fallback de erro | `'Teste Cores'` | `'Teste 1'` ✅ |

---

## Endpoints

| Método | Rota | Resposta |
|--------|------|----------|
| GET | `/api/title` | `{ "title": "Teste 1" }` |

---

## Serviços

| Serviço | Arquivo | Situação |
|---------|---------|----------|
| `TitleService` | `frontend/src/app/services/title.service.ts` | Atualizado — signal e fallback agora "Teste 1" |
| `ApiService` | `frontend/src/app/services/api.service.ts` | Sem alteração |

---

## Arquivos Modificados

- `server/index.js` — string `appTitle` atualizada
- `frontend/src/index.html` — tag `<title>` atualizada
- `frontend/src/app/services/title.service.ts` — signal inicial e fallback de erro atualizados

---

## Critérios de Aceitação — Verificação

- [x] O título exibido na tela é "Teste 1" (login + todos + aba do browser)
- [x] A alteração é persistida via endpoint `/api/title` (backend em memória)
- [x] Não há regressões — apenas strings de título alteradas
- [x] A mudança é visível imediatamente após implementação
