# US-14 — Trocar Título para "Teste 1" — Fullstack Done

## Resumo

Implementação da mudança do título da aplicação de **"Teste Cores"** para **"Teste 1"** em todas as camadas da stack (backend, frontend e HTML). O título é exibido dinamicamente via `TitleService` que carrega o valor do endpoint `/api/title`.

---

## Endpoints

| Método | Rota | Resposta |
|--------|------|----------|
| GET | `/api/title` | `{ "title": "Teste 1" }` |

---

## Arquivos Criados / Modificados

### Backend
| Arquivo | Alteração |
|---------|-----------|
| `server/index.js` | `appTitle = 'Teste 1'` — endpoint `GET /api/title` retorna o novo título |

### Frontend
| Arquivo | Alteração |
|---------|-----------|
| `frontend/src/index.html` | `<title>Teste 1</title>` — título da aba do browser |
| `frontend/src/app/services/title.service.ts` | Signal inicial e fallback de erro definidos como `'Teste 1'`; consome `GET /api/title` |

---

## Serviços

| Serviço | Arquivo | Responsabilidade |
|---------|---------|-----------------|
| `TitleService` | `services/title.service.ts` | Carrega título do backend e o expõe como signal reativo |
| `ApiService` | `services/api.service.ts` | Método `getTitle()` — `GET /api/title` (sem alteração) |

---

## Critérios de Aceitação — Verificação

- [x] O título exibido na interface é **"Teste 1"** (aba do browser + todas as páginas via TitleService)
- [x] A mudança é persistida via endpoint `GET /api/title` (backend em memória)
- [x] O título é visível em todas as páginas relevantes (login, todos)
- [x] A API retorna o novo título "Teste 1"
- [x] O título "Teste 1" é exibido corretamente após recarregar a página (signal reativo + backend em memória)
- [x] Nenhuma regressão em outras funcionalidades
