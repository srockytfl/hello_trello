# US-2: Trocar title para Hello Github — Fullstack Done

## Resumo

Alteração do título da aplicação de "Teste 1" para "Hello Github" em todas as camadas do sistema.

---

## Arquivos Modificados

| Arquivo | Alteração |
|---------|-----------|
| `frontend/src/index.html` | `<title>` alterado de `Teste 1` para `Hello Github` |
| `server/index.js` | Variável `appTitle` alterada de `'Teste 1'` para `'Hello Github'` |
| `frontend/src/app/services/title.service.ts` | Signal inicial e fallback de erro alterados de `'Teste 1'` para `'Hello Github'` |
| `api/index.js` | Adicionado endpoint `GET /api/title` retornando `{ title: 'Hello Github' }` |

---

## Endpoints (Backend)

### `GET /api/title`
- **server/index.js** — Retorna `{ title: 'Hello Github' }` (em memória)
- **api/index.js** — Mesmo endpoint no handler serverless Vercel (adicionado, pois estava ausente)

---

## Frontend

### `frontend/src/index.html`
- Tag `<title>` estática: `Hello Github` — visível na aba do navegador antes do Angular inicializar

### `frontend/src/app/services/title.service.ts`
- Signal `appTitle` inicializado com `'Hello Github'`
- Fallback de erro (caso `GET /api/title` falhe) também atualizado para `'Hello Github'`
- Garante que todas as páginas exibam o título correto via `TitleService`

---

## Critérios de Aceitação Atendidos

1. ✅ O título HTML da página é exatamente `"Hello Github"`
2. ✅ O título está visível na aba do navegador (via `<title>` estático + TitleService dinâmico)
3. ✅ Aplicado em todas as páginas (título vem do serviço global `TitleService`)
