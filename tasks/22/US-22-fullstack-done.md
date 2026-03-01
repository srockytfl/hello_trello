# US-22 — Trocar Título para Teste Cores

## Status: Concluído

## Resumo
Alteração do título da aplicação de "Teste 1" para "Teste Cores" em todos os pontos relevantes.

## Arquivos Modificados

### Frontend
| Arquivo | Alteração |
|---|---|
| `frontend/src/index.html` | `<title>Teste Cores</title>` (era "Teste 1") |
| `frontend/src/app/services/title.service.ts` | Signal default e fallback de erro atualizados para `'Teste Cores'` |

### Backend
| Arquivo | Alteração |
|---|---|
| `server/index.js` | `let appTitle = 'Teste Cores'` (era "Teste 1") |

## Endpoints (sem alteração de contrato)
- `GET /api/title` → retorna `{ title: "Teste Cores" }` ✅

## Critérios de Aceitação Atendidos
1. ✅ O título da página exibe exatamente "Teste Cores"
2. ✅ A alteração é visível em todos os navegadores suportados (via `<title>` no HTML estático)
3. ✅ O título aparece corretamente no elemento `<title>` do HTML (`index.html`)
