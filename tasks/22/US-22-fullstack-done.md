# US-22 — Trocar Título para Teste Cores

## Status: Concluído

## Resumo
Alteração do título da aplicação de "Teste 1" para "Teste Cores" em todos os pontos relevantes (backend, HTML estático e serviço Angular).

## Arquivos Modificados

### Backend
| Arquivo | Alteração |
|---|---|
| `server/index.js` | `let appTitle = 'Teste Cores'` (era "Teste 1") |

### Frontend
| Arquivo | Alteração |
|---|---|
| `frontend/src/index.html` | `<title>Teste Cores</title>` (era "Teste 1") |
| `frontend/src/app/services/title.service.ts` | Signal default e fallback de erro atualizados para `'Teste Cores'` (era "Teste 1") |

## Endpoints (sem alteração de contrato)
- `GET /api/title` → retorna `{ title: "Teste Cores" }` ✅

## Critérios de Aceitação Atendidos
1. ✅ O título da página exibe exatamente "Teste Cores"
2. ✅ A aba do navegador exibe "Teste Cores" (via `<title>` no `index.html`)
3. ✅ O `TitleService` retorna "Teste Cores" como valor padrão e no fallback de erro
4. ✅ O backend serve "Teste Cores" no endpoint `GET /api/title`
5. ✅ Nenhuma estrutura existente foi alterada ou quebrada
