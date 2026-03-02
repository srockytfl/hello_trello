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
| `server/index.js` | `appTitle = 'Teste 1'` — endpoint `GET /api/title` retorna o título |

### Frontend
| Arquivo | Alteração |
|---------|-----------|
| `frontend/src/index.html` | `<title>Teste 1</title>` — título da aba do browser |
| `frontend/src/app/services/title.service.ts` | Signal inicial e fallback de erro definidos como `'Teste 1'`; consome `GET /api/title` |
| `frontend/src/app/pages/login/login.component.ts` | Já exibia `titleService.appTitle()` como cabeçalho (sem alteração necessária) |
| `frontend/src/app/pages/todos/todos.component.ts` | Já exibia `titleService.appTitle()` no header (sem alteração necessária) |

---

## Serviços

| Serviço | Arquivo | Responsabilidade |
|---------|---------|-----------------|
| `TitleService` | `services/title.service.ts` | Carrega título do backend e o expõe como signal reativo |
| `ApiService` | `services/api.service.ts` | Método `getTitle()` — `GET /api/title` (sem alteração) |

---

## Critérios de Aceitação — Verificação

- [x] O título exibido na interface é **"Teste 1"** (tela de login + tela de todos + aba do browser)
- [x] A mudança é persistida via endpoint `GET /api/title` (backend em memória)
- [x] O título é visível em todas as páginas relevantes
- [x] Nenhuma regressão em outras funcionalidades
- [x] Mudança visível em tempo real via signal Angular reativo
