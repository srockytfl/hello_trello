# US-22 — Trocar Título para Teste Cores

## Status: Concluído

## Resumo
Alteração do título da aplicação de "Hello Github" para "Teste Cores" em todos os pontos relevantes.

## Arquivos Modificados

### Frontend
| Arquivo | Alteração |
|---|---|
| `frontend/src/index.html` | `<title>Teste Cores</title>` (era "Hello Github") |
| `frontend/src/app/services/title.service.ts` | Signal default e fallback de erro atualizados para `'Teste Cores'` (era "Hello Github") |

### Backend
| Arquivo | Alteração |
|---|---|
| `server/index.js` | `let appTitle = 'Teste Cores'` (era "Hello Github") |

## Endpoints (sem alteração de contrato)
- `GET /api/title` → retorna `{ title: "Teste Cores" }` ✅

## Critérios de Aceitação Atendidos
1. ✅ O título da página exibe exatamente "Teste Cores"
2. ✅ A alteração é visível em todos os navegadores suportados (via `<title>` no HTML estático)
3. ✅ O título aparece corretamente no elemento `<title>` do HTML (`index.html`)
4. ✅ O `TitleService` retorna "Teste Cores" como valor padrão e no fallback de erro
5. ✅ O backend serve "Teste Cores" no endpoint `GET /api/title`
